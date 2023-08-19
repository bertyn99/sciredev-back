import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { BusinessException, ErrorDomain } from './exception.business';

export interface ApiError {
  id: string;
  domain: ErrorDomain;
  message: string;
  timestamp: Date;
}

@Catch(Error)
export class CustomExceptionFilter implements ExceptionFilter {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  private readonly logger = new Logger(CustomExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    let body: ApiError;
    let status: HttpStatus;

    if (exception instanceof BusinessException) {
      // Straightforward handling of our own exceptions
      body = {
        id: exception.id,
        message: exception.apiMessage,
        domain: exception.domain,
        timestamp: exception.timestamp,
      };
      status = exception.status;
    } else if (exception instanceof HttpException) {
      // We can extract internal message & status from NestJS errors
      // Useful with class-validator
      body = new BusinessException(
        'generic',
        exception.message,
        exception.message, // Or generic message if you like
        exception.getStatus(),
      );
      status = exception.getStatus();
    } else {
      // For all other exceptions simply return 500 error
      body = new BusinessException(
        'generic',
        `Internal error occurred: ${exception.message}`,
        'Internal error occurred',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    const context = host.switchToHttp();
    const response = context.getResponse<Response>();
    const request = context.getRequest<Request>();

    // Logs will contain an error identifier as well as
    // request path where it has occurred
    this.logger.error(
      `Got an exception: ${JSON.stringify({
        path: request.url,
        ...body,
      })}`,
    );

    response.status(status).json(body);
  }
}