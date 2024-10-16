import { Controller, Get, Post, Body, Patch, Param, Delete, Render } from '@nestjs/common';
import { ContactoService } from './contacto.service';
import { CreateContactoDto } from './dto/create-contacto.dto';
import { UpdateContactoDto } from './dto/update-contacto.dto';

@Controller('contacto')
export class ContactoController {
  constructor(private readonly contactoService: ContactoService) {}

  @Post()
  create(@Body() createContactoDto: CreateContactoDto) {
    return this.contactoService.create(createContactoDto);
  }

  @Get()
  @Render('contacto.hbs')
  findAll() {
    return {
      ruta: "/contacto"
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contactoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateContactoDto: UpdateContactoDto) {
    return this.contactoService.update(+id, updateContactoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contactoService.remove(+id);
  }
}
