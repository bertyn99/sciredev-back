import {
  Controller,
  Post,
  Body,
  Inject,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiOkResponse } from '@nestjs/swagger';

import { SignInDto } from '../dto/signIn.dto';
import { SignUpDto } from '../dto/singUp.dto';
import { AUTHPORT, AuthPort } from '../port/auth.port';
import { Public } from '../public.decorator';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    @Inject(AUTHPORT)
    private authPort: AuthPort,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign in an existing user' })
  @ApiBody({ type: SignInDto })
  @ApiOkResponse({ description: 'Successful login', type: String })
  @Post('signIn')
  signIn(@Body() signInDto: SignInDto): Promise<{ access_token: string }> {
    return this.authPort.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sign up a new user' })
  @ApiBody({ type: SignUpDto })
  @ApiOkResponse({ description: 'Successful registration', type: String })
  @Post('signUp')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ access_token: string }> {
    return this.authPort.signUp(signUpDto.userName, signUpDto.password, signUpDto.email);
  }

  @Public()
  @ApiOperation({ summary: 'Test the repository' })
  @ApiResponse({ status: 200, description: 'Test successful' })
  @Get('testrepository')
  testrepo() {
    return this.authPort.testrepo();
  }
}
