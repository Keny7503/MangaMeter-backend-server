import { Router } from 'express';
import { getMangaCover } from '../utils/getCoverArt';

const router = Router();

/**
 * @swagger
 * /manga/art/get:
 *   get:
 *     summary: Retrieve the cover art for a manga
 *     tags:
 *       - Manga
 *     description: Fetches the cover art for a manga based on its manga ID and cover file name.
 *     parameters:
 *       - in: query
 *         name: mangaId
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the manga.
 *       - in: query
 *         name: coverFileName
 *         required: true
 *         schema:
 *           type: string
 *         description: The file name of the cover art to fetch.
 *     responses:
 *       200:
 *         description: Successfully retrieved the cover art for the manga.
 *         content:
 *           image/jpeg:
 *             schema:
 *               type: string
 *               format: binary
 *           image/png:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Missing required query parameters.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "mangaId and coverFileName are required query parameters."
 *       500:
 *         description: Failed to retrieve the cover art due to server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to cover art."
 *                 details:
 *                   type: string
 *                   example: "Detailed error information."
 */


// Define the route to fetch all genres
router.get("/", async (req, res) => {
    const mangaId = req.query.mangaId as string;
    const coverFileName = req.query.coverFileName as string;

    try {
        // const art = await getMangaCover(mangaId, coverFileName);
        const art = await getMangaCover(mangaId,coverFileName);
        res.set('Content-Type', art.headers['content-type']);
        console.log(art);
        res.send(art.data);
    } catch (error) {
        console.error("Error fetching cover art:", error);
        res.status(500).json({ error: "Failed to cover art", details: error });
    }
});

export default router;