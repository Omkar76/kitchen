import { Role } from "./role.enum"

export declare global {
    namespace Express {
        interface User {
            id : number
            username: string
            displayName : string
            role : Role
        }
    }
}