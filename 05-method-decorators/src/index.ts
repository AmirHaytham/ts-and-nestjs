// Slide 010: swap descriptor.value for a wrapper that logs, then calls the original.
function Log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    console.log(`Calling ${propertyKey} with`, args);
    const result = originalMethod.apply(this, args);
    console.log('Result:', result);
    return result;
  };
}

class Calculator {
  @Log
  add(a: number, b: number) {
    return a + b;
  }
}

const calc = new Calculator();
calc.add(2, 3);

console.log('\nWhat the decorator was given for add:');
const descriptor = Object.getOwnPropertyDescriptor(Calculator.prototype, 'add')!;
console.log('  writable:', descriptor.writable, ' enumerable:', descriptor.enumerable, ' configurable:', descriptor.configurable);

// Why .apply(this, args) and not originalMethod(...args):
class Counter {
  count = 0;

  @Log
  increment() {
    return ++this.count;
  }
}

console.log('\nThe wrapper keeps "this" pointing at the object:');
const counter = new Counter();
counter.increment();
counter.increment();

// The use cases from slide 012, as method decorators.

// Access control: check a role before the method runs.
let currentRole = 'student';

function Roles(...allowed: string[]) {
  return (target: any, propertyKey: string, descriptor: PropertyDescriptor) => {
    const original = descriptor.value;
    descriptor.value = function (...args: any[]) {
      if (!allowed.includes(currentRole)) {
        throw new Error(`${currentRole} cannot call ${propertyKey}`);
      }
      return original.apply(this, args);
    };
  };
}

// Timing: measure how long the method took.
function Timed(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    const start = performance.now();
    const result = original.apply(this, args);
    console.log(`  ${propertyKey} took ${(performance.now() - start).toFixed(2)} ms`);
    return result;
  };
}

class GradeBook {
  private grades: number[] = [88, 92, 75];

  @Roles('ta', 'doctor')
  setGrade(index: number, value: number) {
    this.grades[index] = value;
    return this.grades;
  }

  @Timed
  average() {
    return this.grades.reduce((sum, g) => sum + g, 0) / this.grades.length;
  }
}

console.log('\nAccess control:');
const book = new GradeBook();
try {
  book.setGrade(0, 100);
} catch (e) {
  console.log('  as student ->', (e as Error).message);
}
currentRole = 'ta';
console.log('  as ta      ->', book.setGrade(0, 100));

console.log('\nTiming:');
console.log('  average =', book.average().toFixed(2));
