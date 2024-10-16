import { Body, Controller, Get, Post, Query, Render, Req, Res, UseFilters, UsePipes } from '@nestjs/common';
import { AppService } from './app.service';
import { ZodValidationPipe } from './common/pipes/zod-validation.pipe';
import { CreateIndexContactoDto } from './dto/create-index-contacto.dto';
import { createIndexContactoSchema } from './schemas/create-index-contacto.schema';
import { ValidationExceptionFilter } from './common/filters/validation-exception.filter';

@Controller()
@UseFilters(ValidationExceptionFilter)  // Aplicar el filtro en el controlador
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get(  )
  @Render('index.hbs')
  inicio( @Req() request: any ) {

   // Obtener los errores de las variables flash
   const errors = request.flash('errors');
   const formData = request.flash('formData');
   const successReserva = request.flash('successReserva');

   // Renderizar la vista y pasar los errores a la plantilla
   return {
    ruta: "/",
    errors:errors[0], 
    formData:formData[0],
    successReserva 
  };

  }

  @Post()
  @UsePipes(new ZodValidationPipe(createIndexContactoSchema))
  async inicioContacto( @Body() createIndexContactoDto: CreateIndexContactoDto, @Res() res, @Req() req ) {

    // Guardar un mensaje flash de éxito
    req.flash('successReserva', 'La reserva se ha enviado exitosamente.');

    // Redirigir a la página principal con el mensaje flash
    return res.redirect('/');

  }
}