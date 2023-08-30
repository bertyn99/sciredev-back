import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { AuthPort } from "./port/auth.port";
import { User } from "../user/entities/user.entity";
import { JwtService } from "@nestjs/jwt";
import { SecureData } from "./secureData";
import { AuthRepository } from "./port/auth.repository";
import { UsersRepository } from "../user/port/user.repository";
import { log } from "console";

@Injectable()
export class AuthService implements AuthPort {
  constructor(
    @Inject('UsersRepository')
    private readonly usersRepository: UsersRepository,
    @Inject('AuthRepository')
    private readonly authRepository: AuthRepository,
    private jwtService: JwtService
  ) { }

  async signIn(userEmail: string, password: string): Promise<{ access_token: string }> {
    const security = new SecureData();
    const user: User = await this.authRepository.checkAuthUser(userEmail);
    
    const isPasswordMatched = await security.isHashDataMatch(
      password,
      user,
    );

    if ((user == null) || !isPasswordMatched) {
      throw new UnauthorizedException('fail auth');
    }
    const payload = { userEmail: user.email, sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
  async signUp(userName: string, password: string, email: string): Promise<{ access_token: string }> {
    const security = new SecureData();
    const userAlreadyExist: User = await this.authRepository.checkAuthUser(email);
    if (userAlreadyExist) {
      throw new UnauthorizedException('user already exist');
    }
    const hashedPwd: string = await security.hashData(password);

    const newUser = new User();
    newUser.email = email;
    newUser.password = hashedPwd;
    newUser.name = userName;

    this.usersRepository.saveUser(newUser)

    const payload = { userEmail: newUser.email, sub: newUser.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

}