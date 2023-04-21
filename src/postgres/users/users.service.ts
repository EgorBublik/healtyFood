import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, Role } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async getAll() {
    return await this.usersRepository.find({
      relations: {
        clients: true,
        doctor: true
      }
    })
  }

  async getUsers({role}: {role: Role}) {
    return await this.usersRepository.find({
      where: {
        role,
      },
      relations:{
        clients: true,
        doctor: true
      },
    })
  }

  async getUser(query: object) {
    return await this.usersRepository.findOne(query)
  }

  async create(createUserDto: CreateUserDto) {
    //check username is unique!
    return await this.usersRepository.save(createUserDto);
  }

  async createUser(username: string, password: string, role: string, telegramId: string) {
    //check username is unique
    return this.usersRepository.save({
      username,
      password,
      role,
      telegramId
    });
  }

  async assignPatientToDoctor(doctorId: number, clientId: number): Promise<User> {
    const doctor = await this.usersRepository.findOne({ where: { role: Role.Doctor, id: doctorId } });
    const client = await this.usersRepository.findOne({ where: { role: Role.Client, id: clientId } });

    if (!doctor || !client) {
      throw new Error('Doctor or patient not found');
    }

    client.doctor = doctor;
    return this.usersRepository.save(client);
  }

  async deleteAssignPatientToDoctor(doctorId: number, clientId: number): Promise<User> {
    const doctor = await this.usersRepository.findOne({ where: { role: Role.Doctor, id: doctorId } });
    const client = await this.usersRepository.findOne({ where: { role: Role.Client, id: clientId } });

    if (!doctor || !client) {
      throw new Error('Doctor or patient not found');
    }

    client.doctor = null;
    return this.usersRepository.save(client);
  }

}