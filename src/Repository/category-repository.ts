import { Service } from "typedi";
import { Category } from "../Entity/category-entity";

@Service()
export class CategoryRepository 
{
    async findOrCreateCategory(name: string) 
    {
        const category =  await Category.findOrCreate({where: {categoryName: name}})
        return category;
    }
}