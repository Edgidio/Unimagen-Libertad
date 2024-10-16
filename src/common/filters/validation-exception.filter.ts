import { ExceptionFilter, Catch, ArgumentsHost, BadRequestException } from '@nestjs/common';
import { Request, Response } from 'express';

@Catch(BadRequestException)
export class ValidationExceptionFilter implements ExceptionFilter {
  catch(exception: BadRequestException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request: Request = ctx.getRequest();
    const response: Response = ctx.getResponse();

    const exceptionResponse = exception.getResponse() as any;
    const validationErrors = exceptionResponse.errors || {};

    // Guardar los errores y los datos del cliente en una variable flash
    request.flash('errors', validationErrors);
    request.flash('formData', request.body);  // Guardar los datos del formulario

    // Redirigir al controlador GET donde se manejarán los errores
    response.redirect('/');
  }
}

