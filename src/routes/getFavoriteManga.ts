import { Router } from 'express';
import { SearchFavoriteManga } from '../services/SearchFavoriteManga'; // Import the function

const router = Router();

/**
 * @swagger
 * /user/favorites/get:
 *   get:
 *     summary: Retrieve a user's favorite mangas
 *     tags:
 *       - User
 *     description: Fetches the list of a user's favorite mangas with pagination support.
 *     parameters:
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user whose favorite mangas are being retrieved.
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The maximum number of favorite mangas to retrieve per page.
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number for pagination.
 *     responses:
 *       200:
 *         description: Successfully retrieved the user's favorite mangas.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 userId:
 *                   type: string
 *                   description: The unique identifier of the user.
 *                 favorites:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       mangaId:
 *                         type: string
 *                         description: The unique identifier of the manga.
 *                       mangaName:
 *                         type: string
 *                         description: The name of the manga.
 *                   description: List of favorite mangas for the user.
 *                 total:
 *                   type: integer
 *                   description: Total number of favorite mangas.
 *                 page:
 *                   type: integer
 *                   description: Current page number.
 *                 limit:
 *                   type: integer
 *                   description: Number of items per page.
 *               example:
 *                 userId: "12345"
 *                 favorites:
 *                   - mangaId: "67890"
 *                     mangaName: "Attack on Titan"
 *                   - mangaId: "54321"
 *                     mangaName: "Naruto"
 *                 total: 50
 *                 page: 1
 *                 limit: 10
 *       400:
 *         description: Missing or invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "userId, limit (positive integer), and page (positive integer) are required query parameters"
 *       500:
 *         description: Internal server error during the retrieval process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while fetching the user's favorite mangas."
 */


router.get("/", async (req, res) => {
    const userId = req.query.userId as string;
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);

    // Validate query parameters
    if (!userId || isNaN(limit) || limit <= 0 || isNaN(page) || page <= 0) {
        res.status(400).json({ error: "genreId, sortDescending (asc/desc), limit (positive integer), and page (positive integer) are required query parameters" });
        return 
    }

    try {
        // Call the addMangaWithGenres function
        const response = await SearchFavoriteManga(userId,limit,page);

        // Send the response based on the result of addMangaWithGenres
        res.status(200).json(response);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error});
    }
});

export default router;
