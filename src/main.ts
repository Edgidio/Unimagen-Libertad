import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'hbs'; // Importar Handlebars para manejar los partials y helpers
import { ValidationPipe } from '@nestjs/common';


import * as session from 'express-session';
import * as flash from 'connect-flash';

async function bootstrap() {  
  
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  ); 

   // Configurar express-session
   app.use(
    session({
      secret: 'mySecretKey', // Debes cambiarlo por una clave segura
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 }, // La cookie de sesión expirará en 60 segundos
    }),
  );

  // Configurar connect-flash
  app.use(flash());

  // Configura Handlebars
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');

  // Registrar partials
  hbs.registerPartials(join(__dirname, '..', 'views', 'partials'));

  // Registrar el helper 'eq' para comparar variables en HBS
  hbs.registerHelper('eq', function(arg1, arg2, options) {
    return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
  });

  console.log("Servidor coriiendo en el puerto", process.env.SERVERPORT)

  await app.listen(process.env.SERVERPORT);
  
}
bootstrap();
