import { Router } from 'express';
import { getOneRating } from '../services/getOneRating';

const router = Router();

// Define the route to fetch all genres
router.get("/", async (req, res) => {
    const mangaId = req.query.mangaId as string;
    const genreId = req.query.genreId as string;
    const userId = req.query.userId as string;

    try {
        const ratingscore = await getOneRating(mangaId, genreId, userId);
        res.status(200).json(ratingscore);
    } catch (error) {
        console.error("Error fetching rating:", error);
        res.status(500).json({ error: "Failed to fetch rating", details: error });
    }
});

export default router;