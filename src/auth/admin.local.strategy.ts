
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Admin } from '@prisma/client';
import { Role } from 'src/types/role.enum';

@Injectable()
export class AdminLocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<Express.User> {
    const user = await this.authService.validateAdmin(username, password);
    // console.log("user", user)
    if (!user) {
      throw new UnauthorizedException();
    }
    return {...user, role : Role.Admin}; // accessed by req.user
  }
}
