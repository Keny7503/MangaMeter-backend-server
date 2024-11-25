import { Router } from 'express';
import { getSuggestion } from '../utils/getSuggestion';

const router = Router();

/**
 * @swagger
 * /manga/suggestion/get:
 *   get:
 *     summary: Get manga suggestions based on a search query
 *     tags:
 *       - Manga
 *     description: Retrieves manga suggestions based on a given query string.
 *     parameters:
 *       - in: query
 *         name: query
 *         required: true
 *         schema:
 *           type: string
 *         description: The query string for searching manga suggestions.
 *     responses:
 *       200:
 *         description: Successfully retrieved manga suggestions.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   type: string
 *                   description: The status of the request. Always "ok" for successful responses.
 *                   example: "ok"
 *                 response:
 *                   type: string
 *                   description: The type of response returned.
 *                   example: "collection"
 *                 data:
 *                   type: array
 *                   description: List of manga suggestions.
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Unique identifier for the manga.
 *                         example: "fed545a0-d8f0-4606-8e21-5d161ec5ce0c"
 *                       type:
 *                         type: string
 *                         description: Type of resource, e.g., "manga".
 *                         example: "manga"
 *                       attributes:
 *                         type: object
 *                         description: Manga-specific attributes.
 *                         properties:
 *                           title:
 *                             type: object
 *                             description: Titles in various languages.
 *                             properties:
 *                               en:
 *                                 type: string
 *                                 description: Title in English.
 *                                 example: "Fate/stay night [Heaven's Feel]"
 *                           altTitles:
 *                             type: array
 *                             description: Alternate titles in different languages.
 *                             items:
 *                               type: object
 *                               additionalProperties:
 *                                 type: string
 *                                 example: "フェイト／ステイナイト ヘブンズフィール"
 *                           description:
 *                             type: object
 *                             description: Descriptions in various languages.
 *                             additionalProperties:
 *                               type: string
 *                               example: "The story takes place in an ordinary Japanese town..."
 *                           isLocked:
 *                             type: boolean
 *                             description: Whether the manga is locked.
 *                             example: false
 *                           links:
 *                             type: object
 *                             description: External links related to the manga.
 *                             additionalProperties:
 *                               type: string
 *                               example: "https://www.amazon.co.jp/gp/product/B0756Y4CRZ"
 *                           originalLanguage:
 *                             type: string
 *                             description: Original language of the manga.
 *                             example: "ja"
 *                           publicationDemographic:
 *                             type: string
 *                             description: Target demographic for the manga.
 *                             example: "seinen"
 *                           status:
 *                             type: string
 *                             description: Publication status of the manga.
 *                             example: "ongoing"
 *                           year:
 *                             type: integer
 *                             description: Year of publication.
 *                             example: 2015
 *                           contentRating:
 *                             type: string
 *                             description: Content rating for the manga.
 *                             example: "suggestive"
 *                           tags:
 *                             type: array
 *                             description: List of tags associated with the manga.
 *                             items:
 *                               type: object
 *                               properties:
 *                                 id:
 *                                   type: string
 *                                   description: Unique identifier for the tag.
 *                                 attributes:
 *                                   type: object
 *                                   description: Details of the tag.
 *                                   properties:
 *                                     name:
 *                                       type: object
 *                                       description: Name of the tag in different languages.
 *                                       properties:
 *                                         en:
 *                                           type: string
 *                                           description: English name of the tag.
 *                                           example: "Action"
 *                           createdAt:
 *                             type: string
 *                             format: date-time
 *                             description: Date and time the manga entry was created.
 *                             example: "2018-11-01T09:20:33+00:00"
 *                           updatedAt:
 *                             type: string
 *                             format: date-time
 *                             description: Date and time the manga entry was last updated.
 *                             example: "2024-10-26T12:55:42+00:00"
 *                 limit:
 *                   type: integer
 *                   description: Number of manga suggestions returned in the response.
 *                   example: 5
 *                 offset:
 *                   type: integer
 *                   description: Offset of the current response set.
 *                   example: 0
 *                 total:
 *                   type: integer
 *                   description: Total number of manga suggestions available.
 *                   example: 1
 *       400:
 *         description: Missing required query parameter.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "query is a required query parameter."
 *       500:
 *         description: Failed to retrieve manga suggestions due to server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Failed to fetch suggestions."
 *                 details:
 *                   type: string
 *                   example: "Detailed error information."
 */


// Define the route to fetch all genres
router.get("/", async (req, res) => {
    const query = req.query.query as string;

    try {
        // const art = await getMangaCover(mangaId, coverFileName);
        const suggestion = await getSuggestion(query);
        res.set('Content-Type', suggestion.headers['content-type']);
        console.log(suggestion);
        res.send(suggestion.data);
    } catch (error) {
        console.error("Error fetching cover art:", error);
        res.status(500).json({ error: "Failed to cover art", details: error });
    }
});

export default router;