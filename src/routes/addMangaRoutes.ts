import { Router } from 'express';
import { addMangaWithGenres } from '../services/addMangaWithGenres'; // Import the function

const router = Router();

// Define a route that uses query parameters for mangaName, mangaId, and genre
router.get("/", async (req, res) => {
    const mangaName = req.query.mangaName as string;
    const mangaId = req.query.mangaId as string;
    const genreList = req.query.genre as string[];

    // Validate query parameters
    if (!mangaName || !mangaId || !Array.isArray(genreList)) {
        res.status(400).json({ error: "mangaName, mangaId, and genre (as an array) are required query parameters" });
        return;
    }

    try {
        // Call the addMangaWithGenres function
        const response = await addMangaWithGenres(mangaName, mangaId, genreList);

        // Send the response based on the result of addMangaWithGenres
        res.status(response.status).json(response.json);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error});
    }
});

export default router;
