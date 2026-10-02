import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CoursesService } from './courses.service.js';
import { Course } from './schemas/course.schema.js';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  findAll() {
    return this.coursesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coursesService.findOne(id);
  }

  @Post()
  create(@Body() body: Partial<Course>) {
    return this.coursesService.create(body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coursesService.remove(id);
  }
}
