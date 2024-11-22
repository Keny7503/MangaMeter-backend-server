import { Router } from 'express';
import { getSuggestion } from '../utils/getSuggestion';

const router = Router();

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