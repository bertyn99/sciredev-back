import { Repository } from "typeorm";

export interface BaseRepository<T> extends Repository<T> {
  this: Repository<T>;

}