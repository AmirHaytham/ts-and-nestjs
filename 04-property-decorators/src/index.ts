// Slide 009, top: what the decorator receives.
function LogProperty(target: any, propertyKey: string) {
  console.log(`Property decorator called for: ${propertyKey}`);
  console.log('Target:', target, typeof target === 'function' ? '(constructor)' : '(prototype)');
}

class Student {
  // The ! tells TypeScript the value is set later. Without it, strict mode
  // rejects the slide's "name: string;" because nothing ever sets it.
  @LogProperty
  name!: string;

  @LogProperty
  static school: string;
}

// Slide 009, bottom, exactly as written.
function Readonly(target: any, propertyKey: string) {
  Object.defineProperty(target, propertyKey, { writable: false });
}

class MyClass {
  @Readonly
  name: string = 'Alice';
}

console.log('\nThe slide\'s @Readonly:');
try {
  const obj = new MyClass();
  obj.name = 'Bob';
  console.log('  obj.name after assigning "Bob" ->', obj.name, '  (no error, nothing stopped it)');
  console.log('  own property on obj?          ->', Object.hasOwn(obj, 'name'));
} catch (e) {
  console.log('  new MyClass() threw ->', (e as Error).message);
  console.log('  so it failed while setting "Alice", before "Bob" was ever tried');
}

// Why: the decorator made the PROTOTYPE's name read only. The field
// initializer then creates a brand new "name" on the object itself, which
// hides the prototype's one. See the README for the full story.

// A version that works: the property decorator only records the name,
// and a class decorator locks it on each object after it is built.
const lockedFields = new WeakMap<Function, string[]>();

function Locked(target: any, propertyKey: string) {
  const fields = lockedFields.get(target.constructor) ?? [];
  lockedFields.set(target.constructor, [...fields, propertyKey]);
}

function LockFields<T extends new (...args: any[]) => object>(Base: T) {
  return class extends Base {
    constructor(...args: any[]) {
      super(...args);
      for (const key of lockedFields.get(Base) ?? []) {
        Object.defineProperty(this, key, { writable: false });
      }
    }
  };
}

@LockFields
class Account {
  @Locked
  id: string = 'ACC-1';

  balance = 100;
}

console.log('\nA @Locked field that really is read only:');
const account = new Account();
account.balance = 250;
console.log('  balance changed to ->', account.balance);
try {
  account.id = 'ACC-HACKED';
} catch (e) {
  console.log('  changing id threw  ->', (e as Error).message);
}
console.log('  id is still        ->', account.id);
