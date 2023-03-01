import { Controller, Post, UseGuards, Get, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Role } from 'src/types/role.enum';
import { AuthService } from './auth.service';
import { Roles } from './role.decorator';
import { RolesGuard } from './roles.guard';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService){}

    @UseGuards(AuthGuard("jwt"), RolesGuard)
    @Get("/status")
    @Roles(Role.Admin)
    test(@Req() req: Request){
        return req.user;
    }



    // body must have {username, password}
    @UseGuards(AuthGuard('admin-local'))
    @Post('admin')
    async loginAdmin(@Req() req : Request) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('owner-local'))
    @Post('owner')
    async loginOwner(@Req() req : Request) {
        return this.authService.login(req.user);
    }

    @UseGuards(AuthGuard('cutomer-local'))
    @Post('customer')
    async loginCustomer(@Req() req : Request) {
        return this.authService.login(req.user);
    }
}
