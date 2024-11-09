const axios = require('axios');
import { filterMangaDetails } from "../utils/searchEntryFilter";




async function searchRawMangas(mangaId:string) {
    // Construct the URL with dynamic parameters
    const url = `https://api.mangadex.org/manga/${mangaId}`;
    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Error fetching manga:', error);
        throw error;
    }
}
// searchRawMangas("b41bef1e-7df9-4255-bd82-ecf570fec566")
export async function getMangaGenre(mangaId:string) {
    try {
        // Call the searchManga function with the specified parameters
        const result = await searchRawMangas(mangaId);

        // Check if the response contains data
        if (result && result.data) {
            // Array to store manga details
            let mangaDetails: { mangaId: string; mangaName: string; genreTags: { id: string; name: string }[]};
            // Extract manga details
            mangaDetails= filterMangaDetails(result.data);

            // Log the array of manga details with cover file names
            console.log(mangaDetails);
            return {mangaDetails
            } ;
        } else {
            console.log("No manga data available.");
            return ;
        }
    } catch (error) {
        console.error("Error fetching manga:", error);
        return;
    }
}
// getMangaGenre("b41bef1e-7df9-4255-bd82-ecf570fec566")