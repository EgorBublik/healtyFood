import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {

  constructor(
    @InjectRepository(User) 
    private usersRepository: Repository<User>,
  ) {}

  async getAll(){
    return await this.usersRepository.find();
  }

  async getUser(query: object){
    return await this.usersRepository.findOne(query)
  }

  async create(createUserDto: CreateUserDto) {
    //check username is unique!
    return await this.usersRepository.save(createUserDto);
  }
  
  async createUser(username: string, password: string) {
    //check username is unique
    return this.usersRepository.save({
        username,
        password,
    });
  }

}