import { Controller, Delete, Get, Inject, Post } from '@nestjs/common';
import { CONTROLLERPORT, ControllerPort } from '../port/controllerPort';
import { CreateUserDto } from './dto/createUserDto';

@Controller("/users")
export class UsersController {

  constructor(
    @Inject(CONTROLLERPORT)
    private controllerPort: ControllerPort) {}

  @Post("/create")
  createUser(userData: CreateUserDto) {
    return this.controllerPort.create(userData.data);
  }
  @Get("/getAll")
  getAllUsers() {
    return this.controllerPort.getAll();
  }

}