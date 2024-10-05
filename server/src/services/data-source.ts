import "reflect-metadata"
import { DataSource } from "typeorm"
import { UserTest } from "../entity/Manga"
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
    entities: [UserTest],
    migrations: [],
    subscribers: [],
})


