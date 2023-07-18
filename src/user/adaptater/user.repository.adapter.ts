import { Injectable } from "@nestjs/common";
import { UserRepository } from "../port/user.repository";

export @Injectable()
class UserRepositoryAdapter implements UserRepository {

    createInDb() {
        throw new Error("Method not implemented.");
    }
    getFromDb() {
        throw new Error("Method not implemented.");
    }
}