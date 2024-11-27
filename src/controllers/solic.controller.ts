import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard, RolesGuard } from 'src/auth';
import { Roles } from 'src/auth/roles.decorator';
import { MultiExceptionFilter } from 'src/constants/filterException';
import { SolicitudVisitaDto, UpdateSolicitudVisitaDto } from 'src/dtos';
import { SolicitudesVisitasService } from 'src/services/solic.service';

@Controller('solicitudes')
@UseGuards(JwtAuthGuard, RolesGuard)
@UseFilters(MultiExceptionFilter)
export class SolicitudesVisitasController {
  constructor(private readonly solicitudesService: SolicitudesVisitasService) {}

  @Post()
  @Roles('visitante', 'residente')
  create(@Body() createSolicitudDto: SolicitudVisitaDto) {
    return this.solicitudesService.create(createSolicitudDto);
  }

  @Get()
  @Roles('residente')
  findAll() {
    return this.solicitudesService.findAll();
  }

  @Get(':id')
  @Roles('visitante', 'residente')
  findOne(@Param('id') solicitud_id: number) {
    return this.solicitudesService.findOne(solicitud_id);
  }

  @Patch(':id')
  @Roles('visitante', 'residente')
  update(
    @Param('id') solicitud_id: number,
    @Body() updateSolicitudDto: UpdateSolicitudVisitaDto,
  ) {
    return this.solicitudesService.update(solicitud_id, updateSolicitudDto);
  }

  @Delete(':id')
  @Roles('visitante', 'residente')
  remove(@Param('id') solicitud_id: number) {
    return this.solicitudesService.remove(solicitud_id);
  }

  @Get('visitante/:id')
  @Roles('visitante')
  findOnlyVisitante(@Param('id') visitante_id: number) {
    return this.solicitudesService.findOnlyVisitante(visitante_id);
  }

  @Get('residente/:id')
  @Roles('residente')
  findOnlyResidente(@Param('id') residente_id: number) {
    return this.solicitudesService.findOnlyResidente(residente_id);
  }

  @Patch('estado/:id')
  @Roles('residente')
  updateEstado(
    @Param('id') solicitud_id: number,
    @Body('estado') estado: string,
  ) {
    return this.solicitudesService.updateEstado(solicitud_id, estado);
  }
}
