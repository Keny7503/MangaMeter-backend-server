import { Router } from 'express';
import { getTheGenreId } from '../utils/getTheGenreId';
import { addRating } from '../services/addRating';

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
        // Set up the POST request to add manga with genres and rating
        const url = "http://localhost:3000/addManga";
        
        const mangaResponse = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                rating,
                mangaName,
                mangaId,
                genre: genreList
            })
        });

        // Check for errors in the manga response
        if (!mangaResponse.ok) {
            throw new Error(`Failed to add manga. Status: ${mangaResponse.status}`);
        }

        // Fetch genre IDs based on the genre names
        const genreData = await getTheGenreId([RatedManga]);
        
        // Check if genreData contains results
        if (!genreData || genreData.length === 0) {
            res.status(404).json({ error: "Genres not found" });
            return;
        }

        // Extract the genre ID from the first item in genreData
        const genreId = genreData[0].id;

        // Await the result of addRating and manga addition response
        const addedRatingResult = await addRating(rating, mangaId, userId, genreId);
        const addedMangaResult = await mangaResponse.json();

        // Send a single response including both results
        res.status(200).json({
            success: true,
            data: {
                mangaResult: addedMangaResult,
                ratingResult: addedRatingResult
            }
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to add manga and rating", details: error });
    }
});

export default router;
