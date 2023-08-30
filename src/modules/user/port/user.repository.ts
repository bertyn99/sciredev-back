import { User } from "../entities/user.entity";

export interface UsersRepository  {
    getAllUsers() : Promise<User[]>;

    saveUser(newUser:User):Promise<User>;

    getUserById(id:number):Promise<User>;

    deleteUser(id:number):void;
 
}

