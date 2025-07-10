import { Service } from "typedi";
import { Author } from "../Entity/author-entity";

@Service()
export class AuthorRepository {

    async findAuthor(name: string) 
    {
        const category = await Author.findOne({ where: { authorName: name } });
        return category;
    }

    async createAuthor(data: Author) 
    {
        const category = await Author.create(data)
        return category
    }

    async findOrCreateAuthor(name: string) 
    {
        return await Author.findOrCreate({ where: { authorName: name } })
    }
}