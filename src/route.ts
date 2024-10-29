import { Application } from 'express';
import searchByNameRoutes from './routes/searchByNameRoute'; 
import genreRoutes from './routes/genreRoutes'; 
import genreUpdateRoutes from './routes/genreUpdateRoutes';

export default (app: Application) => {
  // Define your routes here
  app.get('/', (req, res) => {
    res.send('Hello from the API');
  });
  app.use('/manga/search', searchByNameRoutes);
  app.use('/genres', genreRoutes);
  app.use('/genreUpdate',genreUpdateRoutes);
};
