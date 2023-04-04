import { Admin, Owner, Customer } from "@prisma/client"
import { Role } from "./role.enum"

export declare global {
    namespace Express {
        // TODO : this is annoying . why i need an interface why can't i use union aaaaaaaaaaA!!!!!
        interface User {
            id : number
            username: string
            displayName : string
            role : Role
        }

        // type User = Admin | Owner | Customer;

    }
}

export type User = Omit<(Admin | Owner | Customer), "password"> & {role : string} 

