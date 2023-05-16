"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_entity_1 = require("./entities/user.entity");
let UsersService = class UsersService {
    constructor(usersRepository) {
        this.usersRepository = usersRepository;
    }
    async getAll() {
        return await this.usersRepository.find({
            relations: {
                clients: true,
                doctor: true
            }
        });
    }
    async getUsers({ role }) {
        return await this.usersRepository.find({
            where: {
                role,
            },
            relations: {
                clients: true,
                doctor: true
            },
        });
    }
    async getUser(query) {
        return await this.usersRepository.findOne(query);
    }
    async create(createUserDto) {
        return await this.usersRepository.save(createUserDto);
    }
    async createUser(username, password, role, telegramId) {
        return this.usersRepository.save({
            username,
            password,
            role,
            telegramId
        });
    }
    async assignPatientToDoctor(doctorId, clientId) {
        const doctor = await this.usersRepository.findOne({ where: { role: user_entity_1.Role.Doctor, id: doctorId } });
        const client = await this.usersRepository.findOne({ where: { role: user_entity_1.Role.Client, id: clientId } });
        if (!doctor || !client) {
            throw new Error('Doctor or patient not found');
        }
        client.doctor = doctor;
        return this.usersRepository.save(client);
    }
    async deleteAssignPatientToDoctor(doctorId, clientId) {
        const doctor = await this.usersRepository.findOne({ where: { role: user_entity_1.Role.Doctor, id: doctorId } });
        const client = await this.usersRepository.findOne({ where: { role: user_entity_1.Role.Client, id: clientId } });
        if (!doctor || !client) {
            throw new Error('Doctor or patient not found');
        }
        client.doctor = null;
        return this.usersRepository.save(client);
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map