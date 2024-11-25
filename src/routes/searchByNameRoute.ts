import { Router } from "express";
import { searchMangaList } from "../services/searchMangaList";

const router = Router();
/**
 * @swagger
 * /manga/get:
 *   get:
 *     summary: Search for manga by title
 *     tags:
 *       - Manga
 *     description: Retrieves manga data based on a search title, with optional pagination and sorting.
 *     parameters:
 *       - in: query
 *         name: title
 *         required: true
 *         schema:
 *           type: string
 *         description: The title of the manga to search for.
 *       - in: query
 *         name: limit
 *         required: false
 *         schema:
 *           type: integer
 *           default: 5
 *         description: The number of manga results to return per page (default is 5).
 *       - in: query
 *         name: page
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *         description: The page number to retrieve (default is 1).
 *       - in: query
 *         name: order
 *         required: false
 *         schema:
 *           type: string
 *           enum: [asc, desc]
 *           default: desc
 *         description: The order to sort results by. Can be 'asc' or 'desc' (default is 'desc').
 *     responses:
 *       200:
 *         description: Successfully retrieved manga list based on search title.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       mangaId:
 *                         type: string
 *                         description: Unique identifier for the manga.
 *                         example: "8495d45a-dbba-48be-8691-7d2a067e3f42"
 *                       mangaName:
 *                         type: string
 *                         description: The name of the manga.
 *                         example: "Gate - Teikoku no Bara Kishidan - Pinya Co Lada 14-sai"
 *                       genreTags:
 *                         type: array
 *                         description: List of genres associated with the manga.
 *                         items:
 *                           type: object
 *                           properties:
 *                             id:
 *                               type: string
 *                               description: Unique identifier for the genre.
 *                               example: "4d32cc48-9f00-4cca-9b5a-a839f0764984"
 *                             name:
 *                               type: string
 *                               description: The name of the genre.
 *                               example: "Comedy"
 *                       coverArtId:
 *                         type: string
 *                         description: Unique identifier for the cover art.
 *                         example: "270c4bd0-70e8-4fd9-bdde-50b78bb04733"
 *                       coverFileName:
 *                         type: string
 *                         description: File name of the manga cover image.
 *                         example: "f730b714-cf1e-4f11-ae97-2ca6629dd222.jpg"
 *                 total:
 *                   type: integer
 *                   description: Total number of manga items available.
 *                   example: 1
 *                 success:
 *                   type: boolean
 *                   description: Indicates if the request was successful.
 *       400:
 *         description: Missing title query parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Please provide a title to search for."
 *       500:
 *         description: Server error while fetching manga data.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Error fetching data from MangaDex API."
 *                 details:
 *                   type: string
 *                   example: "Detailed error message."
 */

// Define the route for manga search
router.get("/", async (req, res) => {
    const title = req.query.title as string;
    const limit = parseInt(req.query.limit as string) || 5; // Default to 5 if not provided
    const page = parseInt(req.query.page as string) || 1; // Default to 1 if not provided
    const order = (req.query.order as 'asc' | 'desc') || 'desc'; // Default to 'desc' if not provided

    // Check if the title is provided
    if (!title) {
        res.status(400).json({ error: "Please provide a title to search for." });
        return;
    }

    try {
        // Fetch manga data based on query parameters
        const mangaData = await searchMangaList({ limit, page, searchString: title, order });

        // Return the manga data as a JSON response
        res.status(200).json(mangaData);
    } catch (error) {
        console.error("Error fetching manga:", error);
        res.status(500).json({ error: "Error fetching data from MangaDex API", details: error });
    }
});

export default router;
