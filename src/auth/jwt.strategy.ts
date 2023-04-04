import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Request } from 'express';
import { Role } from 'src/types/role.enum';
import { AuthService } from './auth.service';
import { User } from 'src/types/User';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'khdsf.gxmcvbkjzbgflhIna!@#l4k2l4hkwrnesrh1', //TODO replace this
    });
  }

  async validate(payload: any): Promise<User> {
    console.log('payload', payload);
    // const user = this.userService.findByID(payload.id); // TODO. NOT TODO anymore 

    return this.authService.findUser(payload.role, payload.username);

    // return {...user, role : }; // this will be used by req.user
  }
}
