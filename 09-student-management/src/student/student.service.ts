import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from './schemas/student.schema.js';
import { CoursesService } from '../courses/courses.service.js';
import { checkId, notFound, toHttpError } from '../common/mongo-errors.js';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private readonly studentModel: Model<Student>,
    private readonly coursesService: CoursesService,
  ) {}

  findAll() {
    return this.studentModel.find().sort({ name: 1 }).exec();
  }

  async findOne(id: string) {
    checkId(id);
    const student = await this.studentModel.findById(id).populate('courses').exec();
    return student ?? notFound('Student', id);
  }

  async create(data: Partial<Student>) {
    try {
      return await this.studentModel.create(data);
    } catch (error) {
      toHttpError(error);
    }
  }

  async update(id: string, data: Partial<Student>) {
    checkId(id);
    try {
      const student = await this.studentModel
        .findByIdAndUpdate(id, data, { returnDocument: 'after', runValidators: true })
        .exec();
      return student ?? notFound('Student', id);
    } catch (error) {
      toHttpError(error);
    }
  }

  async remove(id: string) {
    checkId(id);
    const student = await this.studentModel.findByIdAndDelete(id).exec();
    return student ?? notFound('Student', id);
  }

  async enroll(studentId: string, courseId: string) {
    const course = await this.coursesService.findOne(courseId);
    checkId(studentId);
    const student = await this.studentModel
      .findByIdAndUpdate(studentId, { $addToSet: { courses: course._id } }, { returnDocument: 'after' })
      .populate('courses')
      .exec();
    return student ?? notFound('Student', studentId);
  }
}
