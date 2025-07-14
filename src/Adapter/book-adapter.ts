import { Service } from "typedi";
import { BookAdapterInterface } from "./book-adapter-interface";
import { Books } from "../Entity/book-entity";
import { BookDto } from "../Payload/books-payload";
import { BookService } from "../Service/book-service";
import { CategoryService } from "../Service/category-service";
import { AuthorService } from "../Service/author-service";
import { AuhtorDto } from "../Payload/author-paylaod";
import { CategoryDto } from "../Payload/category-payload";


@Service()
export class BookAdapter implements BookAdapterInterface<Books , BookDto> 
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