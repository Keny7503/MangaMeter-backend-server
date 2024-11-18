import { Router } from 'express';
import { SearchFavoriteManga } from '../services/SearchFavoriteManga'; // Import the function

const router = Router();

router.get("/", async (req, res) => {
    const userId = req.query.userId as string;
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);

    // Validate query parameters
    if (!userId || isNaN(limit) || limit <= 0 || isNaN(page) || page <= 0) {
        res.status(400).json({ error: "genreId, sortDescending (asc/desc), limit (positive integer), and page (positive integer) are required query parameters" });
        return 
    }

    try {
        // Call the addMangaWithGenres function
        const response = await SearchFavoriteManga(userId,limit,page);

        // Send the response based on the result of addMangaWithGenres
        res.status(200).json(response);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error});
    }
});

export default router;
