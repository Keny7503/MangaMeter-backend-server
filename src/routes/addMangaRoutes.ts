import { Router } from 'express';
import { addMangaWithGenres } from '../services/addMangaWithGenres'; // Import the function

const router = Router();

/**
 * @swagger
 * /manga/add:
 *   post:
 *     summary: Add a manga along with its genres
 *     tags:
 *       - Manga
 *     description: Adds a manga to the database along with its genres. The manga is identified by its ID.
 *     parameters:
 *       - in: query
 *         name: mangaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the manga to be added.
 *     responses:
 *       200:
 *         description: Manga successfully added with genres.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       400:
 *         description: Missing required query parameters (mangaId).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "mangaId is required query parameter"
 *       500:
 *         description: Internal server error or failure in adding manga with genres.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add manga with genres"
 */


// Define a route that uses query parameters for mangaName, mangaId, and genre
router.post("/", async (req, res) => {
    const mangaId = req.query.mangaId as string;

    // Validate query parameters
    if (!mangaId) {
        res.status(400).json({ error: "mangaId is required query parameters" });
        return;
    }

    try {
        const response = await addMangaWithGenres(mangaId);
        
        // Send the response based on the result of addMangaWithGenres
        if (!response) {
            res.status(500).json({ error: "Failed to add manga with genres" });
            return;
        }

        // Send the response based on the result of addMangaWithGenres
        res.status(response.status).json(response.json);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error});
    }
});

export default router;
