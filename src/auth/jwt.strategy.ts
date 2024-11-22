import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey:
        '1f8e2c5e6d134a8f9d7a834b8d72e0a8b9d4f8c5e6d1a2b3c4d5e6f7g8h9i0j1',
    });
  }

  async validate(payload: any) {
    return payload;
  }
}
