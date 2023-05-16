import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User, Role } from './entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    getAll(): Promise<User[]>;
    getUsers({ role }: {
        role: Role;
    }): Promise<User[]>;
    getUser(query: object): Promise<User>;
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & User>;
    createUser(username: string, password: string, role: string, telegramId: string): Promise<{
        username: string;
        password: string;
        role: string;
        telegramId: string;
    } & User>;
    assignPatientToDoctor(doctorId: number, clientId: number): Promise<User>;
    deleteAssignPatientToDoctor(doctorId: number, clientId: number): Promise<User>;
}
