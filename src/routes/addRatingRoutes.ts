import { Router } from 'express';
import { getTheGenreId } from '../utils/getTheGenreId';
import { addRating } from '../services/addRating';
import { addMangaWithGenres } from '../services/addMangaWithGenres';

const router = Router();

// Define a route that uses query parameters for rating, mangaName, mangaId, genre, userId, and RatedManga
router.get("/", async (req, res) => {
    const rating = parseFloat(req.query.rating as string);
    const mangaName = req.query.mangaName as string;
    const mangaId = req.query.mangaId as string;
    const RatedManga = req.query.rGenre as string;
    const userId = req.query.userId as string;
    const genreList = req.query.genre as string[];

    // Validate query parameters
    if (!mangaName || !mangaId || !Array.isArray(genreList) || isNaN(rating)) {
        res.status(400).json({ error: "rating, mangaName, mangaId, and genre (as an array) are required query parameters" });
        return;
    }

    try {
        // Call addMangaWithGenres function to add manga with genres
        const mangaResult = await addMangaWithGenres(mangaName, mangaId, genreList);

        // Fetch genre IDs based on the RatedManga name
        const genreData = await getTheGenreId([RatedManga]);

        // Check if genreData contains results
        if (!genreData || genreData.length === 0) {
            res.status(404).json({ error: "Genres not found" });
            return;
        }

        // Extract the genre ID from the first item in genreData
        const genreId = genreData[0].id;
        console.log("rated genre id: ",genreId);

        // Add the rating for the manga
        const ratingResult = await addRating(rating, mangaId, userId, genreId);

        // Send a single response including both results
        res.status(200).json({
            success: true,
            data: {
                mangaResult: mangaResult.json,
                ratingResult
            }
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to add manga and rating", details: error });
    }
});

export default router;
