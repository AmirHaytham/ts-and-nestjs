// Slide 008: the outer function takes your arguments,
// the inner one is the real decorator that TypeScript calls.
function classDecoratorExample(value: string) {
  console.log(`classDecoratorExample('${value}') evaluated`);
  return (constructor: Function) => {
    console.log('Class decorator called');
    console.log(constructor);
    console.log(value);
  };
}

@classDecoratorExample('Student')
class Student {
  constructor(public name: string, public age: number) {}
}

// The same idea, used for something real: a table name stored on the class.
function Entity(tableName: string) {
  return (constructor: Function) => {
    (constructor as any).tableName = tableName;
  };
}

@Entity('students')
class StudentRecord {}

@Entity('courses')
class CourseRecord {}

console.log('\nOne factory, two configurations:');
console.log('  StudentRecord.tableName ->', (StudentRecord as any).tableName);
console.log('  CourseRecord.tableName  ->', (CourseRecord as any).tableName);

// This is the exact shape of NestJS decorators you will meet next:
//   @Controller('students')   @Get(':id')   @Module({ ... })
// Each one is a factory: called with your options, returns the decorator.
function Controller(prefix: string) {
  return (constructor: Function) => {
    console.log(`\nRegistered ${constructor.name} under /${prefix}`);
  };
}

@Controller('students')
class StudentsController {}
