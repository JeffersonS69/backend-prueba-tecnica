import { HttpException, HttpStatus } from '@nestjs/common';

export class CustomNotFoundException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.NOT_FOUND);
  }
}

export class CustomValidationException extends HttpException {
  constructor(errors: string[]) {
    super({ message: 'Validación fallida', errors }, HttpStatus.BAD_REQUEST);
  }
}
