import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Role } from './entities/user.entity';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getAll(req: any): Promise<import("./entities/user.entity").User[]>;
    create(createUserDto: CreateUserDto): Promise<CreateUserDto & import("./entities/user.entity").User>;
    createUser(password: string, username: string, role: Role, telegramId: string): Promise<{
        username: string;
        password: string;
        role: string;
        telegramId: string;
    } & import("./entities/user.entity").User>;
    getUsers(role: Role): Promise<import("./entities/user.entity").User[]>;
    assignPatientToDoctor(doctorId: number, patientId: number): Promise<import("./entities/user.entity").User>;
    deleteAssignPatientToDoctor(doctorId: number, patientId: number): Promise<import("./entities/user.entity").User>;
}
