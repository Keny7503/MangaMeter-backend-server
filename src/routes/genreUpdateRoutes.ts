import { updateGenres } from '../services/genreUpdate';
import { Router } from 'express';

const router = Router();

// Define the route to fetch all genres and insert them into the Supabase database
router.get("/", async (req, res) => {
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
