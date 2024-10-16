import { Injectable } from '@nestjs/common';
import { CreateContactoDto } from './contacto/dto/create-contacto.dto';

@Injectable()
export class AppService {
  inicioCrearContactoPOST(createIndexContactoDto: CreateContactoDto) {
    return createIndexContactoDto
  }
}
