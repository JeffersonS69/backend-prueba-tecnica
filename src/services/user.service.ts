import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUsuarioDto } from 'src/dtos/user.dto';
import { Usuario } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

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
    return this.usuariosRepository.findOne({ where: { cedula } });
  }

  async findOneById(usuario_id: number): Promise<Usuario> {
    return this.usuariosRepository.findOne({ where: { usuario_id } });
  }

  async findOnlyByRol(rol: string): Promise<Usuario[]> {
    return this.usuariosRepository.find({
      where: { rol: rol },
      select: ['cedula'],
    });
  }

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }
}
