import { Router } from 'express';
import { getMangaCover } from '../utils/getCoverArt';

const router = Router();

// Define the route to fetch all genres
router.get("/", async (req, res) => {
    const coverArtId = req.query.coverArtId as string;
    const coverFileName = req.query.coverFileName as string;

    try {
        // const art = await getMangaCover(mangaId, coverFileName);
        const art = await getMangaCover(coverArtId,coverFileName);
        res.set('Content-Type', art.headers['content-type']);
        console.log(art);
        res.send(art.data);
    } catch (error) {
        console.error("Error fetching cover art:", error);
        res.status(500).json({ error: "Failed to cover art", details: error });
    }
});

export default router;