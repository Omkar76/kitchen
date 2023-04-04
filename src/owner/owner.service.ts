import { Body, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import RegisterRestaurantDTO from './dto/register-restaurant.dto';
import AddMenuItemDTO from './dto/add-menu-item.dto';
import UpdateMenuItemDTO from './dto/update-menu-item.dto';

@Injectable()
export class OwnerService {
  constructor(private prisma: PrismaService) {}

  async createRestaurant(ownerId : number, restaurantDTO: RegisterRestaurantDTO) {
    // Logic for creating a new restaurant and saving it to the database
    const { name, address, state, fssaiLicenseNumber, enrollmentYear } = restaurantDTO;
    const newRestaurant = await this.prisma.restaurant.create({
      data: {
        name,
        address,
        state,
        fssaiLicenseNumber,
        enrollmentYear,
        owner: {
          connect: {
            id: ownerId,
          },
        },
      },
    });
    return newRestaurant;
  }

  async addMenuItem(restaurantId, @Body() menuItem: AddMenuItemDTO) {
    // Logic for creating a new menu item and saving it to the database
    const { name, description, price, imageUrl,categories } = menuItem;
    const newMenuItem = await this.prisma.menuItem.create({
      data: {
        name,
        description,
        imageUrl,
        categories,
        price,
        restaurant: {
          connect: {
            id: restaurantId,
          },
        },
      },
    });
    return newMenuItem;
  }

  async removeMenuItem(id: number) {
    // Logic for removing a menu item from the database
    const deletedMenuItem = await this.prisma.menuItem.delete({
      where: { id },
    });
    return deletedMenuItem;
  }

  async updateMenuItem(itemId: number, updatedData: UpdateMenuItemDTO) {
    // Logic for updating a menu item in the database
    // TODO : I guess this is vulnurable to bad input.
    // One may give restaurantId in body as well.
    // resulting in item being assigned to other restaurant
    // Leaving this for now 
    const updatedMenuItem = await this.prisma.menuItem.update({
      where: { id: itemId },
      data: updatedData,
    });

    
    return updatedMenuItem;
  }
}
