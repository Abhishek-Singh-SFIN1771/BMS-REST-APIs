import { Body, Delete, Get, HttpCode, JsonController, Param, Post, Put } from "routing-controllers";
import { BookService } from "../servic/book-service";
import { BookDto } from "../payloa/books-payload";
import { Service } from "typedi";


@Service()
@JsonController('/bms')
export class BookController 
{
    private bs: BookService;

    constructor(bookService: BookService)
    {
        this.bs = bookService;
    }

    // Create new Books in DB
    @Post('/book')
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

    @Put('/:isbn')
    async updateBookByIsbn(@Param('isbn') isbn:number, @Body() bookDto:BookDto): Promise<BookDto>
    {
        return this.bs.updateBookByIsbn(isbn , bookDto);
    }

    @Delete('/:isbn')
    deleteBook(@Param('isbn') isbn:number): Promise<string>
    {
        return this.bs.deleteBookByIsbn(isbn)
    }

}