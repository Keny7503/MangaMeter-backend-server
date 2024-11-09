import { tagUpdate } from '../utils/tagUpdate';
import supabase from '../utils/supabaseClient';

export async function updateGenres() {
    try {
        const data = await tagUpdate();
        const genres: { id: any; name: any }[] = [];
        let countG = 0;

        // Check if data is an array
        if (Array.isArray(data)) {
            data.forEach((element: { attributes: any; id: any }) => {
                if (element.attributes.group === 'genre' && element.attributes?.name?.en) {
                    countG++;
                    const genre = { id: element.id, name: element.attributes.name.en };
                    genres.push(genre);
                }
            });
        } else {
            console.warn("Expected 'data' to be an array, but got:", typeof data);
        }

        // Map through genres and attempt to insert each one
        const insertions = genres.map(async (element) => {
            try {
                const { error } = await supabase
                    .from('genre')
                    .insert({ id: element.id, name: element.name });
                
                if (error) {
                    console.error(`Failed to insert genre ${element.name} with id ${element.id}.`, error);
                } else {
                    console.log(`Successfully imported genre ${element.name} with id ${element.id}`);
                }
            } catch (err) {
                console.error(`Unexpected error inserting genre ${element.name} with id ${element.id}:`, err);
            }
        });

        // Await completion of all insertions
        await Promise.all(insertions);

        return genres;
    } catch (error) {
        console.error("Error during updateGenres:", error);
    }
}
