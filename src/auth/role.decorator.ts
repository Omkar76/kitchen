
import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/types/role.enum';


export const ROLE_KEY = 'roles';
export const Roles = (role: Role) => SetMetadata(ROLE_KEY, role);
