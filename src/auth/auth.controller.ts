import { Controller, Post, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
// import { Role } from 'src/types/role.enum';
import { AuthService } from './auth.service';
// import { Roles } from './role.decorator';
// import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    // @UseGuards(AuthGuard("jwt"), RolesGuard)
    // @Get("/status")
    // @Roles(Role.Admin)
    // test(@Req() req: Request){
    //     return req.user;
    // }



    // body must have {username, password}
    @UseGuards(AuthGuard('local'))
    @Post('admin')
    async login(@Req() req : Request) {
        return this.authService.loginAdmin(req.user);
    }
}
