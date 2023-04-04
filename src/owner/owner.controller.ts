import { Body, Controller, Delete, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Owner } from '@prisma/client';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { Roles } from 'src/auth/role.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { Role } from 'src/types/role.enum';
import AddMenuItemDTO from './dto/add-menu-item.dto';
import RegisterRestaurantDTO from './dto/register-restaurant.dto';
import UpdateMenuItemDTO from './dto/update-menu-item.dto';
import { OwnerService } from './owner.service';

@Roles(Role.Owner)
@UseGuards(AuthGuard("jwt"), RolesGuard)
@Controller('owner')
export class OwnerController {

    constructor(private prisma : PrismaService , private ownerService : OwnerService){
    }

    @Post("/register-restaurant")
    registerRestaurant(@CurrentUser() user : Owner, @Body() restaurantDTO : RegisterRestaurantDTO){
        this.ownerService.createRestaurant(user.id, restaurantDTO);
    }

    @Post("/add-menu-item")
    addProduct(@CurrentUser() user: Owner, @Body() menuItem: AddMenuItemDTO){
        this.ownerService.addMenuItem(user.restaurantId, menuItem);
    }

    @Delete("/remove-menu-item/:itemId")
    removeMenuItem(@Param('itemId') itemId: number){
        this.ownerService.removeMenuItem(itemId);
    }

    @Patch("/update-menu-item/:itemId")
    updateMenuItem(@Param('itemId') itemId: number, @Body() updateDTO : UpdateMenuItemDTO){
        return this.ownerService.updateMenuItem(itemId, updateDTO);
    }
}
