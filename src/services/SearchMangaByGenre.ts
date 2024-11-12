const axios = require('axios');
import { filterMangaDetails } from "../utils/searchEntryFilter";
import { fetchCoverArt } from "../utils/fetchCoverArt";
import { SearchMangaWithTag } from "../utils/SearchMangaWithTag";

export async function SearchMangaByGenre(genreId: string) {
    try {
        // Call the searchManga function with the specified parameters
        const result = await SearchMangaWithTag(genreId);
        // Extract total from result
        const total = result.length;

        // Check if the response contains data
        if (result && result.length > 0) {
            // Array to store manga details
            const mangaDetailsArray: { mangaId: string; mangaName: string; genreTags: { id: string; name: string }[]; coverArtId?: string; coverFileName?: string }[] = [];
            // Collect cover art IDs
            const coverArtIds: string[] = [];
            // Iterate over each manga in the data array
            result.forEach((manga: any) => {
                // Extract manga details
                const details = filterMangaDetails(manga);
                mangaDetailsArray.push(details);

                // Collect cover art IDs
                if (details.coverArtId) {details
                    coverArtIds.push(details.coverArtId);
                }
            });
            // Fetch cover art information using the collected IDs
            const coverArtData = await fetchCoverArt(coverArtIds);
            // Map cover art filenames to the manga details
            mangaDetailsArray.forEach(manga => {
                const coverArt = coverArtData.find((art: any) => art.id === manga.coverArtId);
                if (coverArt) {
                    manga.coverFileName = coverArt.attributes.fileName;
                }
            });
            // Log the array of manga details with cover file names
            // console.log(mangaDetailsArray);
            return {
                data: mangaDetailsArray,
                total: total, // Add the total property here
                success: true, // Optional: indicate the success of the request
            } ;
        } else {
            console.log("No manga data available.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching manga:", error);
        return [];
    }
}
