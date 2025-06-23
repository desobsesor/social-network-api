import { HttpStatus, Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response } from "express";

@Injectable()
export class AuthMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: () => void) {
        const { authorization } = req.headers;

        /*if (!authorization) {
            return res.status(HttpStatus.UNAUTHORIZED).json({ message: "Unauthorized" });
        }*/

        console.log(`Request... next`);
        next();
    }
}