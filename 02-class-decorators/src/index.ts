// Slide 007, left: the decorator receives the constructor and logs its name.
function ClassDecoratorExample(constructor: Function) {
  console.log('Decorator called for:', constructor.name);
}

@ClassDecoratorExample
class Student {
  constructor(public name: string) {}
}

console.log('No Student has been created yet, and the decorator already ran.\n');

// Slide 007, right: add a timestamp to the prototype, so every instance sees it.
function AddTimestamp(target: Function) {
  target.prototype.timestamp = new Date();
}

// Tells TypeScript that MyClass instances have a timestamp.
// Without this, obj.timestamp does not compile. See the README.
interface MyClass {
  timestamp: Date;
}

@AddTimestamp
class MyClass {
  constructor() {}
}

const obj = new MyClass();
console.log('obj.timestamp:', obj.timestamp.toISOString());
console.log('own property? ', Object.hasOwn(obj, 'timestamp'), '(it lives on MyClass.prototype)');

// The date is set once, when the class is defined. Every instance shares it.
const start = Date.now();
while (Date.now() - start < 50) {}
const later = new MyClass();
console.log('same date for an object made later?', later.timestamp === obj.timestamp);

// "The returned constructor replaces the original if one is provided."
function WithCreatedAt<T extends new (...args: any[]) => object>(Base: T) {
  return class extends Base {
    createdAt = new Date();
  };
}

@WithCreatedAt
class Course {
  constructor(public title: string) {}
}

const a = new Course('Software Project I');
while (Date.now() - start < 100) {}
const b = new Course('Databases');
console.log('\nReplacing the class gives every instance its own date:');
console.log(' ', a.title.padEnd(20), (a as any).createdAt.toISOString());
console.log(' ', b.title.padEnd(20), (b as any).createdAt.toISOString());
console.log('  still instanceof Course?', a instanceof Course);
