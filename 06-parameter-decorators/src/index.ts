// Slide 011, as written.
function LogParameter(target: any, propertyKey: string, parameterIndex: number) {
  console.log(`Parameter at index ${parameterIndex} in method ${propertyKey} was decorated`);
}

class MyClass {
  greet(@LogParameter name: string) {
    return `Hello, ${name}!`;
  }
}

console.log('That line printed before any object exists.');
const obj = new MyClass();
console.log(obj.greet('Alice'));
console.log('Calling greet did not print it again.\n');

// A parameter decorator cannot change the value or wrap the method.
// All it can do is remember something. A method decorator then uses it.
// This pair is the "validation" use case from slide 012.
const requiredParams = new Map<string, number[]>();

function Required(target: any, propertyKey: string, parameterIndex: number) {
  const list = requiredParams.get(propertyKey) ?? [];
  requiredParams.set(propertyKey, [...list, parameterIndex]);
}

function Validate(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const original = descriptor.value;
  descriptor.value = function (...args: any[]) {
    for (const index of requiredParams.get(propertyKey) ?? []) {
      if (args[index] === undefined || args[index] === '') {
        throw new Error(`${propertyKey}: argument ${index} is required`);
      }
    }
    return original.apply(this, args);
  };
}

class StudentService {
  @Validate
  enroll(@Required name: string, @Required course: string, note?: string) {
    return `${name} enrolled in ${course}${note ? ` (${note})` : ''}`;
  }
}

const service = new StudentService();
console.log(service.enroll('Hassan', 'SP1'));
console.log(service.enroll('Mona', 'SP1', 'late add'));
try {
  service.enroll('Omar', '');
} catch (e) {
  console.log('Error:', (e as Error).message);
}

// NestJS works the same way. In
//   create(@Body() body: CreateStudentDto, @Param('id') id: string)
// @Body and @Param only record "argument 0 is the body, argument 1 is the id".
// When a request arrives, Nest reads that record and passes the right values in.
