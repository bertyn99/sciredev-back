import { CreateUserDto } from "../../auth/dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";
import { User } from "../entities/user.entity";

export interface UserControllerPort {

    findAll(): Promise<User[]>;

    findOne(id: number): Promise<User>;

    update(id: number, updateUserDto: UpdateUserDto):Promise<String>;

    remove(id: number): string;
}
// This will be our injection token.
export const USERCONTROLLERPORT = Symbol('USERCONTROLLERPORT');