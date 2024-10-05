import { runDatabaseConnection } from "./services/databaseConnection";
runDatabaseConnection;

const express = require('express')
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
dotenv.config();
const app = express()
app.use(cors());

// Use Helmet for setting security-related HTTP headers
app.use(helmet());

// Use Morgan for logging HTTP requests
app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

import searchRoute from "./routes/search.js";
import genreRoute from "./routes/genre.js";
app.use("/search", searchRoute);
app.use("/genres", genreRoute);


export default app;