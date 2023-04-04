import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AdminLocalStrategy } from './admin.local.strategy';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { OwnerLocalStrategy } from './owner.local.strategy';
import { CustomerLocalStrategy } from './customer.local.strategy';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AuthService, AdminLocalStrategy, OwnerLocalStrategy, CustomerLocalStrategy, JwtStrategy, PrismaService],
  imports: [PassportModule.register({session : true}), JwtModule.register({
    secret: "khdsf.gxmcvbkjzbgflhIna!@#l4k2l4hkwrnesrh1",
    signOptions: {
      expiresIn: '60000s'
    }
  })],
  controllers: [AuthController]
})
export class AuthModule { }
