import { IsString, Length, IsOptional, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(3, 32)
  username: string;

  @IsOptional()
  @IsEmail()
  email?: string;
}
