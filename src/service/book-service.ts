import { Service } from "typedi";
import { BookRepository } from "../repository/book-repository";
import { BookDto } from "../payload/books-payload";
import { CustomError } from "../custom-errors/custom-erros";
import { BookAdapter } from "../adapter/book-adapter";

@Service()
export class BookService 
{
    private bookRepo: BookRepository;
    private bookAdapter: BookAdapter;

    constructor (br: BookRepository, ba: BookAdapter)
    {
        this.bookRepo = br;
        this.bookAdapter = ba;
    }

    async createBook(bookDto: BookDto) : Promise<BookDto>
    {
        const existingBook = await this.bookRepo.findById(bookDto.bookIsbn);
        if(existingBook)
            {
                throw new CustomError('📚 Book already exists', 409);
            }

        else 
            {
                const newBookEntity = await this.bookAdapter.dtoToEntity(bookDto);

                const savedBook = await this.bookRepo.create(newBookEntity);

                //  — get full nested data
                const savedBookWithRelations = await this.bookRepo.findById(savedBook.isbn);

                const newBookDto = this.bookAdapter.entityToDto(savedBookWithRelations!);

                return newBookDto;
            }

    }

    async getAllBooks() : Promise<BookDto[]>
    {
        const books = await this.bookRepo.findAll()
        return books.map(book => this.bookAdapter.entityToDto(book));
    }

    async getBookById(isbn: number): Promise<BookDto> 
    {
        const book = await this.bookRepo.findById(isbn)

        if(!book) 
            {
                throw new CustomError('❌ Book not found', 404);
            }

        const bookDto = this.bookAdapter.entityToDto(book);

        return bookDto;

    }

    async updateBookByIsbn(isbn: number , bookDto: BookDto): Promise<BookDto> 
    {
        const bookExists = await this.bookRepo.findById(isbn);

        if(!bookExists) 
            {
                throw new CustomError('❌ Book not found', 404);
            }
        else 
        {
            const bookEntity = await this.bookAdapter.dtoToEntity(bookDto);

            const updatedBook = await this.bookRepo.updateById(isbn , bookEntity);

            const updatedBookDto = this.bookAdapter.entityToDto(updatedBook!);

            return updatedBookDto;
        }    
    }

    async deleteBookByIsbn(isbn: number): Promise<string> 
    {
        const deleteCount = await this.bookRepo.deleteById(isbn);
        if (deleteCount === 0) 
            {
                throw new CustomError('❌ Book not found', 404);
            }

        return '✅ Book deleted successfully';
    }

}