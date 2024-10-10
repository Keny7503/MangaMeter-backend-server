import "reflect-metadata"
import { DataSource } from "typeorm"
import { Genre } from "../entity/Genre"
import { Manga } from "../entity/Manga"
import { Rating } from "../entity/Rating"
import { User } from "../entity/User"
require('dotenv').config()


export const AppDataSource = new DataSource({
    type: "mssql",
    host: process.env.DB_SERVER,
    port: 1433,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Genre,Manga,Rating,User],
    migrations: [],
    subscribers: [],
})


