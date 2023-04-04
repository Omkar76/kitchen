// class AddMenuItemDTO{
//         itemName : string
//         description : string
//         categories : string[] // TODO : CHANGE TYPE 
//         imageUrl :  string
//         price : number
// }

import { MenuItem } from "@prisma/client"

type AddMenuItemDTO = Omit<MenuItem, "id" | "restaurantId">
export default AddMenuItemDTO