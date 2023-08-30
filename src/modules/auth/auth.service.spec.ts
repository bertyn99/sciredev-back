import { AuthService } from './auth.service';
import { AuthRepository } from './port/auth.repository';
import { UsersRepository } from '../user/port/user.repository';
import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { User } from '../user/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { beforeEach, describe, expect, it } from 'vitest';

describe('AuthService', () => {
  const mockUser: User = {
    id: 1,
    email: 'testoy@gmail.com',
    name: 'test',
    password: '$2b$10$REIkuOZmFw45gUDAtrqou.fQKD8rIrCz2dchXpJ6uIuQLqdfqOEvy',
  };

  const mockAuthRepository: AuthRepository = {
    checkAuthUser: async (email: string)=> {
        let result;       
        if (email=='testoy@gmail.com') {
            result = mockUser;
        }else{
            result = null;
        }
        return result;
    } 
  };

  const mockUsersRepository: UsersRepository = {
    getAllUsers: async () => [mockUser],
    getUserById: async (id: number) => mockUser,
    saveUser: async (user: User) => user,
    deleteUser: (id: number) => {},
  };

  const mockJwtService = {
    signAsync: async (payload: any) => 'mocked_jwt_token',
  };

  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: 'AuthRepository',
          useValue: mockAuthRepository,
        },
        {
          provide: 'UsersRepository',
          useValue: mockUsersRepository,
        },
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('signIn should return access token for valid credentials', async () => {
    // Remarque : Ceci suppose que votre fonction `isHashDataMatch` fonctionnerait ici.
    const result = await service.signIn('testoy@gmail.com', 'testoy64');
    expect(result).toStrictEqual({ access_token: 'mocked_jwt_token' });
  });

  it('signIn should throw UnauthorizedException for invalid credentials', async () => {
    const result = service.signIn('wrong_email@gmail.com', 'wrong_password');
    await expect(result).rejects.toThrow(UnauthorizedException);
  });

  it('signUp should return access token', async () => {
    const result = await service.signUp('new_test', 'new_testoy64', 'new_testoy@gmail.com');
    expect(result).toStrictEqual({ access_token: 'mocked_jwt_token' });
  });

  it('signUp should throw UnauthorizedException for existing user', async () => {
    const result = service.signUp('test', 'testoy64', 'testoy@gmail.com');
    await expect(result).rejects.toThrow(UnauthorizedException);
  });

});
