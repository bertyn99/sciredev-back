import { User } from "src/modules/user/entities/user.entity";

export interface AuthRepository {
    checkAuthUser(userEmail:string):Promise<User>;
}