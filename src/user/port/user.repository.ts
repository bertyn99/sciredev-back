
export interface UserRepository {
    createInDb();
    getFromDb();
}
export const UserRepository = Symbol('UserRepository');