import { Service } from "typedi";
import { Books } from "../Entity/book-entity";
import { Author } from "../Entity/author-entity";
import { Category } from "../Entity/category-entity";

@Service()
export class BookRepository 
{
    async createBook(book: Books)
    {
        return await book.save()
    }

    async findBooks()
    {
        return await Books.findAll({include: [Author , Category]})
    }

    async findBookById(isbn: number) 
    {
        return await Books.findOne({where: {bookIsbn: isbn} , include: [Author, Category]})
    }

    async updateBookByIsbn(isbn: number , data: Books)
    {
        const updatePayload = 
            {
                bookTitle: data.bookTitle,
                bookIsbn: data.bookIsbn,
                publishYear: data.publishYear,
                authorId: data.authorId,
                categoryId: data.categoryId
            };

        await Books.update(updatePayload ,{where: {bookIsbn: isbn}});

        return await Books.findOne({where:{bookIsbn: isbn}, include: [Author , Category]})
    }

    async deleteBook(isbn: number)
    {
        return await Books.destroy({where: {bookIsbn : isbn}})
    }
}