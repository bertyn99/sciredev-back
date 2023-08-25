import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    MaxLength,
  } from 'class-validator';
  
  export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    @MaxLength(30)
    @ApiProperty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    @ApiProperty()
    password: string;
  }