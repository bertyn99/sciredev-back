import { AuthController } from './auth.controller';
import { AUTHPORT, AuthPort } from '../port/auth.port';
import { SignInDto } from '../dto/signIn.dto';
import { SignUpDto } from './../dto/singUp.dto';
import { Test, TestingModule } from '@nestjs/testing';
import { describe, expect, it, beforeEach } from 'vitest';

describe('AuthController', () => {
  const mockAuthPort: AuthPort = {
    signIn: async (email, password) => ({ access_token: 'mockToken' }),
    signUp: async (userName, password, email) => ({ access_token: 'mockToken' }),
  };

  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AUTHPORT,
          useValue: mockAuthPort,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('signIn should return an access token', async () => {
    const signInDto: SignInDto = { email: 'testoy@gmail.com', password: 'testoy64' };
    const result = await controller.signIn(signInDto);
    expect(result).toEqual({ access_token: 'mockToken' });
  });

  it('signUp should return an access token', async () => {
    const signUpDto: SignUpDto = { userName: 'test', password: 'testoy64', email: 'testoy@gmail.com' };
    const result = await controller.signUp(signUpDto);
    expect(result).toEqual({ access_token: 'mockToken' });
  });

});
