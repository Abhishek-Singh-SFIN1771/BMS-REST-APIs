import { app } from "./app-start";
import { sequelize } from "./config/db-config";

sequelize.sync({alter : true}).then(() => 
    {
        console.log("Database is Synced");
        app.listen(3000, () => console.log('🚀 Server running at http://localhost:3000'))
    })