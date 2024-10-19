"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchMangaList = searchMangaList;
const axios = require('axios');
const searchEntryFilter_1 = require("../utils/searchEntryFilter");
const fetchCoverArt_1 = require("../utils/fetchCoverArt");
async function searchRawMangas(params) {
    const { limit, page, searchString, order } = params;
    // Calculate the offset based on limit and page
    const offset = limit * (page - 1);
    // Construct the URL with dynamic parameters
    const url = `https://api.mangadex.org/manga?limit=${limit}&offset=${offset}&title=${encodeURIComponent(searchString)}&includedTagsMode=AND&excludedTagsMode=OR&contentRating[]=safe&contentRating[]=suggestive&contentRating[]=erotica&order[latestUploadedChapter]=${order}`;
    try {
        const response = await axios.get(url);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching manga:', error);
        throw error;
    }
}
async function searchMangaList(params) {
    try {
        // Call the searchManga function with the specified parameters
        const result = await searchRawMangas(params);
        // Check if the response contains data
        if (result && result.data && result.data.length > 0) {
            // Array to store manga details
            const mangaDetailsArray = [];
            // Collect cover art IDs
            const coverArtIds = [];
            // Iterate over each manga in the data array
            result.data.forEach((manga) => {
                // Extract manga details
                const details = (0, searchEntryFilter_1.filterMangaDetails)(manga);
                mangaDetailsArray.push(details);
                // Collect cover art IDs
                if (details.coverArtId) {
                    coverArtIds.push(details.coverArtId);
                }
            });
            // Fetch cover art information using the collected IDs
            const coverArtData = await (0, fetchCoverArt_1.fetchCoverArt)(coverArtIds);
            // Map cover art filenames to the manga details
            mangaDetailsArray.forEach(manga => {
                const coverArt = coverArtData.find((art) => art.id === manga.coverArtId);
                if (coverArt) {
                    manga.coverFileName = coverArt.attributes.fileName;
                }
            });
            // Log the array of manga details with cover file names
            console.log(mangaDetailsArray);
            return mangaDetailsArray;
        }
        else {
            console.log("No manga data available.");
            return [];
        }
    }
    catch (error) {
        console.error("Error fetching manga:", error);
        return [];
    }
}
searchMangaList({ limit: 2, page: 1, searchString: 'gate', order: 'desc' });
