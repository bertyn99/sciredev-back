import { Inject, Injectable } from "@nestjs/common";
import { AuthRepository } from "../port/auth.repository";
import { User } from "src/modules/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class AuthRepositoryAdapter implements AuthRepository {
    constructor(
        @Inject('REPOSITORY')
        private repository: Repository<User>) {
    }

    checkAuthUser(userEmail: string): Promise<User> {
        return this.repository.findOneBy({
            email: userEmail,
        })
    }
}