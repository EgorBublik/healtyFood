import { Controller, Get, Post, Body, Param} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Post()
  public create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('/signup')
  async createUser(
    @Body('password') password: string,
    @Body('username') username: string,
    @Body('role') role: Role,
    @Body('telegramId') telegramId: string,
  ) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await this.usersService.createUser(
      username,
      hashedPassword,
      role,
      telegramId,
    );
    
    return result;
  }

  @Get(':role')
  getUsers(@Param('role') role: Role) {
    console.log(role)
    return this.usersService.getUsers({role});
  }

  @Post('/assign-patient/:doctorId/:patientId')
  async assignPatientToDoctor(@Param('doctorId') doctorId: number, @Param('patientId') patientId: number) {
    return this.usersService.assignPatientToDoctor(doctorId, patientId);
  }
  
  @Post('/delete-assign-patient/:doctorId/:patientId')
  async deleteAssignPatientToDoctor(@Param('doctorId') doctorId: number, @Param('patientId') patientId: number) {
    return this.usersService.deleteAssignPatientToDoctor(doctorId, patientId);
  }
  
}
