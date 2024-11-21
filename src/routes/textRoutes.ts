import { Router } from 'express';
import { addManga } from '../services/addManga';
import {getTheGenreId} from '../utils/getTheGenreId';
import { addMangaGenreId } from '../services/addMangaGenreId';
import { getAverGRating } from '../services/getAverGRating';
import {SearchMangaWithTag} from '../utils/SearchMangaWithTag';
import { SearchMangaByGenre } from '../services/SearchMangaByGenre';
import {SearchMangaWithIds} from '../utils/SearchMangaWithIds';
import { SearchMangaByIds } from '../services/SearchMangaByIds';
import {getUserFavorite} from '../utils/getUserFavorite';
import { SearchFavoriteManga } from '../services/SearchFavoriteManga';
import { deleteFavoriteManga } from '../services/deleteFavoriteManga';
import { getRatingCountByGenre } from '../services/getRatingCountByGenre';
import { getFavoriteCountByUser } from '../services/getFavoriteCount';
import { checkFavoriteExists } from '../services/checkFavoriteExist';

const router = Router();

// Define the route to fetch all genres
router.get("/", async (req, res) => {
    try {
        // const data = await addManga("1123","text manga");
        // const data = await getTheGenreId(["Thriller","Sports"]);
        // const data = await addMangaGenreId("1123","07251805-a27e-4d59-b488-f0bfbec15168");
        // const data = await getAverGRating("1133",true);
        // const data = await SearchMangaWithTag("4d32cc48-9f00-4cca-9b5a-a839f0764984");
        // const data = await SearchMangaByGenre("07251805-a27e-4d59-b488-f0bfbec15168");
        // const data = await SearchMangaWithIds(["d14354de-6af5-4b92-825d-47686d3fa145","f1e0fed4-2f72-43ab-8c00-58867312288d"]);
        // const data = await SearchMangaByIds(["d14354de-6af5-4b92-825d-47686d3fa145","f1e0fed4-2f72-43ab-8c00-58867312288d"]);
        // const data = await getUserFavorite("5e5d1b6b-c333-4d01-93e1-532ce98892f3",2,1);
        // const data = await SearchFavoriteManga("5e5d1b6b-c333-4d01-93e1-532ce98892f3",2,1);
        // const data = await deleteFavoriteManga("8495d45a-dbba-48be-8691-7d2a067e3f42","5e5d1b6b-c333-4d01-93e1-532ce98892f3");
        // const data = await getRatingCountByGenre("4d32cc48-9f00-4cca-9b5a-a839f0764984");
        // const data = await getFavoriteCountByUser("f2d32f5e-a0ce-450d-a66f-68c3d1d42442");
        const data = await checkFavoriteExists("f2d32f5e-a0ce-450d-a66f-68c3d1d42442","0a41d6c8-c634-47e3-bb27-6c267904469d");
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed ", details: error });
    }
});

export default router;