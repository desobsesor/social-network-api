import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

interface InvalidatedToken {
    userId: string;
    timestamp: number;
    reason?: string;
}

@Injectable()
export class AuthService {
    // Map to store invalidated tokens by userId
    private invalidatedTokens: Map<string, InvalidatedToken> = new Map();

    // Expiration time for cleaning invalidated tokens (24 hours in ms)
    private readonly TOKEN_CLEANUP_INTERVAL = 24 * 60 * 60 * 1000;

    constructor(
        private jwtService: JwtService,
        private usersService: UsersService,
    ) {
        //Configure periodic cleanup of invalidated tokens
        setInterval(() => this.cleanupInvalidatedTokens(), this.TOKEN_CLEANUP_INTERVAL);
    }

    async validateUser(email: string, userName: string, password: string): Promise<any> {
        let user: User;

        if (email) {
            user = await this.usersService.findByEmailAndPassword(email, password);
        } else if (userName) {
            user = await this.usersService.findByUsername(userName);
            if (user) {
                const isPasswordValid = await bcrypt.compare(password, user.passwordHash);
                if (!isPasswordValid) {
                    user = null;
                }
            }
        }

        if (!user) {
            return null;
        }

        const { passwordHash: _, ...result } = user;
        return result;
    }

    async generateToken(user: Partial<User> | any) {
        const payload = {
            documentNumber: user.documentNumber,
            firstName: user.firstName,
            lastName: user.lastName,
            username: user.username,
            sub: user.userId,
            email: user.email,
            role: {
                _id: user.role._id,
                name: user.role?.name
            },
            company: {
                _id: user.company._id,
                name: user.company?.name
            },
            avatar: user.avatar
        };

        console.log("payload:", payload);
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async login(loginDto: any) {
        const { email, username, passwordHash } = loginDto;

        if (!email && !username) {
            throw new UnauthorizedException('Email or username is required');
        }
        const user = await this.validateUser(email, username, passwordHash);
        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        if (user) {
            // Update the keepSessionActive field in the database
            await this.usersService.updateIsLogged(user);
        }

        return this.generateToken(user);
    }

    async refreshToken(user: any) {
        return this.generateToken(user);
    }

    async verifyToken(token: string) {
        try {
            const decoded = this.jwtService.verify(token);

            // Check if the token has been invalidated
            if (this.isTokenInvalidated(decoded.sub)) {
                throw new UnauthorizedException('Token has been invalidated');
            }

            return decoded;
        } catch (error) {
            throw new UnauthorizedException('Invalid token');
        }
    }

    async validate(email: string, passwordHash: string): Promise<any> {
        const user = await this.usersService.findByEmailAndPassword(email, passwordHash);

        if (!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        // Generate JWT token with user data
        const payload = {
            sub: user.userId,
            email: user.email,
            username: user.username,
            role: 'Member'
        };

        const token = this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: '24h' // Token expires in 24 hours
        });

        return {
            access_token: token,
            user: {
                id: user.userId,
                email: user.email,
                username: user.username,
                role: 'Member'
            }
        };
    }

    /**
    * Invalidates a specific user's token
    * @param userId - ID of the user whose token will be invalidated
    * @param reason - Optional reason for the invalidation
    * @returns Object with the operation's status
     */
    async invalidateToken(userId: string, reason?: string): Promise<{ success: boolean }> {
        try {
            this.invalidatedTokens.set(userId, {
                userId,
                timestamp: Date.now(),
                reason
            });

            return { success: true };
        } catch (error) {
            console.error('Error al invalidar token:', error);
            return { success: false };
        }
    }

    /**
    * Checks if a user's token has been invalidated
    * @param userId - ID of the user to check
    * @returns true if the token is invalidated, false otherwise
    */
    private isTokenInvalidated(userId: string): boolean {
        return this.invalidatedTokens.has(userId);
    }

    /**
     * Cleans up invalidated tokens that have expired
     * @private
     */
    private cleanupInvalidatedTokens(): void {
        const now = Date.now();

        for (const [userId, tokenData] of this.invalidatedTokens.entries()) {
            // If the token has been invalidated for longer than the cleanup interval, delete it
            if (now - tokenData.timestamp > this.TOKEN_CLEANUP_INTERVAL) {
                this.invalidatedTokens.delete(userId);
            }
        }
    }
}