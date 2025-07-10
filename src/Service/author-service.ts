import { Service } from "typedi";
import { AuthorRepository } from "../Repository/author-respository";
import { Author } from "../Entity/author-entity";

@Service()
export class AuthorService
{
    private ar: AuthorRepository;

    constructor (authorRepo: AuthorRepository)
    {
        this.ar = authorRepo
    }

    async getOrCreateAuthor (authorName : string): Promise<Author>
        {
          const [author] = await this.ar.findOrCreateAuthor(authorName)
          return author;
        }
    
}