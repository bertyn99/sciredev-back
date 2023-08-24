import { BaseRepository } from "src/infrastructure/common/repository";
import { User } from "../entities/user.entity";

export interface UsersRepository  {
    getAllUsers() : Promise<User[]>;

    checkAuthUser(userEmail:string):Promise<User>;

    saveUser(newUser:User):Promise<User>;

    getUserById(id:number):Promise<User>;

    deleteUser(id:number):void;

    // update(user:User):void;
 
}

