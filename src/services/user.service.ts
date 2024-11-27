import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { CustomNotFoundException } from 'src/constants/customException';
import { messageNotFoundCedula, messageNotFoundRol, messageNotFoundUsuario, messageNotFountUsuarioByRol } from 'src/constants/message';
import { CreateUsuarioDto } from 'src/dtos';
import { Usuario } from 'src/entities';
import { Repository } from 'typeorm';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuariosRepository: Repository<Usuario>,
  ) {}

  async create(createUsuarioDto: CreateUsuarioDto): Promise<Usuario> {
    const hashedPassword = await this.hashPassword(createUsuarioDto.password);
    const user = this.usuariosRepository.create({
      ...createUsuarioDto,
      password: hashedPassword,
    });
    return this.usuariosRepository.save(user);
  }

  async findAll(): Promise<Usuario[]> {
    return this.usuariosRepository.find();
  }

  async findOne(cedula: string): Promise<Usuario> {
    const data = await this.usuariosRepository.findOne({ where: { cedula } });

    if (!data) {
      throw new CustomNotFoundException(messageNotFoundCedula);
    }

    return data;
  }

  async findOneById(usuario_id: number): Promise<Usuario> {
    const data = await this.usuariosRepository.findOne({
      where: { usuario_id },
    });

    if (!data) {
      throw new CustomNotFoundException(messageNotFoundUsuario);
    }

    return data;
  }

  async findOnlyByRol(rol: string): Promise<Usuario[]> {
    if (rol !== 'visitante' && rol !== 'residente') {
      throw new CustomNotFoundException(messageNotFoundRol);
    }

    const data = await this.usuariosRepository.find({
      where: { rol: rol },
      select: ['cedula'],
    });

    if (!data) {
      throw new CustomNotFoundException(messageNotFountUsuarioByRol);
    }

    return data;
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
