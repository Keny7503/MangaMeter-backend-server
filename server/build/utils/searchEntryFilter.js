"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.filterMangaDetails = filterMangaDetails;
function filterMangaDetails(manga) {
    var _a;
    // Extract Manga ID
    var mangaId = manga.id;
    // Extract Manga Name (English title)
    var mangaName = manga.attributes.title.en;
    // Extract list of genre tags
    var genreTags = manga.attributes.tags
        .filter(function (tag) { return tag.attributes.group === "genre"; })
        .map(function (tag) { return tag.attributes.name.en; });
    // Extract ID of the "cover_art" relationship
    var coverArtId = (_a = manga.relationships.find(function (rel) { return rel.type === "cover_art"; })) === null || _a === void 0 ? void 0 : _a.id;
    // Return the extracted details as an object
    return {
        mangaId: mangaId,
        mangaName: mangaName,
        genreTags: genreTags,
        coverArtId: coverArtId,
    };
}
// Example usage
// const mangaData: Manga = {
//     // ... (your input data here, following the same structure)
// };
// extractMangaDetails(mangaData);
//# sourceMappingURL=searchEntryFilter.js.map