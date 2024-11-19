import { Application } from 'express';
import searchByNameRoutes from './routes/searchByNameRoute'; 
import genreRoutes from './routes/genreRoutes'; 
import genreUpdateRoutes from './routes/genreUpdateRoutes';
import textRoutes from './routes/textRoutes';
import addMangaRoutes from './routes/addMangaRoutes';
import addRatingRoutes from './routes/addRatingRoutes';
import getAverGRatingRoutes from './routes/getAverGRatingRoutes';
import getAverMRatingRoutes from './routes/getAverMRatingRoutes';
// import getUserMRatingWithGId from './routes/getUserMRatingWithGId';
import getOneRatingRoute from './routes/getOneRatingRoute'; 
import getRatingFromMangaUserRoute from './routes/getRatingFromMangaUserRoute'; 
import addFavoriteRoutes from './routes/addFavoriteRoutes'; 
import getFavoriteManga from './routes/getFavoriteManga'; 
import deleteFavoriteRoutes from './routes/deleteFavoriteRoutes'; 
import checkFavoriteExistsRoutes from './routes/checkFavoriteExistsRoutes'; 

export default (app: Application) => {
  // Define your routes here
  app.get('/', (req, res) => {
    res.send('Hello from the API');
  });
  
  app.use('/manga/search', searchByNameRoutes);
  app.use('/genres', genreRoutes);
  app.use('/ratings', getOneRatingRoute);
  app.use('/ratings/manga/user', getRatingFromMangaUserRoute);
  app.use('/genres/update', genreUpdateRoutes);
  app.use('/manga/add', addMangaRoutes);
  app.use('/ratings/add', addRatingRoutes);
  app.use('/ratings/average/genre', getAverGRatingRoutes);
  app.use('/ratings/average/manga', getAverMRatingRoutes);
  app.use('/favorites/add', addFavoriteRoutes);
  app.use('/favorites', getFavoriteManga);
  app.use('/favorites/delete', deleteFavoriteRoutes);
  app.use('/favorites/check', checkFavoriteExistsRoutes);

  // app.use('/getUserMRating',getUserMRatingWithGId);
  app.use('/test', textRoutes);
};
