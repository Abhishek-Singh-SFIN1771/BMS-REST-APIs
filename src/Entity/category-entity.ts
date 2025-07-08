import { AutoIncrement, PrimaryKey } from "sequelize-typescript";
import { Books } from "./book-entity";
import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';

@Table({tableName: 'categories' , timestamps: false, freezeTableName: true})
export class Category extends Model<Category> 
{
    @PrimaryKey
    @AutoIncrement
    @Column({field: 'category_id',})
    categoryId!: number;

    @Column({field: 'category_name', type:DataType.STRING, allowNull: false})
    categoryName!: string;

    @HasMany(() => Books)
    books!: Books[];
}