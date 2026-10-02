import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Student management API. Try GET /student or GET /courses';
  }
}
