import { Router } from 'express';
import { deleteFavoriteManga } from '../services/deleteFavoriteManga'; // Import the function

const router = Router();

// Define a route that uses query parameters for mangaName, mangaId, and genre
router.delete("/", async (req, res) => {
    const mangaId = req.query.mangaId as string;
    const userId = req.query.userId as string;

    // Validate query parameters
    if (!mangaId || !userId) {
        res.status(400).json({ error: "mangaId, userId is required query parameters" });
        return;
    }

    try {
        const response = await deleteFavoriteManga(mangaId, userId);
        
        // Send the response based on the result of addMangaWithGenres
        if (!response) {
            res.status(500).json({ error: "Failed to delete favorite manga" });
            return;
        }

        // Send the response based on the result of addMangaWithGenres
        res.status(200).json(response);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error});
    }
});

export default router;
