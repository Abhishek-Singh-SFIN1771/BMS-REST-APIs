import { Table, Column, Model, ForeignKey, BelongsTo, DataType, PrimaryKey, AutoIncrement } from 'sequelize-typescript';
import { Author } from "./author-entity";
import { Category } from "./category-entity";


@Table({ tableName: 'books' , timestamps: false, freezeTableName: true})
export class Books extends Model<Books> 
{

@PrimaryKey
  @AutoIncrement
  @Column({ field: 'book_id' })
  bookId!: number;

  @Column({ type: DataType.STRING, allowNull: false })
  bookTitle!: string;

  @Column({ field: 'book_isbn', type: DataType.INTEGER, allowNull: false })
  bookIsbn!: number;

  @Column({ field: 'publish_year', type: DataType.INTEGER, allowNull: false })
  publishYear!: number;

  @ForeignKey(() => Author)
  @Column({ field: 'author_id' })
  authorId!: number;

  @BelongsTo(() => Author)
  author!: Author;

  @ForeignKey(() => Category)
  @Column({ field: 'category_id' })
  categoryId!: number;

  @BelongsTo(() => Category)
  category!: Category;
}    


