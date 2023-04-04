import { MenuItem } from "@prisma/client";
import AddMenuItemDTO from "./add-menu-item.dto";

type UpdateMenuItemDTO = Partial<AddMenuItemDTO>

export default UpdateMenuItemDTO;