import { Router } from "express";
import { searchMangaList } from "../services/searchMangaList";

const router = Router();

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
