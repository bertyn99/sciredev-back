import { SignInDto } from "../dto/signIn.dto"
import { SignUpDto } from "../dto/singUp.dto"
import { User } from "../entities/user.entity"

export interface AuthPort {
    signIn(username: string, password: string):Promise<any>
    signUp(username: string, password: string , email:string):Promise<any>
    testrepo():Promise<User[]>
}
export const AUTHPORT = Symbol('AUTHPORT');