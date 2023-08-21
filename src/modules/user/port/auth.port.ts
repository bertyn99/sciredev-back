import { SignInDto } from "../dto/signIn.dto"
import { SignUpDto } from "../dto/singUp.dto"

export interface AuthPort {
    signIn(username: string, password: string):Promise<any>
    signUp(username: string, password: string , email:string):Promise<any>
}
export const AUTHPORT = Symbol('AUTHPORT');