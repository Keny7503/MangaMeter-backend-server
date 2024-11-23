import { Router } from 'express';
import { deleteFavoriteManga } from '../services/deleteFavoriteManga'; // Import the function

const router = Router();

/**
 * @swagger
 * /user/favorites/manga/delete:
 *   delete:
 *     summary: Remove a manga from the user's favorites
 *     tags:
 *       - User
 *     description: Deletes a manga from the user's favorite list if it exists.
 *     parameters:
 *       - in: query
 *         name: mangaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the manga to be removed from favorites.
 *       - in: query
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user whose favorite manga is to be removed.
 *     responses:
 *       200:
 *         description: Successfully removed the manga from the user's favorites.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: A success message.
 *                   example: "Favorite manga deleted successfully."
 *                 data:
 *                   type: object
 *                   description: Information about the deleted record.
 *       400:
 *         description: Missing required query parameters (mangaId or userId).
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Both mangaId and userId are required query parameters."
 *       404:
 *         description: No matching favorite manga found to delete.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "No matching favorite manga found to delete."
 *       500:
 *         description: Internal server error or failure during deletion.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "An internal server error occurred."
 */


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
