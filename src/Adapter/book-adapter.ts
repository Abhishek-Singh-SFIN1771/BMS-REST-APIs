import { Service } from "typedi";
import { IBookAdapter } from "./book-adapter-interface";
import { Books } from "../entity/book-entity";
import { BookDto } from "../payload/books-payload";
import { BookService } from "../service/book-service";
import { CategoryService } from "../service/category-service";
import { AuthorService } from "../service/author-service";
import { AuhtorDto } from "../payload/author-paylaod";
import { CategoryDto } from "../payload/category-payload";


@Service()
export class BookAdapter implements IBookAdapter<Books , BookDto> 
{
    private bs: BookService;
    private cs: CategoryService;
    private as: AuthorService

    constructor (bookservice: BookService, categoryService: CategoryService , authorService: AuthorService)
    {
        this.bs = bookservice;
        this.cs = categoryService
        this.as = authorService
    }

    entityToDto(book: Books): BookDto 
    {
        const bookDto = new BookDto();
        
        bookDto.bookId = book.id;
        bookDto.bookTitle = book.title;
        bookDto.bookIsbn = book.isbn;
        bookDto.publishYearValue = book.publishYear;
        if(book.author)
            {
                const authorDTO = new AuhtorDto ()
                authorDTO.authorId = book.author.id;
                authorDTO.authorName = book.author.authorName;
                bookDto.authorDetails = authorDTO
            }
        if (book.category) 
            {
                const categoryDto = new CategoryDto ()
                categoryDto.categoryId = book.category.id;
                categoryDto.categoryName = book.category.categoryName
                bookDto.categoryDetails = categoryDto 
            }
                
        return bookDto; 
    }

    // Converting From Payload TO Model/Entity
    async dtoToEntity(bookDto: BookDto): Promise<Books> 
    {

        const author = await this.as.getOrCreateAuthor(bookDto.authorNameValue);
        const category = await this.cs.getOrCreateCategory(bookDto.categoryNameValue);

        const book = new Books();

        book.title = bookDto.bookTitle;
        book.isbn = bookDto.bookIsbn;
        book.publishYear = bookDto.publishYearValue;
        book.authorId = author.id;
        book.categoryId = category.id;

        return book.get({ plain: true}) as Books;
    }
    
}