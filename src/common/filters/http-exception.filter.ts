import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      // If it's a known HTTP Exception, return its response
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }

    console.error('Unexpected error:', exception); 

    // Return a generic 500 error if it's an unknown exception
    return response
      .status(500)
      .json({ message: 'Internal Server Error', error: exception });
  }
}
