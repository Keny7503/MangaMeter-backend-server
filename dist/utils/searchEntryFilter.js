"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMangaDetails = filterMangaDetails;
function filterMangaDetails(manga) {
    // Extract Manga ID
    const mangaId = manga.id;
    // Extract Manga Name (English title)
    const mangaName = manga.attributes.title.en;
    // Extract list of genre tags
    const genreTags = manga.attributes.tags
        .filter(tag => tag.attributes.group === "genre")
        .map(tag => tag.attributes.name.en);
    // Extract ID of the "cover_art" relationship
    const coverArtId = manga.relationships.find(rel => rel.type === "cover_art")?.id;
    // Return the extracted details as an object
    return {
        mangaId,
        mangaName,
        genreTags,
        coverArtId,
    };
}
// Example usage
// const mangaData: Manga = {
//     // ... (your input data here, following the same structure)
// };
// extractMangaDetails(mangaData);
