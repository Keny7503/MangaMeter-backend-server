import { updateGenres } from '../services/genreUpdate';
import { Router } from 'express';

const router = Router();

/**
 * @swagger
 * /genres/update:
 *   patch:
 *     summary: Fetch and update genres
 *     tags:
 *       - Genres
 *     description: Fetches a list of genres from an external source and updates the Supabase database with the retrieved genres.
 *     responses:
 *       200:
 *         description: Successfully updated and retrieved the list of genres.
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
 *         description: Internal server error or failure during the update process.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to update genres"
 *                 details:
 *                   type: string
 *                   description: Detailed error message.
 */


// Define the route to fetch all genres and insert them into the Supabase database
router.patch("/", async (req, res) => {
    try {
        // Call updateGenres, which fetches and inserts genres
        const genres = await updateGenres();

        // Check if genres were returned and respond accordingly
        if (!genres || genres.length === 0) {
            console.warn("No genres found or inserted.");
            res.status(200).json([]); // Respond with an empty array if no genres were found or inserted
            return;
        }

        // Respond with the inserted genres
        res.status(200).json(genres);
    } catch (error) {
        console.error("Error in genre update route:", error);
        res.status(500).json({ error: "Failed to update genres", details: error });
    }
});

export default router;
