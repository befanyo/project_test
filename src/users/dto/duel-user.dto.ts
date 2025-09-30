import { IsNumber } from 'class-validator';

export class DuelUserDto {
  @IsNumber()
  firstUserId: number;

  @IsNumber()
  secondUserId?: number;
}