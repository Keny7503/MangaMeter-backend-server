import { Router } from 'express';
import { addFavorite } from '../services/addFavorite'; // Import the function
import { doesMangaExist } from '../utils/doesMangaExist';
import { addMangaWithGenres } from '../services/addMangaWithGenres';

const router = Router();

/**
 * @swagger
 * /user/favorites/manga/add:
 *   post:
 *     summary: Add a manga to the user's favorites list
 *     tags: 
 *       - User
 *     description: Adds a manga to the user's favorite list. If the manga doesn't exist, it will also be added with its genres.
 *     parameters:
 *       - in: query
 *         name: mangaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the manga to be added.
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user adding the manga to favorites.
 *     responses:
 *       200:
 *         description: Manga successfully added to the user's favorites.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                   example: "favorite added successfully"
 *       400:
 *         description: Missing required query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "mangaId, userId is required query parameters"
 *       500:
 *         description: Internal server error or failure in adding the manga.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to add favorite manga"
 */

// Define a route that uses query parameters for mangaName, mangaId, and genre
router.post("/", async (req, res) => {
    const mangaId = req.query.mangaId as string;
    const userId = req.query.userId as string;

    // Validate query parameters
    if (!mangaId || !userId) {
        res.status(400).json({ error: "mangaId, userId is required query parameters" });
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
        const response = await addFavorite(mangaId, userId);
        
        // Send the response based on the result of addMangaWithGenres
        if (!response) {
            res.status(500).json({ error: "Failed to add favorite manga" });
            return;
        }

        // Send the response based on the result of addMangaWithGenres
        res.status(200).json(response);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error});
    }
});

export default router;
