import { Router } from "express";
const axios = require('axios');

const router = Router();

// Define the route for manga search
router.get("/", async (req, res) => {
    const title = req.query.title as string;

    if (!title) {
        res.status(400).json({ error: "Please provide a title to search for." });
        return;
    }

    try {
        const baseUrl = 'https://api.mangadex.org';
        const response = await axios({
            method: 'GET',
            url: `${baseUrl}/manga`,
            params: { title }
        });

        // Extract Manga IDs from the response
        const mangaIds = response.data.data.map((manga: any) => manga.id);

        res.json({ results: mangaIds });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error fetching data from MangaDex API", details: error });
    }
});

export default router;
