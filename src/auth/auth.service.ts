import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Admin, Customer, Owner } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/types/role.enum';
import { User } from 'src/types/User';
import { Password } from 'src/utils/password';
// import { User } from 'src/types/User';
/// <reference path="/src/types/User.d.ts" />

// TODO not sure if i should reduce all these validateX methods
// write more generic version? not changing for now
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService, private prisma: PrismaService) {}

  async findUser(role: Role, username: string) {
    switch (role) {
      case Role.Owner:
        const owner = await this.prisma.owner.findUnique({
          where: {
            username,
          },
        });

        if (owner) return { ...owner, role: Role.Owner };
        return null;

      case Role.Admin:
        const admin = await this.prisma.admin.findUnique({
          where: {
            username,
          },
        });

        if (admin) return { ...admin, role: Role.Admin };
        return null;

      case Role.Customer:
        const customer = await this.prisma.customer.findUnique({
          where: {
            username,
          },
        });

        if (customer) return { ...customer, role: Role.Customer };
        return null;
    }
  }
  async validateAdmin(username: string, password: string): Promise<User> {
    // TODO use data from db. use hashed password. this is done.
    const admin = await this.findUser(Role.Admin, username);
    console.log("customer", username, password, admin)
    if(!admin){
        return null;
    }

    const valid = await Password.comparePassword(admin?.password, password);
    console.log("valid", valid)
    if(valid){
        delete admin.password;
        return admin;
    }

    // if (username == 'admin' && password == 'strongpass') {
    //   return {
    //     id: 1,
    //     username,
    //     displayName: 'Hero Brian',
    //     role: Role.Admin,
    //   };
    // }
    // return null;
  }

  // TODO : replace return type with owner
  async validateOwner(username: string, password: string): Promise<User> {
    // TODO use data from db. use hashed password. this is done.

    const owner = await this.findUser(Role.Owner, username);
    console.log("owner", username, password, owner)
    if(!owner){
        return null;
    }

    const valid = await Password.comparePassword(owner?.password, password);
    console.log("valid", valid)
    if(valid){
        delete owner.password;
        return owner;
    }

    // if (username == 'owner' && password == 'strongpass') {
    //   return {
    //     id: 1,
    //     username,
    //     displayName: "Jack O'Lantern",
    //     role: Role.Owner,
    //   };
    // }
    // return null;
  }

  // TODO : replace return type with Customer
  async validateCustomer(username: string, password: string): Promise<User> {
    // TODO use data from db. use hashed password. this is done.

    const customer = await this.findUser(Role.Customer, username);
    console.log("customer", username, password, customer)
    if(!customer){
        return null;
    }

    const valid = await Password.comparePassword(customer?.password, password);
    console.log("valid", valid)
    if(valid){
        delete customer.password;
        return customer;
    }

    // if (username == customer.username && password == 'strongpass') {
    //   return {
    //     id: 1,
    //     username,
    //     displayName: 'Hero Brian',
    //     role: Role.Customer,
    //   };
    // }
  }

  async login(user: User) {
    // console.log("loginAdmin:user", user)
    // user.s
    const payload = { username: user.username, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
