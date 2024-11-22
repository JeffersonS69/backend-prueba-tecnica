import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class SolicitudVisitaDto {
  @IsNotEmpty()
  @IsInt()
  visitante_id: number;

  @IsNotEmpty()
  @IsInt()
  residente_id: number;

  @IsNotEmpty()
  @IsString()
  manzana: string;

  @IsNotEmpty()
  @IsString()
  villa: string;

  @IsNotEmpty()
  @IsString()
  fecha_visita: string;

  @IsNotEmpty()
  @IsString()
  hora_visita: string;

  @IsNotEmpty()
  @IsEnum(['vehículo', 'caminando'])
  medio_ingreso: string;

  @IsOptional()
  @IsString()
  foto_placa?: string;
}
