import { Table, Column, Model, ForeignKey, BelongsTo, DataType, PrimaryKey,  Default } from 'sequelize-typescript';
import { Author } from "../entity/author-entity";
import { Category } from "../entity/category-entity";


@Table({ tableName: 'books' , timestamps: false, freezeTableName: true})
export class Books extends Model<Books> 
{

@PrimaryKey
  @Default(DataType.UUIDV4) // Automatically generates a UUID
  @Column({ field: 'id' })
  id!: string;

  @Column({ type: DataType.STRING(50), allowNull: false })
  title!: string;

  @Column({ field: 'book_isbn', type: DataType.INTEGER, allowNull: false })
  isbn!: number;

  @Column({ field: 'publish_year', type: DataType.INTEGER, allowNull: false })
  publishYear!: number;

  @ForeignKey(() => Author)
  @Column({ field: 'author_id' })
  authorId!: string;

  @BelongsTo(() => Author)
  author!: Author;

  @ForeignKey(() => Category)
  @Column({ field: 'category_id' })
  categoryId!: string;

  @BelongsTo(() => Category)
  category!: Category;
}    


