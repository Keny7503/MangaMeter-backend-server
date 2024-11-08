// third-party components
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
require('dotenv').config();

const App: Application = express();

// log by using morgan
App.use(morgan('combined'));
App.use(
  morgan('dev', {
    skip: (req: Request, res: Response) => {
      return res.statusCode < 400;
    },
  }),
);

// support CORS from API
const corsOptions = {
  origin: ['http://localhost:5173'], // Add all possible frontend localhost URLs
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true, // if you are using cookies or authentication tokens
};

App.use(cors(corsOptions));
// Routes ==================================================
import configureRoutes from './route';
configureRoutes(App); // configure our routes

// Create app
const server = http.createServer(App);

// Start app: http://IP_Address:port
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`API V1.0 started listening on port ${PORT}`);
});
export function testfn(){
    return '123';
}

import { fetchGenres } from './services/genreList';
(async () => {
  // Test the fetchGenres function locally
  await fetchGenres();
})();
// expose app
export default App;