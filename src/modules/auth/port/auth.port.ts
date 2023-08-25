import { User } from "../../user/entities/user.entity"

export interface AuthPort {
    signIn(userEmail: string, password: string): Promise<{ access_token: string }>

    signUp(userName: string, password: string , email:string): Promise<{ access_token: string }>
    
    testrepo():Promise<User[]>
}
export const AUTHPORT = Symbol('AUTHPORT');