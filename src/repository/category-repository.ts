import { Service } from "typedi";
import { Category } from "../entity/category-entity";
import { ICrudRepository } from "./crud-repository-interface";

@Service()
export class CategoryRepository implements ICrudRepository<Category , string>
{
    async create(data: Category): Promise<Category> 
        {
            return await Category.create(data) 
        }
    
        async findById(id: string): Promise<Category | null>
        {
            return await Category.findOne({where: {id : id}})
        }
    
        async findAll(): Promise<Category[]> 
        {
            return await Category.findAll();
        }
    
        async updateById(id: string, data: Category): Promise<Category | null> 
        {
            const [updatedCount] =  await Category.update(data , {where: {id : id}})  
                    
                    
                    if (updatedCount === 0) 
                        {
                            throw new Error("❌ Category not found or not updated");
                        }else 
                        {
                            const updatedAuthor = await this.findById(data.id);
                            return updatedAuthor
                        }
             
        }
    
        async deleteById(id: string): Promise<number> 
        {
            return await Category.destroy({where: {id : id}})
        }
    
        async deleteAll(): Promise<number> 
        {
            return await Category.destroy({truncate: true});
        }

    async findOrCreateCategory(name : string)
    {
        return await Category.findOrCreate({where: {categoryName: name}})
    }


}