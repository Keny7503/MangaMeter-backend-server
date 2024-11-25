// third-party components
import express, { Application, Request, Response, NextFunction } from 'express';
import cors from 'cors';
import morgan from 'morgan';
import http from 'http';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerConfig from './swaggerConfig';
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
App.use(cors());

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

const swaggerDocs = swaggerJsdoc(swaggerConfig);
App.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
// expose app
export default App;