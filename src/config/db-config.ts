const { Sequelize } = require ('sequelize-typescript');
import { Books } from "../Entity/book-entity" ;
import { Author } from "../Entity/author-entity";
import { Category } from "../Entity/category-entity";

export const sequelize = new Sequelize (
    {
        database: 'bms',
        username: 'postgres',
        password: 'Odyssey@123',
        host: 'localhost',
        port: 5432,
        dialect: 'postgres',
        models: [Books, Author, Category],
        logging: false,
        define: 
        {
            underscored: true,        
            freezeTableName: true,
            timestamps: false
        }
    });