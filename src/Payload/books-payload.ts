import { AuhtorDto } from "./author-paylaod";
import { CategoryDto } from "./category-payload";

export class BookDto 
{
    bookId?: number
    bookTitle!: string;
    bookIsbn!: number;
    publishYear!: number;
    authorName!: string;
    categoryName!:string;

    author?: AuhtorDto ;
    category?: CategoryDto;

    // --- Getters/Setters

    //BookId Getters/Setters
    public getBookId(): number | undefined
    {
        return this.bookId;
    }

    public setBookId(value: number) : void
    {
        this.bookId = value;
    }

    // title Getters/Setters
    public getBookTitle(): string 
    {
        return this.bookTitle;
    }

    public setBookTitle(value: string) : void
    {
        this.bookTitle = value;
    }

    // ISBN getters/Setter
     public getBookIsbn(): number 
    {
        return this.bookIsbn;
    }

    public setBookIsbn(value: number) : void
    {
        this.bookIsbn = value;
    }

    // Publish Year Getters/Setters
    public getPublishYear(): number 
    {
        return this.publishYear;
    }
    public setPublishYear(value: number): void 
    {
        this.publishYear = value;
    }

    // Author Name Getters/Setters
    public getAuthorName(): string 
    {
        return this.authorName;
    }
    public setAuthorName(value: string): void 
    {
        this.authorName = value;
    }

    // Category Name Getters/Setters 
    public getCategoryName(): string
    {
        return this.categoryName;
    }
    public setCategoryName(value: string): void 
    {
        this.categoryName = value;
    }

    // Auhtor Getters/Setters
    public getAuthor(): AuhtorDto | undefined {
        return this.author;
    }
    public setAuthor(value: AuhtorDto | undefined): void {
        this.author = value;
    }

    // Category Setters/Getters
    public getCategory(): CategoryDto | undefined {
        return this.category;
    }
    public setCategory(value: CategoryDto | undefined): void {
        this.category = value;
    }
}