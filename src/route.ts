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

  app.use('/manga/get', searchByNameRoutes);
  app.use('/genres/get', genreRoutes);
  app.use('/user/ratings/manga/genres/get', getOneRatingRoute);
  app.use('/user/ratings/manga/get', getRatingFromMangaUserRoute);
  app.use('/genres/update', genreUpdateRoutes);
  app.use('/manga/add', addMangaRoutes);
  app.use('/manga/ratings/add', addRatingRoutes);
  app.use('/genres/ratings/get', getAverGRatingRoutes);
  app.use('/manga/ratings/get', getAverMRatingRoutes);
  app.use('/user/favorites/manga/add', addFavoriteRoutes);
  app.use('/user/favorites/get', getFavoriteManga);
  app.use('/user/favorites/manga/delete', deleteFavoriteRoutes);
  app.use('/user/favorites/manga/get', checkFavoriteExistsRoutes);

  // app.use('/getUserMRating',getUserMRatingWithGId);
  app.use('/test', textRoutes);
};
