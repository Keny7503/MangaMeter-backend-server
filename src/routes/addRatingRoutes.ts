import { Router } from 'express';
import { addRating } from '../services/addRating';
import { addMangaWithGenres } from '../services/addMangaWithGenres';
import { doesMangaExist } from '../utils/doesMangaExist';

const router = Router();

/**
 * @swagger
 * /manga/ratings/add:
 *   post:
 *     summary: Add a rating for a manga, and add the manga with its genres if it doesn't exist
 *     tags:
 *       - Manga
 *     description: Adds a rating for a manga. If the manga does not exist, it will first be added to the database along with its genres.
 *     parameters:
 *       - in: query
 *         name: rating
 *         required: true
 *         schema:
 *           type: number
 *           format: float
 *         description: The rating to assign to the manga (e.g., 4.5).
 *       - in: query
 *         name: mangaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the manga being rated.
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user providing the rating.
 *       - in: query
 *         name: genre
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the genre for the manga.
 *     responses:
 *       200:
 *         description: Manga rating successfully added. Manga and genres are also added if they did not exist.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   properties:
 *                     ratingResult:
 *                       type: object
 *                       description: Details about the rating addition.
 *       400:
 *         description: Missing required query parameters (rating, mangaId, genre, userId).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "rating, mangaId, and genre are required query parameters"
 *       500:
 *         description: Internal server error or failure in adding manga or rating.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add manga and rating"
 *                 details:
 *                   type: string
 *                   description: Additional error details.
 */


// Define a route that uses query parameters for rating, mangaName, mangaId, genre, userId, and RatedManga
router.post("/", async (req, res) => {
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
