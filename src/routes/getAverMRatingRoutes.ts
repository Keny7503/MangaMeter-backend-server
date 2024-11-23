import { Router } from 'express';
import { getAverMRating } from '../services/getAverMRating'; // Import the function

const router = Router();

/**
 * @swagger
 * /manga/ratings/get:
 *   get:
 *     summary: Retrieve average rating for a specific manga
 *     tags:
 *       - Ratings
 *     description: Fetches the average rating for a specific manga using its manga ID.
 *     parameters:
 *       - in: query
 *         name: mangaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier for the manga to retrieve its average rating.
 *     responses:
 *       200:
 *         description: Successfully retrieved the average rating for the specified manga.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 mangaId:
 *                   type: string
 *                   description: The unique identifier for the manga.
 *                 averageRating:
 *                   type: number
 *                   description: The average rating for the manga.
 *               example:
 *                 mangaId: "12345"
 *                 averageRating: 4.7
 *       400:
 *         description: Missing required query parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "mangaId are required query parameters"
 *       500:
 *         description: Internal server error during the retrieval process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while fetching the average rating."
 */


router.get("/", async (req, res) => {
    const mangaId = req.query.mangaId as string;

    // Validate query parameters
    if (!mangaId) {
        res.status(400).json({ error: "mangaId are required query parameters" });
        return;
    }

    try {
        // Call the addMangaWithGenres function
        const response = await getAverMRating(mangaId);

        // Send the response based on the result of addMangaWithGenres
        res.status(response.status).json(response.json);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error});
    }
});

export default router;
