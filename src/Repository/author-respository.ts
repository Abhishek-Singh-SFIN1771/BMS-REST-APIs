import { Service } from "typedi";
import { Author } from "../Entity/author-entity";

@Service()

export class AuthorRepository 
{
    async findOrCreateAuthor(name: string) 
    {
        return Author.findOrCreate({where: {authorName: name}})
    }
}