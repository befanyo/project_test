import { Controller, Post, Body, HttpCode, HttpStatus, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './users.model';
import { DuelUserDto } from './dto/duel-user.dto';
import { listUserDto } from './dto/list-user.dto';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() dto: CreateUserDto): Promise<Partial<User>> {
    const user = await this.usersService.create(dto);
    return {
      id: user.id,
      username: user.username,
      email: user.email,
      totalPoints: user.totalPoints,
      createdAt: user.createdAt,
    };
  }

  @Post("duel")
  async duel(@Body() dto: DuelUserDto) {
    const user = await this.usersService.duel(dto);
   
    
  }

  @Get('list')
  async listUsers(): Promise<Partial<User>[]> {
    const users = await this.usersService.listUsers();
    return users.map(user => ({
      id: user.id,
      username: user.username,
      email: user.email,
      totalPoints: user.totalPoints,
      createdAt: user.createdAt,
    }));
  }
}

