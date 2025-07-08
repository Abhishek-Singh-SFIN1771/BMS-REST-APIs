import { Service } from "typedi";
import { BookRepository } from "../Repository/book-repository";
import { AuthorRepository } from "../Repository/author-respository";
import { Author } from "../Entity/author-entity";
import { CategoryRepository } from "../Repository/category-repository";
import { Category } from "../Entity/category-entity";
import { BookDto } from "../Payload/books-payload";
import { Books } from "../Entity/book-entity";
import { CustomError } from "../Custom-Errors/custom-erros";
import { CreationAttributes } from "sequelize";

@Service()
export class BookService 
{
    private bookRepo: BookRepository;
    private authorRepo: AuthorRepository;
    private categoryRepo: CategoryRepository;

    constructor (br: BookRepository, ar: AuthorRepository, cr: CategoryRepository)
    {
        this.bookRepo = br;
        this.authorRepo = ar;
        this.categoryRepo = cr;
    }

    async getOrCreateAuthor (authorName: string): Promise<Author>
    {
        const [author] =  await this.authorRepo.findOrCreateAuthor(authorName);
        return author;
    }

    async getOrCreateCategory (categoryName: string): Promise<Category>
    {
        const [category] =  await this.categoryRepo.findOrCreateCategory(categoryName);
        return category;
    }

    async dtoToEntity(bookDto: BookDto) : Promise<Books> 
    {
        const author = await this.getOrCreateAuthor(bookDto.getAuthorName());
        const category = await this.getOrCreateCategory(bookDto.getCategoryName());

        const book = Books.build(
            {
                bookTitle: bookDto.getBookTitle(),
                bookIsbn : bookDto.getBookIsbn(),
                publishYear : bookDto.getPublishYear(),
                authorId : author.authorId,
                categoryId : category.categoryId
            } as Books)    

        return book;
    }

    entityToDto(book: Books) : BookDto
    {
        const bookDto = new BookDto();
        bookDto.setBookId(book.bookId);
        bookDto.setBookTitle(book.bookTitle);
        bookDto.setBookIsbn(book.bookIsbn);
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

    async createBook(bookDto: BookDto) : Promise<BookDto>
    {
        const existingBook = await this.bookRepo.findBookById(bookDto.getBookIsbn());
        if(existingBook)
            {
                throw new CustomError('📚 Book already exists', 409);
            }


        // Converting Fromt Dto to Books Model
        const bookEntity = await this.dtoToEntity(bookDto);

        // Saving inside DB
        const savedBook = await this.bookRepo.createBook(bookEntity);

        // Getting Saved Book with author and Category
        const bookData = await this.bookRepo.findBookById(savedBook.bookIsbn);

        // Converting Entity to Dto
        const book = this.entityToDto(bookData!);

        return book;

    }

    async getAllBooks() : Promise<BookDto[]>
    {
        const books = await this.bookRepo.findBooks()
        return books.map(book => this.entityToDto(book));
    }

    async getBookById(isbn: number): Promise<BookDto> 
    {
        const book = await this.bookRepo.findBookById(isbn)

        if(!book) 
            {
                throw new CustomError('❌ Book not found', 404);
            }

        const bookDto = this.entityToDto(book);
        return bookDto;

    }

    async updateBookByIsbn(isbn: number , bookDto: BookDto): Promise<BookDto> 
    {
        const existingBook = await this.getBookById(isbn);
        
        if(!existingBook)
            {
                throw new CustomError('❌ Book not found', 404);
            }
        const newBook = await this.dtoToEntity(bookDto);
        
        const updatedBook = await this.bookRepo.updateBookByIsbn(isbn , newBook)

        const savedBook = this.entityToDto(updatedBook!);

        return savedBook;
    }

    async deleteBookByIsbn(bookIsbn: number): Promise<string> 
    {
        const deleteCount = await this.bookRepo.deleteBook(bookIsbn);
        if (deleteCount === 0) 
            {
                throw new CustomError('❌ Book not found', 404);
            }

        return '✅ Book deleted successfully';
    }

}