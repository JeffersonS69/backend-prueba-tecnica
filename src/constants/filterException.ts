import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  NotFoundException,
  HttpException,
  BadRequestException,
} from '@nestjs/common';

@Catch(NotFoundException, BadRequestException, HttpException)
export class MultiExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const status = exception.getStatus();
    const message = exception.getResponse();

    response.status(status).json({
      statusCode: status,
      message: typeof message === 'string' ? message : message['message'],
      errorType: exception.name,
      timestamp: new Date().toISOString(),
    });
  }
}
