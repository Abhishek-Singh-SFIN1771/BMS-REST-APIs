import { Service } from "typedi";
import { Category } from "../entity/category-entity";
import { CategoryRepository } from "../repository/category-repository";

@Service()
export class CategoryService 
{
    private categoryRepo : CategoryRepository;

    constructor(cr: CategoryRepository) 
    {
        this.categoryRepo = cr;
    }

    async getOrCreateCategory (categoryName : string): Promise<Category>
        {
            const [category] = await this.categoryRepo.findOrCreateCategory(categoryName)
            return category;
        }
}