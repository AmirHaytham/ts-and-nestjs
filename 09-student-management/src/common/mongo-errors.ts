import { BadRequestException, ConflictException, NotFoundException } from '@nestjs/common';
import { Error as MongooseError, isValidObjectId } from 'mongoose';

export function checkId(id: string) {
  if (!isValidObjectId(id)) throw new BadRequestException(`"${id}" is not a valid id`);
}

export function notFound(what: string, id: string): never {
  throw new NotFoundException(`${what} ${id} not found`);
}

// Turns Mongoose errors into 400 and 409 instead of a 500.
export function toHttpError(error: unknown): never {
  if (error instanceof MongooseError.ValidationError) {
    throw new BadRequestException(Object.values(error.errors).map((e) => e.message));
  }
  if ((error as { code?: number }).code === 11000) {
    const field = Object.keys((error as { keyValue?: object }).keyValue ?? {})[0];
    throw new ConflictException(`${field} is already taken`);
  }
  throw error;
}
