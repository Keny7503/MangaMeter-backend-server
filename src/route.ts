import { Application } from 'express';
import searchByNameRoutes from './routes/searchByNameRoute'; 

export default (app: Application) => {
  // Define your routes here
  app.get('/', (req, res) => {
    res.send('Hello from the API');
  });
  app.use('/manga/search', searchByNameRoutes);
};
