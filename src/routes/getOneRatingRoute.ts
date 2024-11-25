import { Router } from 'express';
import { getOneRating } from '../services/getOneRating';

const router = Router();

/**
 * @swagger
 * /user/ratings/manga/genres/get:
 *   get:
 *     summary: Retrieve the rating for a specific manga, genre, and user
 *     tags:
 *       - User
 *     description: Fetches the rating score for a specific manga, genre, and user.
 *     parameters:
 *       - in: query
 *         name: mangaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the manga.
 *       - in: query
 *         name: genreId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the genre.
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user.
 *     responses:
 *       200:
 *         description: Successfully retrieved the rating score.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 ratingscore:
 *                   type: number
 *                   description: The rating score for the manga and genre provided by the user.
 *                   example: 4.5
 *       400:
 *         description: Missing required query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "mangaId, genreId, and userId are required query parameters."
 *       500:
 *         description: Failed to retrieve the rating score due to server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch rating."
 *                 details:
 *                   type: string
 *                   example: "Detailed error information."
 */


// Define the route to fetch all genres
router.get("/", async (req, res) => {
    const mangaId = req.query.mangaId as string;
    const genreId = req.query.genreId as string;
    const userId = req.query.userId as string;

    try {
        const ratingscore = await getOneRating(mangaId, genreId, userId);
        res.status(200).json(ratingscore);
    } catch (error) {
        console.error("Error fetching rating:", error);
        res.status(500).json({ error: "Failed to fetch rating", details: error });
    }
});

export default router;