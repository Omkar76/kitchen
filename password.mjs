// https://stackoverflow.com/a/67038052
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
// scrypt is callback based so with promisify we can await it
const scryptAsync = promisify(scrypt);
export class Password {
    static async hashPassword(password) {
        const salt = randomBytes(16).toString("hex");
        const buf = (await scryptAsync(password, salt, 64));
        return `${buf.toString("hex")}.${salt}`;
    }
    static async comparePassword(storedPassword, suppliedPassword) {
        // split() returns array
        const [hashedPassword, salt] = storedPassword.split(".");
        // we need to pass buffer values to timingSafeEqual
        const hashedPasswordBuf = Buffer.from(hashedPassword, "hex");
        // we hash the new sign-in password
        const suppliedPasswordBuf = (await scryptAsync(suppliedPassword, salt, 64));
        // compare the new supplied password with the stored hashed password
        return timingSafeEqual(hashedPasswordBuf, suppliedPasswordBuf);
    }
}

Password.comparePassword("c5d2bbc3b48544beeca37d87feeb4cb9cef8b65033118d62616d743a931b81666fc2d97fef4d4a7c9608ba2f4622ac1d582e0cd83e949e81766a838b8f0fd5f4.9398ba8929a4768448708785c034d205", "strongpass")
.then(console.log)