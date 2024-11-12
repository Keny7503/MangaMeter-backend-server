import { Router } from 'express';
import { getAverGRating } from '../services/getAverGRating'; // Import the function

const router = Router();

router.get("/", async (req, res) => {
    const genreId = req.query.genreId as string;
    const sortDescending = Boolean(req.query.sortDescending as string);
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);

    // Validate query parameters
    if (!genreId) {
        res.status(400).json({ error: "genreId, sortDescending, limit, offset are required query parameters" });
        return;
    }

    try {
        // Call the addMangaWithGenres function
        const response = await getAverGRating(genreId,sortDescending,limit,page);

        // Send the response based on the result of addMangaWithGenres
        res.status(response.status).json(response.json);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error});
    }
});

export default router;
