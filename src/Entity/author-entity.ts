import { Default, PrimaryKey } from "sequelize-typescript";
import { Books } from "../entity/book-entity";
import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';

@Table({tableName: 'authors' , timestamps: false, freezeTableName: true})
export class Author extends Model<Author> 
{
    @PrimaryKey
    @Default(DataType.UUIDV4) // Automatically generates a UUID
    @Column({field: 'id'})
    id!: string;

    @Column({field: 'author_name', type:DataType.STRING, allowNull: false})
    authorName!: string;


    @HasMany(() => Books)
    books!: Books[];
}

