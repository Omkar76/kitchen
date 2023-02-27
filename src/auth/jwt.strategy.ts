import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

import { Request } from 'express';
import { Role } from 'src/types/role.enum';


@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "khdsf.gxmcvbkjzbgflhIna!@#l4k2l4hkwrnesrh1", //TODO replace this
    });
  }

  async validate(payload: any) : Promise<Express.User> {
    console.log("payload", payload);
    // const user = this.userService.findByID(payload.id); // TODO
    const user:Express.User = {
      username: "admin",
      id : 1,
      displayName : "Admin Sir",
      role : Role.Admin
    }
    return user; // this will be used by req.user
  }
}