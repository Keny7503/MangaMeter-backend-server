import { Router } from 'express';
import { getSuggestion } from '../utils/getSuggestion';

const router = Router();

/**
 * @swagger
 * /manga/suggestion/get:
 *   get:
 *     summary: Get manga suggestions based on a search query
 *     tags:
 *       - Manga Suggestions
 *     description: Retrieves manga suggestions based on a given query string.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The query string for searching manga suggestions.
 *     responses:
 *       200:
 *         description: Successfully retrieved manga suggestions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: string
 *                   description: The content or response body of the suggestion.
 *                   example: "Manga suggestion content here"
 *       400:
 *         description: Missing required query parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "query is a required query parameter."
 *       500:
 *         description: Failed to retrieve manga suggestions due to server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch suggestions."
 *                 details:
 *                   type: string
 *                   example: "Detailed error information."
 */


// Define the route to fetch all genres
router.get("/", async (req, res) => {
    const query = req.query.query as string;

    try {
        // const art = await getMangaCover(mangaId, coverFileName);
        const suggestion = await getSuggestion(query);
        res.set('Content-Type', suggestion.headers['content-type']);
        console.log(suggestion);
        res.send(suggestion.data);
    } catch (error) {
        console.error("Error fetching cover art:", error);
        res.status(500).json({ error: "Failed to cover art", details: error });
    }
});

export default router;