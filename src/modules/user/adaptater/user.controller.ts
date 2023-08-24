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



import { UpdateUserDto } from '../dto/update-user.dto';

import { USERCONTROLLERPORT, UserControllerPort } from '../port/user.controller.port';
import { User } from '../entities/user.entity';

@Controller('user')
export class UserController {

  constructor(
    @Inject(USERCONTROLLERPORT)
    private userControllerPort: UserControllerPort
   ) {}

  @Get('findAll')
  findAll(): Promise<User[]>  {
    return this.userControllerPort.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userControllerPort.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto):Promise<String> {
    return this.userControllerPort.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number): string {
    return this.userControllerPort.remove(id);
  }
}
