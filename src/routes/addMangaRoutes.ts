import { Router} from 'express';
import { addManga } from '../services/addManga';
import { getTheGenreId } from '../utils/getTheGenreId';
import { addMangaGenreId } from '../services/addMangaGenreId';

const router = Router();

// Define a route that uses query parameters for mangaName, mangaId, and genre
router.get("/", async (req, res) => {
    const mangaName = req.query.mangaName as string;
    const mangaId = req.query.mangaId as string;
    const genreList = req.query.genre as string[];

    // Validate query parameters
    if (!mangaName || !mangaId || !Array.isArray(genreList)) {
        res.status(400).json({ error: "mangaName, mangaId, and genre (as an array) are required query parameters" });
        return;
    }

    try {
        addManga(mangaId,mangaName);

        // Fetch genre IDs based on the genre names
        const genreData = await getTheGenreId(genreList);
        
        // Check if genreData contains results
        if (!genreData || genreData.length === 0) {
            res.status(404).json({ error: "Genres not found" });
            return;
        }

        // Add manga with each genre ID
        const promises = genreData.map(async (genre) => {
            return await addMangaGenreId(mangaId, genre.id);
        });

        // Resolve all promises to add manga with each genre ID
        const results = await Promise.all(promises);

        res.status(200).json({ mangaName, mangaId, addedGenres: results });
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Failed to add manga with genres", details: error });
    }
});

export default router;
