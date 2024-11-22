import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '../auth/auth.service';
import { JwtStrategy } from '../auth/jwt.strategy';
import { AuthController } from '../auth/auth.controller';
import { UsuarioModule } from './user.module';

@Module({
  imports: [
    UsuarioModule,
    JwtModule.register({
      global: true,
      secret:
        '1f8e2c5e6d134a8f9d7a834b8d72e0a8b9d4f8c5e6d1a2b3c4d5e6f7g8h9i0j1',
      signOptions: { expiresIn: '120s' },
    }),
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})

export class AuthModule {}
