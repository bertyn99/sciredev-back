import { BaseRepository } from "src/infrastructure/common/repository";
import { User } from "../entities/user.entity";

export interface UsersRepository  {
    testrepo()

    findSignInUser(userEmail:string):Promise<any>;
}

// export const USERSREPOSITORY = Symbol('USERSREPOSITORY');