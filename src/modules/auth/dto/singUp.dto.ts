import { ApiProperty } from '@nestjs/swagger';
import {
    IsEmail,
    IsNotEmpty,
    IsString,
    Length,
    MaxLength,
  } from 'class-validator';
  
  export class SignUpDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 20)
    @ApiProperty()
    userName: string;
  
    @IsEmail()
    @IsNotEmpty()
    @MaxLength(30)
    @ApiProperty()
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    @ApiProperty()
    password: string;

  }