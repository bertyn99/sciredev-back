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
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiBearerAuth()
@ApiTags('user')
@Controller('user')
export class UserController {

  constructor(
    @Inject(USERCONTROLLERPORT)
    private userControllerPort: UserControllerPort
  ) { }

  @ApiOperation({ summary: 'Return all users' })
  @ApiResponse({ status: 200, description: 'Select all users on the user table', type: [User] })
  @Get('findAll')
  findAll(): Promise<User[]> {
    return this.userControllerPort.findAll();
  }

  @ApiOperation({ summary: 'Find one user by ID' })
  @ApiResponse({ status: 200, description: 'Return the user found by ID', type: User })
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User> {
    return this.userControllerPort.findOne(id);
  }

  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({ status: 200, description: 'Return updated status', type: String })
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto): Promise<String> {
    return this.userControllerPort.update(id, updateUserDto);
  }

  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'Return deletion status', type: String })
  @Delete(':id')
  remove(@Param('id') id: number): string {
    return this.userControllerPort.remove(id);
  }
}
