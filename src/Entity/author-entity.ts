import { AutoIncrement, PrimaryKey } from "sequelize-typescript";
import { Books } from "./book-entity";
import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';

@Table({tableName: 'authors' , timestamps: false, freezeTableName: true})
export class Author extends Model<Author> 
{
    @PrimaryKey
    @AutoIncrement
    @Column({field: 'author_id'})
    authorId!: number;

    @Column({field: 'author_name', type:DataType.STRING, allowNull: false})
    authorName!: string;


    @HasMany(() => Books)
    books!: Books[];
}

