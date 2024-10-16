import { CreateIndexContactoDto } from './create-index-contacto.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateContactoDto extends PartialType(CreateIndexContactoDto) {}