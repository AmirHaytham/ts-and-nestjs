import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schema.js';
import { checkId, notFound, toHttpError } from '../common/mongo-errors.js';

@Injectable()
export class CoursesService {
  constructor(@InjectModel(Course.name) private readonly courseModel: Model<Course>) {}

  findAll() {
    return this.courseModel.find().sort({ code: 1 }).exec();
  }

  async findOne(id: string) {
    checkId(id);
    const course = await this.courseModel.findById(id).exec();
    return course ?? notFound('Course', id);
  }

  async create(data: Partial<Course>) {
    try {
      return await this.courseModel.create(data);
    } catch (error) {
      toHttpError(error);
    }
  }

  async remove(id: string) {
    checkId(id);
    const course = await this.courseModel.findByIdAndDelete(id).exec();
    return course ?? notFound('Course', id);
  }
}
