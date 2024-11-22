import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SolicitudesVisitasController } from 'src/controllers/solic.controller';
import { SolicitudVisita } from 'src/entities/solic.entity';
import { SolicitudesVisitasService } from 'src/services/solic.service';

@Module({
  imports: [TypeOrmModule.forFeature([SolicitudVisita])],
  providers: [SolicitudesVisitasService],
  controllers: [SolicitudesVisitasController],
})
export class SolicitudesVisitasModule {}
