import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { StudentModule } from './student/student.module.js';
import { CoursesModule } from './courses/courses.module.js';

@Module({
  imports: [
    StudentModule,
    CoursesModule,
    MongooseModule.forRoot(process.env.MONGODB_URI ?? 'mongodb://localhost:27017/nestStudent'),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
