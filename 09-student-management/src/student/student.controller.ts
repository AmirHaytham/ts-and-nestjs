import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { StudentService } from './student.service.js';
import { Student } from './schemas/student.schema.js';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  findAll() {
    return this.studentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Student>) {
    return this.studentService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: Partial<Student>) {
    return this.studentService.update(id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }

  @Post(':id/courses/:courseId')
  enroll(@Param('id') id: string, @Param('courseId') courseId: string) {
    return this.studentService.enroll(id, courseId);
  }
}
