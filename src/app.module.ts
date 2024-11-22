import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './modules/auth.module';
import { UsuarioModule } from './modules/user.module';
import { SolicitudesVisitasModule } from './modules/solic.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'jeff',
      database: 'prueba',
      autoLoadEntities: true,
      synchronize: true,
    }),
    AuthModule,
    UsuarioModule,
    SolicitudesVisitasModule,
  ],
})
export class AppModule {}
