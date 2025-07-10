import { Service } from "typedi";
import { BookAdapterInterface } from "./book-adapter-interface";
import { Books } from "../Entity/book-entity";
import { BookDto } from "../Payload/books-payload";
import { BookService } from "../Service/book-service";
import { CategoryService } from "../Service/category-service";
import { AuthorService } from "../Service/author-service";


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
        
        bookDto.setBookId(book.id);
        bookDto.setBookTitle(book.title);
        bookDto.setBookIsbn(book.isbn);
        bookDto.setPublishYear(book.publishYear);

        if(book.author)
            {
                bookDto.setAuthor(
                    {
                        authorId: book.author.authorId,
                        authorName: book.author.authorName
                    });
            }
        if (book.category) 
            {
                bookDto.setCategory(
                    {
                        categoryId: book.category.categoryId,
                        categoryName: book.category.categoryName
                    }); 
            }
            
        return bookDto; 
    }

    // Converting From Payload TO Model/Entity
    async dtoToEntity(bookDto: BookDto): Promise<Books> 
    {

        const author = await this.as.getOrCreateAuthor(bookDto.getAuthorName());
        const category = await this.cs.getOrCreateCategory(bookDto.getCategoryName());

        const book = new Books();

        book.title = bookDto.getBookTitle();
        book.isbn = bookDto.getBookIsbn();
        book.publishYear = bookDto.getPublishYear();
        book.authorId = author.authorId;
        book.categoryId = category.categoryId;

        return book.get({ plain: true}) as Books;
    }
    
}