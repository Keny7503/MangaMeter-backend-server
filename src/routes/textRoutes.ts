import { Router } from 'express';
import { addManga } from '../services/addManga';
import {getTheGenreId} from '../utils/getTheGenreId';

const router = Router();

// Define the route to fetch all genres
router.get("/", async (req, res) => {
    try {
        // const data = await addManga("1123","text manga");
        const data = await getTheGenreId(["Thriller","Sports"]);
        res.status(200).json(data);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed ", details: error });
    }
});

export default router;