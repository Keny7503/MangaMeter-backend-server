import { Router } from 'express';
import { fetchGenres } from '../services/genreList';

const router = Router();

/**
 * @swagger
 * /genres/get:
 *   get:
 *     summary: Fetch all genres
 *     tags:
 *       - Genres
 *     description: Retrieves a list of all available genres.
 *     responses:
 *       200:
 *         description: Successfully retrieved the list of genres.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: The unique identifier for the genre.
 *                   name:
 *                     type: string
 *                     description: The name of the genre.
 *               example:
 *                 - id: "1"
 *                   name: "Action"
 *                 - id: "2"
 *                   name: "Adventure"
 *       500:
 *         description: Internal server error or failure during the fetch operation.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch genres"
 *                 details:
 *                   type: string
 *                   description: Detailed error message.
 */


// Define the route to fetch all genres
router.get("/", async (req, res) => {
    try {
        const genres = await fetchGenres();
        res.status(200).json(genres);
    } catch (error) {
        console.error("Error fetching genres:", error);
        res.status(500).json({ error: "Failed to fetch genres", details: error });
    }
});

export default router;