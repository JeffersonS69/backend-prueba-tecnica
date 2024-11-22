import { IsOptional, IsEnum, IsString } from 'class-validator';

export class UpdateSolicitudVisitaDto {
  @IsOptional()
  @IsString()
  fecha_visita?: string;

  @IsOptional()
  @IsString()
  hora_visita?: string;

  @IsOptional()
  @IsEnum(['vehículo', 'caminando'])
  medio_ingreso?: string;

  @IsOptional()
  @IsString()
  foto_placa?: string;
}
