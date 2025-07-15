import { Model } from "sequelize";

export interface ICrudRepository<T extends Model<T> , ID> 
{
  create(data: T): Promise<T>;

  findById(id: ID): Promise<T | null>;

  findAll(): Promise<T[]>;

  updateById(id: ID , data: T) : Promise <T | null>

  deleteById(id: ID): Promise<number>;

  deleteAll(): Promise<number>;
}