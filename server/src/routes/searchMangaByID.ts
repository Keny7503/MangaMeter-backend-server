import { Router } from "express";
const axios = require('axios');

const router = Router();

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(400).json({ error: "Please provide an id to search for." });
        return;
    }

    try {
        console.log(`Fetching data for Manga ID: ${id}`);
        const baseUrl = 'https://api.mangadex.org';
        const response = await axios.get(`${baseUrl}/manga/${id}`);
        
        // Return only the data part of the response
        res.json({ results: response.data });
    } catch (error) {
        console.error('Error:', error.message);

        // Log the response object if present for debugging
        if (error.response) {
            console.error('Error details:', error.response.data);
        }

        res.status(500).json({
            error: "Error fetching data from MangaDex API",
            details: error.response?.data || "No further details."
        });
    }
});

export default router;
