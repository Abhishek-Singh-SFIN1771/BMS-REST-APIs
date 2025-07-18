import { Service } from "typedi";
import { Author } from "../entity/author-entity";
import { ICrudRepository } from "./crud-repository-interface";

@Service()
export class AuthorRepository implements ICrudRepository<Author, string> 
{
    async create(data: Author): Promise<Author> 
    {
        return await Author.create(data) 
    }

    async findById(id: string): Promise<Author | null>
    {
        return await Author.findOne({where: {id : id}})
    }

    async findAll(): Promise<Author[]> 
    {
        return await Author.findAll();
    }

    async updateById(id: string, data: Author): Promise<Author | null> 
    {
        const [updatedCount] =  await Author.update(data , {where: {id : id}})  
                
                
                if (updatedCount === 0) 
                    {
                        throw new Error("❌ Author not found or not updated");
                    }else 
                    {
                        const updatedAuthor = await this.findById(data.id);
                        return updatedAuthor
                    }
         
    }

    async deleteById(id: string): Promise<number> 
    {
        return await Author.destroy({where: {id : id}})
    }

    async deleteAll(): Promise<number> 
    {
        return await Author.destroy({truncate: true});
    }

    async findOrCreateAuthor(name: string) 
    {
        return await Author.findOrCreate({ where: { authorName: name } })
    }
}