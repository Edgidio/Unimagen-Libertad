import { z } from 'zod';

export const createIndexContactoSchema = z.object({
  name: z.string().min(2, { message: 'El nombre debe tener al menos 2 caracteres' }).max(50, { message: 'El nombre no puede exceder los 50 caracteres' }),
  email: z.string().email({ message: 'Debe proporcionar un correo electrónico válido' }),
  phone: z.string().nonempty({ message: 'El teléfono es obligatorio' }),
  date: z.string().refine(value => {
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    return dateRegex.test(value);
  }, { message: 'La fecha debe estar en el formato MM/DD/YYYY' }),
  message: z.string().min(10, { message: 'El mensaje debe tener al menos 10 caracteres' }).max(500, { message: 'El mensaje no puede exceder los 500 caracteres' }),
});
