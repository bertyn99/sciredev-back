import { CreateUserDto } from "../dto/create-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

export interface UserControllerPort {
    create(createUserDto: CreateUserDto) : string;

    findAll() : string;

    findOne(id: number) : string;

    update(id: number, updateUserDto: UpdateUserDto) : string;

    remove(id: number) : string;
}
// This will be our injection token.
export const USERCONTROLLERPORT = Symbol('USERCONTROLLERPORT');