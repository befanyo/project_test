import { IsString, Length, IsOptional, IsEmail, IsNumber } from 'class-validator';

export class listUserDto {
  @IsString()
  @Length(3, 32)
  username: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsNumber(
    { allowNaN: false, allowInfinity: false }, 
    )
  totalPoints?: number;
}
