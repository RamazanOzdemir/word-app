import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response } from 'express';
import {
  DomainErrorNames,
  DomainException,
} from '../exceptions/domain.exceptions';

const DomainErrorCodes = {
  [DomainErrorNames.DomainException]: HttpStatus.BAD_REQUEST,
  [DomainErrorNames.NotFoundException]: HttpStatus.NOT_FOUND,
  [DomainErrorNames.DuplicateEntityException]: HttpStatus.CONFLICT,
};

@Catch(DomainException)
export class DomainExceptionFilter implements ExceptionFilter {
  catch(exception: DomainException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = DomainErrorCodes[exception.name] || 500;

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}
