export interface UsersRepository {

    findSignInUser(userEmail:string):Promise<any>;
}

export const USERSREPOSITORY = Symbol('USERSREPOSITORY');