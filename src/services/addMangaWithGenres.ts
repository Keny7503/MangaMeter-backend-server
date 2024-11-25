import { addManga } from './addManga';
import { addMangaGenreId } from './addMangaGenreId';
import { getMangaGenre } from './getMangaGenre';

export async function addMangaWithGenres(mangaId: string) {
    // Validate input parameters
    if (!mangaId) {
        throw new Error("mangaId is required parameters");
    }

    try {
        const mangaDetail = await getMangaGenre(mangaId);

        // Check if result or result.mangaDetails is undefined
        if (!mangaDetail || !mangaDetail.mangaDetails) {
            return;
        } 
        // Destructure from result.mangaDetails
        const { mangaId: detailMangaId, mangaName, genreTags } = mangaDetail.mangaDetails;

        // Add the manga to the database
        await addManga(detailMangaId, mangaName);

        // Add manga with each genre ID
        const promises = genreTags.map(async (genre) => {
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
                genreTags,
            }
        };
        // console.log(result);
        return result;
    } catch (error) {
        console.error("Error:", error);
        throw new Error("Failed to add manga with genres");
    }
}
