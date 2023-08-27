import { describe, expect, beforeEach, it } from 'vitest';
import { Test, TestingModule } from '@nestjs/testing';
import { UsersRepositoryAdapter } from './user.repository.adapter';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

describe('UsersRepositoryAdapter', () => {
  let adapter: UsersRepositoryAdapter;
  let repositoryMock;

  const mockUser: User = {
    id: 1,
    email: 'testoy@gmail.com',
    name: 'test',
    password: 'testoy64'
  };

  beforeEach(async () => {
    repositoryMock = {
      delete: async (id) => {
        if (id === mockUser.id) return Promise.resolve();
        else return Promise.reject();
      },
      findOneBy: async (params) => {
        if (params.id === mockUser.id) return Promise.resolve(mockUser);
        else return Promise.reject();
      },
      save: async (user) => Promise.resolve(user),
      find: async () => Promise.resolve([mockUser]),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersRepositoryAdapter,
        {
          provide: 'REPOSITORY',
          useValue: repositoryMock,
        },
      ],
    }).compile();

    adapter = module.get<UsersRepositoryAdapter>(UsersRepositoryAdapter);
  });

  it('should delete a user', async () => {
    const result = await adapter.deleteUser(1);
    expect(result).toBe(undefined); // as we return void, undefined is expected.
  });

  it('should find a user by ID', async () => {
    const result = await adapter.getUserById(1);
    expect(result).toEqual(mockUser);
  });

  it('should save a user', async () => {
    const result = await adapter.saveUser(mockUser);
    expect(result).toEqual(mockUser);
  });

  it('should get all users', async () => {
    const result = await adapter.getAllUsers();
    expect(result).toEqual([mockUser]);
  });
});
