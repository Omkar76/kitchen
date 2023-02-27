import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '@prisma/client';

@Injectable()
export class AuthService {

    constructor(private jwtService : JwtService){}
    async validateAdmin(username : string, password : string) : Promise<Omit<Admin, "password">>{
        // TODO use data from db. use hashed password
        if(username=="admin" && password =="strongpass"){
            return {
                id : 1,
                username,
                displayName:"Hero Brian"
            }
        }
        return null;
    }

    async loginAdmin(user: Express.User) {
        // console.log("loginAdmin:user", user)
        const payload = { username: user.username, role : user.role };
        return {
          access_token: this.jwtService.sign(payload),
        };
      }
}
