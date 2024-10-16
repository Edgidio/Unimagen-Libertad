import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';
import { ZodSchema } from 'zod';

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  constructor(private schema: ZodSchema<any>) {}

  transform(value: any) {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      // Formatear los errores de Zod
      const formattedErrors = result.error.errors.reduce((acc, curr) => {
        const field = curr.path[0];
        if (!acc[field]) {
          acc[field] = [];
        }
        acc[field].push(curr.message);
        return acc;
      }, {});

      // Lanzar excepción con los errores
      throw new BadRequestException({
        message: 'Errores de validación',
        errors: formattedErrors,
      });
    }

    return value;  // Si la validación pasa, devolver los datos
  }
}
