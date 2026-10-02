import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Course } from '../../courses/schemas/course.schema.js';

export type StudentDocument = HydratedDocument<Student>;

@Schema({ timestamps: true })
export class Student {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true })
  email: string;

  @Prop({ min: 16 })
  age: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: Course.name }], default: [] })
  courses: Types.ObjectId[];
}

export const StudentSchema = SchemaFactory.createForClass(Student);
