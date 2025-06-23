import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import jwt, { Algorithm } from "jsonwebtoken";
import { env } from 'process';
import { UsersService } from '../../domains/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) { }

    /*async validateUser(username: string, password: string): Promise<any> {
        const user = await this.usersService.findByUsername(username);
        if (user && (await bcrypt.compare(password, user.password))) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }*/

    async login(user_: any) {
        //const payload = { username: user.username, sub: user.id, roles: user.roles };
        //console.error(email, password);

        const user: any = (await this.validateUser(user_.email, user_.userName, user_.password)) ?? {};
        if (!user)
            return { error: "Invalid credentials" };

        //console.log(user);

        const token = await this.generateToken(user);

        return {
            access_token: token //this.jwtService.sign(payload),
        };
    }

    async validateUser(email: string, userName: string, password: string) {
        const user: any = await this.usersService.findByOne({ /*email, */username: userName })
        if (!user) return null;

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return null;

        return user;
    };

    async generateToken(user: any, algorithm: Algorithm = "HS256"): Promise<any> {
        const payload = {
            _id: user._id,
            name: user.name,
            documentType: user.documentType,
            documentNumber: user.documentNumber,
            address: user.address,
            phoneNumber: user.phoneNumber,
            email: user.email,
            username: user.username,
            role: user.role?.name,
            company: user.company?._id,
            companyName: user.company?.name,
            avatar: user.avatar
        };
        const secret = env.JWT_SECRET ?? "Social Network";
        const token = jwt.sign(payload, secret, { expiresIn: "2h", algorithm });

        return token;
    };
}