// src/index.ts

import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import helmet from "helmet";

// Initialize dotenv to load environment variables from .env file
dotenv.config();

const app = express();

// Use Helmet for setting security-related HTTP headers
app.use(helmet());

// Use Morgan for logging HTTP requests
app.use(morgan("dev"));

// Middleware to parse JSON bodies
app.use(express.json());

// Import the search route
import searchRoute from "./routes/search.js";

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, TypeScript with Express!");
});

// Use the search route
app.use("/search", searchRoute);

export default app;
