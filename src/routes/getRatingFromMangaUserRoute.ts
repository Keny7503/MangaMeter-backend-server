import { Router } from 'express';
import { getRatingFromMangaUser } from '../services/getRatingFromMangaUser';

const router = Router();

// Define the route to fetch all genres
router.get("/", async (req, res) => {
    const mangaId = req.query.mangaId as string;
    const userId = req.query.userId as string;

    try {
        const ratingscores = await getRatingFromMangaUser(mangaId, userId);
        res.status(200).json(ratingscores);
    } catch (error) {
        console.error("Error fetching rating:", error);
        res.status(500).json({ error: "Failed to fetch rating", details: error });
    }
});

export default router;