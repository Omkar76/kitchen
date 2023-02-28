import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin } from '@prisma/client';


// TODO not sure if i should reduce all these validateX methods 
// write more generic version? not changing for now
@Injectable()
export class AuthService {

    constructor(private jwtService: JwtService) { }
    async validateAdmin(username: string, password: string): Promise<Omit<Admin, "password">> {
        // TODO use data from db. use hashed password
        if (username == "admin" && password == "strongpass") {
            return {
                id: 1,
                username,
                displayName: "Hero Brian"
            }
        }
        return null;
    }

    // TODO : replace return type with owner
    async validateOwner(username : string, password : string) : Promise<Omit<Admin, "password">>{
        // TODO use data from db. use hashed password
        if(username=="owner" && password =="strongpass"){
            return {
                id : 1,
                username,
                displayName:"Jack O'Lantern"
            }
        }
        return null;
    }

    // TODO : replace return type with user
    async validateUser(username: string, password: string): Promise<Omit<Admin, "password">> {
        // TODO use data from db. use hashed password
        if (username == "user" && password == "strongpass") {
            return {
                id: 1,
                username,
                displayName: "Hero Brian"
            }
        }
        return null;
    }

    async login(user: Express.User) {
        // console.log("loginAdmin:user", user)
        const payload = { username: user.username, role: user.role };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
