import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserControllerPort } from './port/user.controller.port';
import { AuthPort } from './port/auth.port';
import { JwtService } from '@nestjs/jwt';
import { User } from './entities/user.entity';
import { SecureData } from './secureData';
import { UsersRepository } from './port/user.repository';

@Injectable()
export class UserService implements UserControllerPort, AuthPort {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService
  ) { }

  testrepo() {
    return this.usersRepository.testrepo();
  }
  async signIn(userEmail: string, password: string): Promise<{ access_token: string }> {

    const security = new SecureData();
    const user: User = await this.usersRepository.checkAuthUser(userEmail);
    const isPasswordMatched = await security.isHashDataMatch(
      password,
      user.password,
    );
    if (!user || !isPasswordMatched) {
      throw new UnauthorizedException('fail auth');
    }
    const payload = { userEmail: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(userName: string, password: string, email: string): Promise<{ access_token: string }> {
    const security = new SecureData();
    const userAlreadyExist: User = await this.usersRepository.checkAuthUser(email);
    if (userAlreadyExist) {
      throw new UnauthorizedException('user already exist');
    }
    const hashedPwd: string = await security.hashData(password);

    const newUser = new User();
    newUser.email = email;
    newUser.password = hashedPwd;
    newUser.name = userName;
    this.usersRepository.createUser(newUser)
    const payload = { userEmail: newUser.email, sub: newUser.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
