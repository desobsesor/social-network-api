import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { AppLoggerService } from '../../helpers/logger/logger.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { QueryUserDto } from './dto/query-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        private readonly logger: AppLoggerService,
    ) {
        this.logger.log('Users Service initialized');
    }

    /**
     * Create new user
     * 
     * @param createUserDto user data to update
     * @returns User - User create
     */
    async create(createUserDto: CreateUserDto): Promise<User> {
        this.logger.log('Creating a new user...');
        const hashedPassword = await bcrypt.hash(createUserDto.passwordHash, 10);
        const createdUser = this.userRepository.create({ ...createUserDto, passwordHash: hashedPassword });
        return this.userRepository.save(createdUser);
    }

    /**
     * Actualiza el estado de inicio de sesión del usuario
     * 
     * @param user - Usuario a actualizar
     * @returns User - Usuario actualizado
     */
    async updateIsLogged(user: User): Promise<User> {
        this.logger.log('Updating user session : ' + user.isLogged);
        await this.userRepository.update(user.userId, { isLogged: !user.isLogged });
        return this.userRepository.findOne({ where: { userId: user.userId } });
    }

    /**
     * @returns User[]
     */
    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async findAllPaginated(page: number, pageSize: number): Promise<QueryUserDto> {
        const [users, total] = await this.userRepository.findAndCount({
            skip: (page - 1) * pageSize,
            take: pageSize,
        });
        return { users, total };
    }

    /**
     * @param username
     * @returns User | undefined
     */
    async findByUsername(username: string): Promise<User | undefined> {
        this.logger.log(`Finding user by username: ${username}`);
        return this.userRepository.findOne({
            where: { username }
        });
    }

    /**
     * @param username
     * @returns User | undefined
     */
    async findByOne(query: any): Promise<User | undefined> {
        this.logger.log(`Finding user by query: ${JSON.stringify(query)}`);
        return this.userRepository.findOne({
            where: query,
            // relations: ['role', 'company'],
            // select: { company: { modules: false, managerData: false, userAdmin: false, address: false, email: false, phoneNumber: false, seriesCurrentBillingRange: false, editedBy: false, isMain: false } } // Example of selecting specific fields
        });
    }

    /**
     * @param email
     * @param password
     * @returns User | undefined
     */
    async findByEmailAndPassword(email: string, passwordHash: string): Promise<User | undefined> {
        const user = await this.userRepository.findOne({
            where: { email },
        });

        if (!user) {
            return undefined;
        }
        const isPasswordValid = await bcrypt.compare(passwordHash, user.passwordHash);
        if (!isPasswordValid) {
            return undefined;
        }
        return user;
    }

}
