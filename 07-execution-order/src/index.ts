function ClassDec(constructor: Function) {
  console.log('  @ClassDec  -> class decorator');
}

function PropDec(target: any, propertyKey: string) {
  console.log('  @PropDec   -> property decorator');
}

function MethodDec(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  console.log('  @MethodDec -> method decorator');
}

function ParamDec(target: any, propertyKey: string, parameterIndex: number) {
  console.log('  @ParamDec  -> parameter decorator');
}

console.log('The slide\'s class, in the slide\'s order (prop first, then greet):');

@ClassDec
class Example {
  @PropDec
  prop!: string;

  @MethodDec
  greet(@ParamDec msg: string) {}
}

console.log('\nSame decorators, but the method is written first:');

@ClassDec
class Swapped {
  @MethodDec
  greet(@ParamDec msg: string) {}

  @PropDec
  prop!: string;
}

// Several decorators on one method. Factories make the two phases visible:
// calling the factory happens top to bottom, applying the decorator bottom to top.
function Outer() {
  console.log('  Outer() evaluated');
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    console.log('  Outer applied');
  };
}

function Inner() {
  console.log('  Inner() evaluated');
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    console.log('  Inner applied');
  };
}

console.log('\nTwo decorators stacked on one method:');

class Stacked {
  @Outer()
  @Inner()
  run() {}
}

// What "outer wraps inner" means once the method is called.
function Tag(label: string) {
  return (target: any, key: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      console.log(`  ${label} before`);
      const result = original.apply(this, args);
      console.log(`  ${label} after`);
      return result;
    };
  };
}

class Wrapped {
  @Tag('outer')
  @Tag('inner')
  run() {
    console.log('    the method itself');
  }
}

console.log('\nCalling a method wrapped by two decorators:');
new Wrapped().run();
