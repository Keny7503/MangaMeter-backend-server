import { Application } from 'express';
import searchByNameRoutes from './routes/searchByNameRoute'; 
import genreRoutes from './routes/genreRoutes'; 
import genreUpdateRoutes from './routes/genreUpdateRoutes';
import textRoutes from './routes/textRoutes';
import addMangaRoutes from './routes/addMangaRoutes';
import addRatingRoutes from './routes/addRatingRoutes';

export default (app: Application) => {
  // Define your routes here
  app.get('/', (req, res) => {
    res.send('Hello from the API');
  });
  app.use('/manga/search', searchByNameRoutes);
  app.use('/genres', genreRoutes);
  app.use('/genreUpdate',genreUpdateRoutes);
  app.use('/addManga', addMangaRoutes);
  app.use('/addRating',addRatingRoutes);
  app.use('/test', textRoutes);
};
