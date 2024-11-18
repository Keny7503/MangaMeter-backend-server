import { Router } from 'express';
import { addRating } from '../services/addRating';
import { addMangaWithGenres } from '../services/addMangaWithGenres';
import { doesMangaExist } from '../utils/doesMangaExist';

const router = Router();

// Define a route that uses query parameters for rating, mangaName, mangaId, genre, userId, and RatedManga
router.get("/", async (req, res) => {
    const rating = parseFloat(req.query.rating as string);
    const mangaId = req.query.mangaId as string;
    const userId = req.query.userId as string;
    const genreId = req.query.genre as string;

    // Validate query parameters
    if (!mangaId || isNaN(rating) || !userId || !genreId) {
        res.status(400).json({ error: "rating, mangaId, and genre are required query parameters" });
        return;
    }
    try {
        const mangaExist = await !doesMangaExist(mangaId);
        console.log(mangaExist)

        if(!mangaExist){
            const mangaResult =  await addMangaWithGenres(mangaId);
            if (!mangaResult) {
                res.status(500).json({ error: "Failed to add rating with genres" });
                return;
            }
            console.log("Manga Added:" +mangaResult)
        }

        // Add the rating for the manga
        console.log("adding rating")
        const ratingResult = await addRating(rating, mangaId, userId, genreId);

        // Send a single response including both results
        res.status(200).json({
            success: true,
            data: {
                ratingResult: ratingResult
            }
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to add manga and rating", details: error });
    }
});

export default router;
