import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUsuarioDto } from 'src/dtos/user.dto';
import { UsuariosService } from 'src/services/user.service';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Post()
  create(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuariosService.create(createUsuarioDto);
  }

  @Get(':cedula')
  findOne(@Param('cedula') cedula: string) {
    return this.usuariosService.findOne(cedula);
  }

  @Get()
  findAll() {
    return this.usuariosService.findAll();
  }

  @Get('rol/:rol')
  findOnlyByRol(@Param('rol') rol: string) {
    return this.usuariosService.findOnlyByRol(rol);
  }

  @Get('id/:usuario_id')
  findOneById(@Param('usuario_id') usuario_id: number) {
    return this.usuariosService.findOneById(usuario_id);
  }
}
