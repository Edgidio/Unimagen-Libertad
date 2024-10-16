import { registerDecorator, ValidationOptions, ValidationArguments } from 'class-validator';


export function IsValidDateMMDDYYYY(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'isValidDateMMDDYYYY',
        target: object.constructor,
        propertyName: propertyName,
        options: validationOptions,
        validator: {
          validate(value: any, args: ValidationArguments) {
            // Expresión regular para validar el formato MM/DD/YYYY
            const regex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
            return typeof value === 'string' && regex.test(value);
          },
          defaultMessage(args: ValidationArguments) {
            return 'Debe proporcionar una fecha válida en el formato MM/DD/YYYY';
          },
        },
      });
    };
  }
  