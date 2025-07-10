import { Default, PrimaryKey } from "sequelize-typescript";
import { Books } from "./book-entity";
import { Table, Column, Model, HasMany, DataType } from 'sequelize-typescript';

@Table({tableName: 'categories' , timestamps: false, freezeTableName: true})
export class Category extends Model<Category> 
{
    @PrimaryKey
    @Default(DataType.UUIDV4) // Automatically generates a UUID
    @Column({field: 'category_id',})
    categoryId!: string;

    @Column({field: 'category_name', type:DataType.STRING, allowNull: false})
    categoryName!: string;

    @HasMany(() => Books)
    books!: Books[];
}