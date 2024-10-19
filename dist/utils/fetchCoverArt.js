"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchCoverArt = fetchCoverArt;
async function fetchCoverArt(coverArtIds) {
    try {
        // Construct the URL with all cover art IDs
        const url = `https://api.mangadex.org/cover?${coverArtIds.map(id => `ids%5B%5D=${id}`).join('&')}`;
        const response = await fetch(url);
        const result = await response.json();
        // Check if the response contains data
        if (result && result.data && result.data.length > 0) {
            // console.log(result.data);
            return result.data;
        }
        else {
            console.log("No cover art data available.");
            return [];
        }
    }
    catch (error) {
        console.error("Error fetching cover art:", error);
        return [];
    }
}
