import { Router } from 'express';
import { getAverGRating } from '../services/getAverGRating'; // Import the function

const router = Router();

/**
 * @swagger
 * /genres/ratings/get:
 *   get:
 *     summary: Retrieve average ratings for a specific genre
 *     tags:
 *       - Ratings
 *     description: Fetches a paginated list of average ratings for manga in a specified genre. The results can be sorted in ascending or descending order.
 *     parameters:
 *       - in: query
 *         name: genreId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the genre to filter ratings by.
 *       - in: query
 *         name: sortDescending
 *         required: true
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *         description: Sort order for the results ('asc' for ascending, 'desc' for descending).
 *       - in: query
 *         name: limit
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The maximum number of results per page.
 *       - in: query
 *         name: page
 *         required: true
 *         schema:
 *           type: integer
 *           minimum: 1
 *         description: The page number for paginated results.
 *     responses:
 *       200:
 *         description: Successfully retrieved the average ratings for the specified genre.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 results:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       mangaId:
 *                         type: string
 *                         description: The unique identifier for the manga.
 *                       averageRating:
 *                         type: number
 *                         description: The average rating for the manga.
 *                   example:
 *                     - mangaId: "101"
 *                       averageRating: 4.5
 *                     - mangaId: "102"
 *                       averageRating: 3.8
 *                 total:
 *                   type: integer
 *                   description: Total number of results across all pages.
 *       400:
 *         description: Missing or invalid query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "genreId, sortDescending (asc/desc), limit (positive integer), and page (positive integer) are required query parameters"
 *       500:
 *         description: Internal server error during the retrieval process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An error occurred while fetching ratings."
 */

router.get("/", async (req, res) => {
    const genreId = req.query.genreId as string;
    const sortDescending = req.query.sortDescending === 'desc' ? true : (req.query.sortDescending === 'asc' ? false : null);
    const limit = parseInt(req.query.limit as string);
    const page = parseInt(req.query.page as string);

    // Validate query parameters
    if (!genreId || sortDescending === null || isNaN(limit) || limit <= 0 || isNaN(page) || page <= 0) {
        res.status(400).json({ error: "genreId, sortDescending (asc/desc), limit (positive integer), and page (positive integer) are required query parameters" });
        return 
    }

    try {
        // Call the addMangaWithGenres function
        const response = await getAverGRating(genreId,sortDescending,limit,page);

        // Send the response based on the result of addMangaWithGenres
        res.status(response.status).json(response.json);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error});
    }
});

export default router;
