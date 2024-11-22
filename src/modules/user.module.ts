import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuariosController } from 'src/controllers/user.controller';
import { Usuario } from 'src/entities/user.entity';
import { UsuariosService } from 'src/services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Usuario])],
  providers: [UsuariosService],
  controllers: [UsuariosController],
  exports: [UsuariosService],
})
export class UsuarioModule {}
