"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var Genre_1 = require("../entity/Genre");
var Manga_1 = require("../entity/Manga");
var Rating_1 = require("../entity/Rating");
var User_1 = require("../entity/User");
require('dotenv').config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mssql",
    host: process.env.DB_SERVER,
    port: 1433,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
    synchronize: true,
    logging: false,
    entities: [Genre_1.Genre, Manga_1.Manga, Rating_1.Rating, User_1.User],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map