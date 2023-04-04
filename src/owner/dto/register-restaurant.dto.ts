import { Restaurant } from "@prisma/client";
// import IndianState from "src/utils/states"

// class RegisterRestaurantDTO{
//     name : string  
//     fssaiLicenseNumber : string
//     address : string
//     state : IndianState;
//     enrollmentYear : number
// } 

type RegisterRestaurantDTO = Omit<Restaurant, "id" | "ownerId">

export default RegisterRestaurantDTO;