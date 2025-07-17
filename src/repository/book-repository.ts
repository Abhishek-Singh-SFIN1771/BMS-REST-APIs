import { Service } from "typedi";
import { Books } from "../entity/book-entity";
import { Author } from "../entity/author-entity";
import { Category } from "../entity/category-entity";
import { ICrudRepository } from "./crud-repository-interface";


@Service()
export class BookRepository implements ICrudRepository<Books, number>
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

 }