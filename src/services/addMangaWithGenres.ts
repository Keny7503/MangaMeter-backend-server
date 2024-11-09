import { addManga } from './addManga';
import { getTheGenreId } from '../utils/getTheGenreId';
import { addMangaGenreId } from './addMangaGenreId';

export async function addMangaWithGenres(mangaName: string, mangaId: string, genreList: string[]) {
    // Validate input parameters
    if (!mangaName || !mangaId || !Array.isArray(genreList)) {
        throw new Error("mangaName, mangaId, and genre (as an array) are required parameters");
    }

    try {
        // Add the manga to the database
        await addManga(mangaId, mangaName);

        // Fetch genre IDs based on the genre names
        const genreData = await getTheGenreId(genreList);

        // Check if genreData contains results
        if (!genreData || genreData.length === 0) {
            throw new Error("Genres not found");
        }

        // Add manga with each genre ID
        const promises = genreData.map(async (genre) => {
            return await addMangaGenreId(mangaId, genre.id);
        });

        // Resolve all promises to add manga with each genre ID
        const addedGenres = await Promise.all(promises);

        // Return success response
        const result = {
            status: 200,
            json: {
                mangaName,
                mangaId,
                genreList,
                addedGenres,
            }
        };
        // console.log(result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Failed to add manga with genres");
    }
}
