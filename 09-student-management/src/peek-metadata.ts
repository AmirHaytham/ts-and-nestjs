// Not part of the app. Run with: npm run peek
// Shows what the decorators left behind, which is all NestJS needs to wire the app.
import 'reflect-metadata';
import { Student } from './student/schemas/student.schema.js';
import { StudentService } from './student/student.service.js';
import { StudentController } from './student/student.controller.js';

const typeName = (t: unknown) => (typeof t === 'function' ? t.name : String(t));

console.log('@Prop() never says "string", so how does Mongoose know?');
for (const key of ['name', 'email', 'age', 'courses']) {
  const type = Reflect.getMetadata('design:type', Student.prototype, key);
  console.log(`  Student.${key.padEnd(8)} design:type = ${typeName(type)}`);
}

console.log('\nHow does Nest know what to pass to the constructor?');
const params: unknown[] = Reflect.getMetadata('design:paramtypes', StudentService) ?? [];
console.log('  StudentService needs:', params.map(typeName).join(', '));

console.log('\nWhat @Controller and @Get stored:');
console.log('  path of StudentController:', Reflect.getMetadata('path', StudentController));
for (const method of ['findAll', 'findOne', 'enroll']) {
  const handler = (StudentController.prototype as any)[method];
  const verb = ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'][Reflect.getMetadata('method', handler)];
  console.log(`  ${method.padEnd(8)} -> ${verb} ${Reflect.getMetadata('path', handler)}`);
}
