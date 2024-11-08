"use strict";
// import { runDatabaseConnection } from "./services/databaseConnection";
// runDatabaseConnection;
Object.defineProperty(exports, "__esModule", { value: true });
var express = require('express');
var dotenv = require("dotenv");
var morgan = require("morgan");
var helmet = require("helmet");
var cors = require("cors");
dotenv.config();
var app = express();
app.use(cors());
// Use Helmet for setting security-related HTTP headers
app.use(helmet());
// Use Morgan for logging HTTP requests
app.use(morgan("dev"));
app.use(express.json());
app.get("/", function (req, res) {
    res.send("Hello, TypeScript with Express!");
});
var search_js_1 = require("./routes/search.js");
var genre_js_1 = require("./routes/genre.js");
var searchMangaByID_1 = require("./routes/searchMangaByID");
var searchByName_1 = require("./routes/searchByName");
app.use("/search", search_js_1.default);
app.use("/genres", genre_js_1.default);
app.use("/searchMangaID", searchMangaByID_1.default);
app.use("/searchTitle", searchByName_1.default);
exports.default = app;
//# sourceMappingURL=index.js.map