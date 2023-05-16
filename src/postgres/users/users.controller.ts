import { Controller, Get, Post, Body, Param, Req, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import * as bcrypt from 'bcrypt';
import { Role } from './entities/user.entity';
import { Request } from 'express';
// import { AuthGuard } from 'src/auth/auth.guard';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @UseGuards(AuthGuard)
  @Get()
  getAll(@Req() req: any) {
    // console.log(req)
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
