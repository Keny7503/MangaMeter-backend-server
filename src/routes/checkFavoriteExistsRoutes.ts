import { Router } from 'express';
import { checkFavoriteExists } from '../services/checkFavoriteExist'; // Import the function

const router = Router();

/**
 * @swagger
 * /user/favorites/manga/get:
 *   get:
 *     summary: Check if a manga is in the user's favorites
 *     tags:
 *       - User
 *     description: Checks if a manga is marked as a favorite by a specific user.
 *     parameters:
 *       - in: query
 *         name: mangaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the manga to check.
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose favorites are being checked.
 *     responses:
 *       200:
 *         description: Successfully checked if the manga is in the user's favorites.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 exists:
 *                   type: boolean
 *                   description: Indicates whether the manga is in the user's favorites.
 *                 message:
 *                   type: string
 *                   description: Additional information about the check.
 *       400:
 *         description: Missing required query parameters (mangaId, userId).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "mangaId, userId is required query parameters"
 *       500:
 *         description: Internal server error or failure during the check.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error"
 */


// Define a route that uses query parameters for mangaName, mangaId, and genre
router.get("/", async (req, res) => {
    const mangaId = req.query.mangaId as string;
    const userId = req.query.userId as string;

    // Validate query parameters
    if (!mangaId || !userId) {
        res.status(400).json({ error: "mangaId, userId is required query parameters" });
        return;
    }

    try {
        const response = await checkFavoriteExists(userId, mangaId);
        
        // Send the response based on the result of addMangaWithGenres
        // if (!response) {
        //     res.status(500).json({ error: "Failed to delete favorite manga" });
        //     return;
        // }
        console.log(response);
        // Send the response based on the result of addMangaWithGenres
        res.status(200).json(response);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error});
    }
});

export default router;
