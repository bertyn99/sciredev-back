import { UserController } from './user.controller';
import { USERCONTROLLERPORT, UserControllerPort } from '../port/user.controller.port';
import { User } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { beforeEach, describe, expect, it } from 'vitest'
import { Test, TestingModule } from '@nestjs/testing';

describe("UserController", () => {
  const mockUser: User = {
    id: 1,
    email: 'testoy@gmail.com',
    name: 'test',
    password: 'testoy64'
  };

  const mockUserControllerPort: UserControllerPort = {
    findAll: async () => [mockUser],
    findOne: async (id: number) => mockUser,
    update: async (id: number, updateUserDto: UpdateUserDto) => 'Update successful',
    remove: (id: number) => 'Removed successfully',
  };

  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: USERCONTROLLERPORT,
          useValue: mockUserControllerPort,
        },
      ],
    }).compile();

    controller = module.get<UserController>(UserController);
  })
  it('findAll should return an array of users', async () => {
    const result = await controller.findAll();
    expect(result).toStrictEqual([mockUser]);
  });

  it('findOne should return a user by id', async () => {
    const result = await controller.findOne(1);
    expect(result).toEqual(mockUser);
  });

  it('update should update a user', async () => {
    const updateUserDto: UpdateUserDto = {
      userName: 'test2',
      email: 'testoy@gmail.com',
      password: 'testoy64'
    };
    const result = await controller.update(1, updateUserDto);
    expect(result).toBe('Update successful');
  });

  it('remove should remove a user by id', () => {
    const result = controller.remove(1);
    expect(result).toBe('Removed successfully');
  });


})


