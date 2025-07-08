import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put } from "routing-controllers";
import { BookService } from "../Service/book-service";
import { BookDto } from "../Payload/books-payload";
import { Service } from "typedi";
import { CustomError } from "../Custom-Errors/custom-erros";
// import { CustomError } from "../Custom-Errors/custom-erros";

@Service()
@JsonController('/api/v1/bms')
export class BookController 
{
    private bs: BookService;

    constructor(bookService: BookService)
    {
        this.bs = bookService;
    }

    // Create new Books in DB
    @Post('/addBook')
    @HttpCode(201)
    addBook(@Body() bookDto: BookDto): Promise<BookDto>
    {
        return this.bs.createBook(bookDto);
    }

    // Fetch All Books From Db
    @Get('/books')
    getAllBooks(): Promise<BookDto[]>
    {
        return this.bs.getAllBooks();
    }

    // Fetch Book By it's ID
    @Get('/book/:isbn')
    async getBookByIsbn(@Param('isbn') isbn: number) : Promise<BookDto>
    {
        const book =  await this.bs.getBookById(isbn)

        return book;    
    }

    @Put('/update/:isbn')
    async updateBookByIsbn(@Param('isbn') isbn:number, @Body() bookDto:BookDto): Promise<BookDto>
    {
        return this.bs.updateBookByIsbn(isbn , bookDto);
    }

    @Delete('/deleteBook/:isbn')
    deleteBook(@Param('isbn') isbn:number): Promise<string>
    {
        return this.bs.deleteBookByIsbn(isbn)
    }

}