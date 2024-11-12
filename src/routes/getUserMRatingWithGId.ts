import { Router } from 'express';
import { getUserMRatingWithGId } from '../services/getUserMRatingWithGId'; // Import the function

const router = Router();

router.get("/", async (req, res) => {
    const genreId = req.query.genreId as string;
    const userId = req.query.mangaName as string;

    // Validate query parameters
    if (!userId || !genreId) {
        res.status(400).json({ error: "userId, genreId, are required query parameters" });
        return;
    }

    try {
        // Call the addMangaWithGenres function
        const response = await getUserMRatingWithGId(genreId,userId);
        
        // Send the response based on the result of addMangaWithGenres
        res.status(response.status).json(response.json);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error});
    }
});

export default router;
