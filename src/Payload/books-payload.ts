import { AuhtorDto } from "../payload/author-paylaod";
import { CategoryDto } from "../payload/category-payload";

export class BookDto 
{
    private id?: string;
    private title!: string;
    private isbn!: number;
    private publishYear!: number;
    private authorName!: string;
    private categoryName!: string;
    private author?: AuhtorDto;
    private category?: CategoryDto;

    // --- Getters & Setters

    get bookId(): string | undefined {
        return this.id;
    }

    set bookId(value: string | undefined) {
        this.id = value;
    }

    get bookTitle(): string {
        return this.title;
    }

    set bookTitle(value: string) {
        this.title = value;
    }

    get bookIsbn(): number {
        return this.isbn;
    }

    set bookIsbn(value: number) {
        this.isbn = value;
    }

    get publishYearValue(): number {
        return this.publishYear;
    }

    set publishYearValue(value: number) {
        this.publishYear = value;
    }

    get authorNameValue(): string {
        return this.authorName;
    }

    set authorNameValue(value: string) {
        this.authorName = value;
    }

    get categoryNameValue(): string {
        return this.categoryName;
    }

    set categoryNameValue(value: string) {
        this.categoryName = value;
    }

    get authorDetails(): AuhtorDto | undefined {
        return this.author;
    }

    set authorDetails(value: AuhtorDto | undefined) {
        this.author = value;
    }

    get categoryDetails(): CategoryDto | undefined {
        return this.category;
    }

    set categoryDetails(value: CategoryDto | undefined) {
        this.category = value;
    }

}