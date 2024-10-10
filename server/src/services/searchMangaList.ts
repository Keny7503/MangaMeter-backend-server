const axios = require('axios');
import { filterMangaDetails } from "../utils/searchEntryFilter";
import { fetchCoverArt } from "../utils/fetchCoverArt";

interface MangaSearchParams {
    limit: number;
    page: number;
    searchString: string;
    order: 'asc' | 'desc';
}


async function searchRawManga(params: MangaSearchParams) {
    const { limit, page, searchString, order } = params;
    
    // Calculate the offset based on limit and page
    const offset = limit * (page - 1);

    // Construct the URL with dynamic parameters
    const url = `https://api.mangadex.org/manga?limit=${limit}&offset=${offset}&title=${encodeURIComponent(searchString)}&includedTagsMode=AND&excludedTagsMode=OR&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[latestUploadedChapter]=${order}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching manga:', error);
        throw error;
    }
}

export async function searchMangaList(params: MangaSearchParams) {
    try {
        // Call the searchManga function with the specified parameters
        const result = await searchRawManga(params);

        // Check if the response contains data
        if (result && result.data && result.data.length > 0) {
            // Array to store manga details
            const mangaDetailsArray: { mangaId: string; mangaName: string; genreTags: string[]; coverArtId?: string; coverFileName?: string }[] = [];

            // Collect cover art IDs
            const coverArtIds: string[] = [];

            // Iterate over each manga in the data array
            result.data.forEach((manga: any) => {
                // Extract manga details
                const details = filterMangaDetails(manga);
                mangaDetailsArray.push(details);

                // Collect cover art IDs
                if (details.coverArtId) {
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
            console.log(mangaDetailsArray);
            return mangaDetailsArray;
        } else {
            console.log("No manga data available.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching manga:", error);
        return [];
    }
}

