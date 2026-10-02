import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentController } from './student.controller.js';
import { StudentService } from './student.service.js';
import { Student, StudentSchema } from './schemas/student.schema.js';
import { CoursesModule } from '../courses/courses.module.js';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Student.name, schema: StudentSchema }]),
    CoursesModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}
