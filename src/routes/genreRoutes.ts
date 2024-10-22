import { Router } from 'express';
import { fetchGenres } from '../services/genreList';

const router = Router();

// Define the route to fetch all genres
router.get("/", async (req, res) => {
    try {
        const genres = await fetchGenres();
        res.status(200).json(genres);
    } catch (error) {
        console.error("Error fetching genres:", error);
        res.status(500).json({ error: "Failed to fetch genres", details: error });
    }
});

export default router;