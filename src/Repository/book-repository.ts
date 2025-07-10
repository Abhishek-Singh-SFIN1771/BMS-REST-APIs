import { Service } from "typedi";
import { Books } from "../Entity/book-entity";
import { Author } from "../Entity/author-entity";
import { Category } from "../Entity/category-entity";
import { CrudRepository } from "./crud-repository-interface";


@Service()
export class BookRepository implements CrudRepository<Books, number>
{
    async create(data: Books): Promise<Books> 
    {
        return await Books.create(data)
    }

    async findById(id: number): Promise<Books | null> 
    {
        return await Books.findOne({where: {isbn: id} , include: [Author, Category]})
    }

    async findAll(): Promise<Books[]> 
    {
        return await Books.findAll({include: [Author , Category]});
    }

    async updateById(id: number, data: Books): Promise<Books| null> 
    {
        const [updatedCount] =  await Books.update(data , {where: {isbn : id}})  
        
        
        if (updatedCount === 0) 
            {
                throw new Error("❌ Book not found or not updated");
            }else 
            {
                const updatedBook = await this.findById(data.isbn);
                return updatedBook
            }

    }

    async deleteById(id: number): Promise<number> 
    {
         return await Books.destroy({where: {isbn : id}})
    }

    async deleteAll(): Promise<number> 
    {
       return await Books.destroy({truncate: true})
    }


//     async createBook(book: Books)
//     {
//         return await this.create(book);
//     }

//     async findBooks()
//     {
//         return await this.findAll({include: [Author , Category]});
//     }

//     async findBookById(id: number) 
//     {
//         return await Books.findOne({where: {isbn: id} , include: [Author, Category]})
//     }

//     async updateBookByIsbn(isbn: number , data: Books)
//     {
//         const updatePayload = 
//             {
//                 bookTitle: data.title,
//                 bookIsbn: data.isbn,
//                 publishYear: data.publishYear,
//                 authorId: data.authorId,
//                 categoryId: data.categoryId
//             };

//         const [updatedCount] = await Books.update(updatePayload ,{where: {isbn: isbn}});

//         if (updatedCount === 0) 
//             {
//                 throw new Error("❌ Book not found or not updated");
//             }

//         return await Books.findOne({where:{isbn: data.isbn}, include: [Author , Category]})
//     }

//     async deleteBook(id: number)
//     {
//         return await Books.destroy({where: {isbn : id}})
//     }
 }