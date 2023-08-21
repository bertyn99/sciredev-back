import {
    Controller,
    Post,
    Body,
    Inject,
    HttpCode,
    HttpStatus,
  } from '@nestjs/common';

import { SignInDto } from './../dto/signIn.dto';
import { SignUpDto } from './../dto/singUp.dto';
import { AUTHPORT, AuthPort } from '../port/auth.port';
import { Public } from '../public.decorator';

@Controller('auth')
export class AuthController{
    constructor(
      @Inject(AUTHPORT)
      private authPort: AuthPort
    ){}
    
    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('singIn')
    singIn(@Body() signInDto:SignInDto){
      return this.authPort.signIn(signInDto.email,signInDto.password)
    }

    @Public()
    @HttpCode(HttpStatus.OK)
    @Post('singnUp')
    singnUp(@Body() signUpDto:SignUpDto){}
}