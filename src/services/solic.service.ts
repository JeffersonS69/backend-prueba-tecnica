import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomNotFoundException } from 'src/constants/customException';
import { messageNotFoundResidente, messageNotFoundSolicitud, messageNotFoundVisitante } from 'src/constants/message';
import { SolicitudVisitaDto, UpdateSolicitudVisitaDto } from 'src/dtos';
import { SolicitudVisita } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class SolicitudesVisitasService {
  constructor(
    @InjectRepository(SolicitudVisita)
    private readonly solicitudesRepository: Repository<SolicitudVisita>,
  ) {}

  async create(
    createSolicitudDto: SolicitudVisitaDto,
  ): Promise<SolicitudVisita> {
    const solicitud = this.solicitudesRepository.create(createSolicitudDto);
    return this.solicitudesRepository.save(solicitud);
  }

  async findAll(): Promise<SolicitudVisita[]> {
    return this.solicitudesRepository.find();
  }

  async findOne(solicitud_id: number): Promise<SolicitudVisita> {
    const data = await this.solicitudesRepository.findOne({
      where: { solicitud_id },
    });

    if (!data) {
      throw new CustomNotFoundException(messageNotFoundSolicitud);
    }

    return data;
  }

  async findOnlyVisitante(visitanteId: number): Promise<SolicitudVisita[]> {
    const visitante = await this.solicitudesRepository.find({
      where: { visitante_id: visitanteId },
    });

    if (!visitante) {
      throw new CustomNotFoundException(messageNotFoundVisitante);
    }

    return visitante;
  }

  async findOnlyResidente(residenteId: number): Promise<SolicitudVisita[]> {
    const residente = await this.solicitudesRepository.find({
      where: { residente_id: residenteId },
    });

    if (!residente) {
      throw new CustomNotFoundException(messageNotFoundResidente);
    }

    return residente;
  }

  async update(
    solicitud_id: number,
    updateSolicitudDto: UpdateSolicitudVisitaDto,
  ): Promise<void> {
    await this.solicitudesRepository.update(
      { solicitud_id },
      updateSolicitudDto,
    );
  }

  async updateEstado(solicitud_id: number, estado: string): Promise<void> {
    await this.solicitudesRepository.update(
      { solicitud_id },
      { estado: estado },
    );
  }

  async remove(solicitud_id: number): Promise<void> {
    await this.solicitudesRepository.delete({ solicitud_id });
  }
}
