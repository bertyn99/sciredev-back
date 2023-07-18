import { Inject, Injectable } from "@nestjs/common";
import { ControllerPort } from "../port/controllerPort";

@Injectable()
export class UserServices implements ControllerPort {
    // constructor(
    //     @Inject(UserRepositoryAdapter)
    //     private userRepositoryAdapter:UserRepositoryAdapter,
    // )
    create(data: string) {
        return "new user created";
    }
    getAll() {
        return "all users";
    }

}