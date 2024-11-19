import { Router } from 'express';
import { addMangaWithGenres } from '../services/addMangaWithGenres'; // Import the function

const router = Router();

// Define a route that uses query parameters for mangaName, mangaId, and genre
router.post("/", async (req, res) => {
    const mangaId = req.query.mangaId as string;

    // Validate query parameters
    if (!mangaId) {
        res.status(400).json({ error: "mangaId is required query parameters" });
        return;
    }

    try {
        const response = await addMangaWithGenres(mangaId);
        
        // Send the response based on the result of addMangaWithGenres
        if (!response) {
            res.status(500).json({ error: "Failed to add manga with genres" });
            return;
        }

        // Send the response based on the result of addMangaWithGenres
        res.status(response.status).json(response.json);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error});
    }
});

export default router;
