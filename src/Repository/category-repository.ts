import { Service } from "typedi";
import { Category } from "../Entity/category-entity";

@Service()
export class CategoryRepository 
{
    async findCategory(name: string) 
    {
        const category = await Category.findOne({where: {categoryName : name}});
        return category;
    }

    async createCategory(data : Category) 
    {
        const category = await Category.create(data)
        return category 
    }

    async findOrCreateCategory(name : string)
    {
        return await Category.findOrCreate({where: {categoryName: name}})
    }


}