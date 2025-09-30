import { Injectable, ConflictException, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { UniqueConstraintError, Sequelize } from 'sequelize';
import { User } from './users.model';
import { CreateUserDto } from './dto/create-user.dto';
import { DuelUserDto } from './dto/duel-user.dto';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User) private userModel: typeof User) {}

  async create(dto: CreateUserDto): Promise<User> {
    try {
      const user = await this.userModel.create(dto);
      return user;
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        throw new ConflictException('Username or email already exists');
      }
      throw new InternalServerErrorException('Database error');
    }
  }

  async duel(dto: DuelUserDto) {
    try {
      const firstUser = await this.userModel.findByPk(dto.firstUserId);
      if (!firstUser) {
        throw new NotFoundException(`Пользователь с id ${dto.firstUserId} не найден`);
      }

      const secondUser = await this.userModel.findByPk(dto.secondUserId);
      if (!secondUser) {
        throw new NotFoundException(`Пользователь с id ${dto.secondUserId} не найден`);
      }

      const winner = Math.random() < 0.5 ? firstUser : secondUser;

      await winner.increment('totalPoints', { by: 1 });

      return await winner.reload();
    } catch (err) {
      if (err instanceof UniqueConstraintError) {
        throw new ConflictException('Username or email already exists');
      }
      throw new InternalServerErrorException('Database error');
    }
  }

 async listUsers(): Promise<User[]> {
  try {
    return await this.userModel.findAll({
      order: [['totalPoints', 'DESC']],
    });
  } catch (err) {
    throw new InternalServerErrorException('Database error');
  }
}

}


