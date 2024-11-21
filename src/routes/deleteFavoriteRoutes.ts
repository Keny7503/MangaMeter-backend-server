import { Router } from 'express';
import { deleteFavoriteManga } from '../services/deleteFavoriteManga'; // Import the function

const router = Router();

// Define a route that uses query parameters for mangaId and userId
router.delete("/", async (req, res) => {
    const mangaId = req.query.mangaId as string;
    const userId = req.query.userId as string;

    // Validate query parameters
    if (!mangaId || !userId) {
        res.status(400).json({ error: "Both mangaId and userId are required query parameters." });
        return;
    }

    try {
        const response = await deleteFavoriteManga(mangaId, userId);
        console.log("response: ",response)

        if (response === null) { // Handle case where nothing was deleted
            res.status(404).json({ message: "No matching favorite manga found to delete." });
            return;
        }

        // Successful deletion
        res.status(200).json({ message: "Favorite manga deleted successfully.", data: response });
    } catch (error) {
        console.error("Error deleting favorite manga:", error);
        res.status(500).json({ error: "An internal server error occurred." });
    }
});

export default router;
