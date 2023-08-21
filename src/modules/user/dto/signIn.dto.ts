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
    email: string;
  
    @IsString()
    @IsNotEmpty()
    @Length(8, 20)
    password: string;
  }