import { Router } from 'express';
import { getAverMRating } from '../services/getAverMRating'; // Import the function

const router = Router();

// Define a route that uses query parameters for mangaName, mangaId, and genre
router.get("/", async (req, res) => {
    const mangaId = req.query.mangaId as string;

    // Validate query parameters
    if (!mangaId) {
        res.status(400).json({ error: "mangaId are required query parameters" });
        return;
    }

    try {
        // Call the addMangaWithGenres function
        const response = await getAverMRating(mangaId);

        // Send the response based on the result of addMangaWithGenres
        res.status(response.status).json(response.json);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error});
    }
});

export default router;
