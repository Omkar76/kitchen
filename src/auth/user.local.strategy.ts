
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Admin } from '@prisma/client';
import { Role } from 'src/types/role.enum';

@Injectable()
export class UserLocalStrategy extends PassportStrategy(Strategy, 'user-local') {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<Express.User> {
    const user = await this.authService.validateUser(username, password);
    // console.log("user", user)
    if (!user) {
      throw new UnauthorizedException();
    }

    // sets req.user 
    // add role
    return {...user, role : Role.User}; 
  }
}
