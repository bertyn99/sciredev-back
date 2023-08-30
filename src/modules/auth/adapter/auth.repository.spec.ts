import { describe, expect, beforeEach, it } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthRepositoryAdapter } from './auth.repository.adapter';
import { Repository } from 'typeorm';
import { User } from 'src/modules/user/entities/user.entity';

describe('AuthRepositoryAdapter', () => {
  let adapter: AuthRepositoryAdapter;
  let repositoryMock;

  const mockUser: User = {
    id: 1,
    email: 'testoy@gmail.com',
    name: 'test',
    password: 'testoy64'
  };

  beforeEach(async () => {
    repositoryMock = {
      findOneBy: async (params) => {
        if (params.email === mockUser.email) return Promise.resolve(mockUser);
        else return Promise.resolve(null);
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthRepositoryAdapter,
        {
          provide: 'REPOSITORY',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    adapter = module.get<AuthRepositoryAdapter>(AuthRepositoryAdapter);
  });

  it('should find a user by email', async () => {
    const result = await adapter.checkAuthUser('testoy@gmail.com');
    expect(result).toEqual(mockUser);
  });

  it('should return null for non-existent email', async () => {
    const result = await adapter.checkAuthUser('nonexistent@gmail.com');
    expect(result).toBeNull();
  });
});
