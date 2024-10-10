import { AppDataSource } from "./data-source"
import { Genre } from "../entity/Genre"
require('dotenv').config()


// console.log("test"+ process.env.DB_SERVER);
export const runDatabaseConnection = AppDataSource.initialize().then(async () => {

    console.log("Database connection established!");


}).catch(error => console.log(error))
