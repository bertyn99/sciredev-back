import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject
} from '@nestjs/common';


import { CreateUserDto } from '../dto/create-user.dto';

import { UpdateUserDto } from '../dto/update-user.dto';

import { USERCONTROLLERPORT, UserControllerPort } from '../port/user.controller.port';

@Controller('user')
export class UserController {

  constructor(
    @Inject(USERCONTROLLERPORT)
    private userControllerPort: UserControllerPort
   ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userControllerPort.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userControllerPort.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userControllerPort.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userControllerPort.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userControllerPort.remove(+id);
  }
}
