import { UserService } from './user.service';
import { UsersRepository } from './port/user.repository';
import { UpdateUserDto } from './dto/update-user.dto';
import { beforeEach, describe, expect, it } from 'vitest'
import { Test, TestingModule } from '@nestjs/testing';
import { User } from './entities/user.entity';

describe('UserService', () => {
  const mockUser: User = {
    id: 1,
    email: 'testoy@gmail.com',
    name: 'test',
    password: 'testoy64'
  };

  const mockUsersRepository: UsersRepository = {
    getAllUsers: async () => [mockUser],
    getUserById: async (id: number) => mockUser,
    saveUser: async (user: User) => user,
    deleteUser: (id: number) => {}
  };

  let service: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: 'UsersRepository',
          useValue: mockUsersRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('findAll should return an array of users', async () => {
    const result = await service.findAll();
    expect(result).toStrictEqual([mockUser]);
  });

  it('findOne should return a user by id', async () => {
    const result = await service.findOne(1);
    expect(result).toEqual(mockUser);
  });

  it('update should update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      userName: 'test2',
      email: 'testoy@gmail.com',
      password: 'testoy64'
    };
    const result = await service.update(1, updateUserDto);
    expect(result).toBe(`This action updates a #1 user`);
  });

  it('remove should remove a user by id', () => {
    const result = service.remove(1);
    expect(result).toBe(`This action removes a #1 user`);
  });
});
