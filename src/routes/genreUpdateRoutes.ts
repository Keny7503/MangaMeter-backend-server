import supabase from '../utils/supabaseClient';
import { updateGenres } from '../services/genreUpdate';
import { Router } from 'express';

const router = Router();

// Define the route to fetch all genres and insert them into the Supabase database
router.post("/", async (req, res) => {
    try {
        const genres = await updateGenres();
        
        // Ensure genres is an array
        if (!genres || genres.length === 0) {
            console.warn("No genres to insert.");
            res.status(200).json([]); // Respond with an empty array if no genres
            return;
        }

        res.status(200).json(genres);

        const insertions = genres.map(async (element) => {
            const { error } = await supabase
                .from('Genre')
                .insert({ id: element.id, name: element.name });
            
            if (error) {
                console.error(`Failed to insert genre with id ${element.id}:`, error);
            }
            else{
                console.log("import genre ",element.name," with id ",element.id);
            }
        });

        await Promise.all(insertions);
    } catch (error) {
        console.error("Error fetching genres:", error);
        res.status(500).json({ error: "Failed to fetch genres", details: error });
    }
});


export default router;
