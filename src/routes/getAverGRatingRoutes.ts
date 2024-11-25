import { Router } from 'express';
import { getAverGRating } from '../services/getAverGRating'; // Import the function

const router = Router();

/**
 * @swagger
 * /genres/ratings/get:
 *   get:
 *     summary: Retrieve average ratings for a specific genre
 *     tags:
 *       - Genres
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
 *                 data:
 *                   type: array
 *                   description: List of manga details with average ratings.
 *                   items:
 *                     type: object
 *                     properties:
 *                       mangaId:
 *                         type: string
 *                         description: The unique identifier for the manga.
 *                       mangaName:
 *                         type: string
 *                         description: The name of the manga.
 *                       genreTags:
 *                         type: array
 *                         description: List of genres associated with the manga.
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               description: Unique identifier for the genre.
 *                             name:
 *                               type: string
 *                               description: Name of the genre.
 *                       coverArtId:
 *                         type: string
 *                         description: The unique identifier for the cover art.
 *                       coverFileName:
 *                         type: string
 *                         description: File name of the manga cover image.
 *                       average_rating:
 *                         type: number
 *                         description: The average rating for the manga.
 *                 total:
 *                   type: integer
 *                   description: Total number of results across all pages.
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *               example:
 *                 data:
 *                   - mangaId: "90043ed2-87d7-4a4c-b9a6-272445afe6af"
 *                     mangaName: "Modern Konosuba (Doujinshi)"
 *                     genreTags:
 *                       - id: "423e2eae-a7a2-4a8b-ac03-a8351462d71d"
 *                         name: "Romance"
 *                       - id: "4d32cc48-9f00-4cca-9b5a-a839f0764984"
 *                         name: "Comedy"
 *                     coverArtId: "8d63bd45-b800-4fcd-801b-6c3f02835ffe"
 *                     coverFileName: "737329f7-a92d-44b5-a46e-c42055d10e55.jpg"
 *                     average_rating: 9
 *                   - mangaId: "46e9a772-184d-498b-8553-6e0801545f12"
 *                     mangaName: "Fate/Grand Order -Epic of Remnant- Pseudo-Singularity II: Subterranean World of Folklore, Agartha - Women of Agartha"
 *                     genreTags:
 *                       - id: "256c8bd9-4904-4360-bf4f-508a76d67183"
 *                         name: "Sci-Fi"
 *                       - id: "33771934-028e-4cb3-8744-691e866a923e"
 *                         name: "Historical"
 *                     coverArtId: "61a2bd0d-6fc1-4dca-9342-411809f81a52"
 *                     coverFileName: "f045e47a-15a8-4d38-b5ab-686e1ccba11c.jpg"
 *                     average_rating: 9
 *                 total: 33
 *                 success: true
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
