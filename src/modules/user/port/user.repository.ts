import { BaseRepository } from "src/infrastructure/common/repository";
import { User } from "../entities/user.entity";

export interface UsersRepository  {
    testrepo()

    checkAuthUser(userEmail:string):Promise<User>;

    createUser(newUser:User):Promise<User>;
 
}

