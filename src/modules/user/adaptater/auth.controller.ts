import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
  } from '@nestjs/common';

import { SignInDto } from './../dto/signIn.dto';
import { SignUpDto } from './../dto/singUp.dto';

@Controller('auth')
export class AuthController{
    // constructor()
    
    @Post()
    async singIn(@Body() signInDto:SignInDto){}

    @Post()
    async singnUp(@Body() signUpDto:SignUpDto){}
}