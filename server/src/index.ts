// import { runDatabaseConnection } from "./services/databaseConnection";
// runDatabaseConnection;

const express = require('express')
const dotenv = require("dotenv");
const morgan = require("morgan");
const helmet = require("helmet");
dotenv.config();
const app = express()
const port = 3000
// Use Helmet for setting security-related HTTP headers
app.use(helmet());

// Use Morgan for logging HTTP requests
app.use(morgan("dev"));
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

import searchRoute from "./routes/search.js";
app.use("/search", searchRoute);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
