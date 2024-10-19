interface Manga {
    id: string;
    type: string;
    attributes: {
        title: { en: string };
        tags: {
            id: string;
            type: string;
            attributes: {
                name: { en: string };
                group: string;
            };
        }[];
    };
    relationships: {
        id: string;
        type: string;
    }[];
}

export function filterMangaDetails(manga: Manga) {
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