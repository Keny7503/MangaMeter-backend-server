import { Router } from 'express';
import { getRatingFromMangaUser } from '../services/getRatingFromMangaUser';

const router = Router();

/**
 * @swagger
 * /user/ratings/manga/get:
 *   get:
 *     summary: Retrieve ratings for a specific manga and user
 *     tags:
 *       - User
 *     description: Fetches the rating score for a specific manga given by a user.
 *     parameters:
 *       - in: query
 *         name: mangaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the manga.
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
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   genreid:
 *                     type: string
 *                     example: 33771934-028e-4cb3-8744-691e866a923e
 *                   ratingscores:
 *                     type: number
 *                     example: 2
 *       400:
 *         description: Missing required query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "mangaId and userId are required query parameters."
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
    const userId = req.query.userId as string;

    try {
        const ratingscores = await getRatingFromMangaUser(mangaId, userId);
        res.status(200).json(ratingscores);
    } catch (error) {
        console.error("Error fetching rating:", error);
        res.status(500).json({ error: "Failed to fetch rating", details: error });
    }
});

export default router;