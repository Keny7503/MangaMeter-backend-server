import { Router } from 'express';
import { addManga } from '../services/addManga';
import {getTheGenreId} from '../utils/getTheGenreId';
import { addMangaGenreId } from '../services/addMangaGenreId';
import { getAverGRating } from '../services/getAverGRating';

const router = Router();

// Define the route to fetch all genres
router.get("/", async (req, res) => {
    try {
        // const data = await addManga("1123","text manga");
        // const data = await getTheGenreId(["Thriller","Sports"]);
        // const data = await addMangaGenreId("1123","07251805-a27e-4d59-b488-f0bfbec15168");
        const data = await getAverGRating("1133",true);
        console.log(data);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed ", details: error });
    }
});

export default router;