import { Router } from 'express';
import { getAverMRating } from '../services/getAverMRating'; // Import the function

const router = Router();

/**
 * @swagger
 * /manga/ratings/get:
 *   get:
 *     summary: Retrieve average rating for a specific manga
 *     tags:
 *       - Manga
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
 *                 data:
 *                   type: array
 *                   description: A list of genres with their corresponding average ratings.
 *                   items:
 *                     type: object
 *                     properties:
 *                       genreid:
 *                         type: string
 *                         description: The unique identifier for the genre.
 *                         example: "4d32cc48-9f00-4cca-9b5a-a839f0764984"
 *                       averagerating:
 *                         type: number
 *                         description: The average rating for the genre.
 *                         example: 1
 *               example:
 *                 data:
 *                   - genreid: "4d32cc48-9f00-4cca-9b5a-a839f0764984"
 *                     averagerating: 1
 *                   - genreid: "e5301a23-ebd9-49dd-a0cb-2add944c7fe9"
 *                     averagerating: 9
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
