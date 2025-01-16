import { HttpException, HttpStatus } from "@nestjs/common";

export const handleServiceError = (err) => {
  if (err.code === '23505') {
    throw new HttpException('Product listing already exists :/', HttpStatus.CONFLICT);
  } else if (err.code === '22P02') {
    throw new HttpException('Invalid input provided for product data :/', HttpStatus.BAD_REQUEST);
  } else if (err.code === '23503') {
    throw new HttpException('Invalid foreign key reference :/', HttpStatus.BAD_REQUEST);
  } else if (err.code === '23514') {
    throw new HttpException('Product data violates a check constraint (e.g., price cannot be negative) :/', HttpStatus.BAD_REQUEST);
  } else if (err instanceof HttpException) {
    throw err;
  } else if (err.name === 'QueryFailedError') {
    throw new HttpException(`Database query failed: ${err.message}`, HttpStatus.INTERNAL_SERVER_ERROR);
  } else {
    throw new HttpException('An unexpected error occurred :/', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}