import axios from 'axios';
import { filterMangaDetails } from "../utils/searchEntryFilter";
import { fetchCoverArt } from "../utils/fetchCoverArt";
import { SearchMangaWithIds } from "../utils/SearchMangaWithIds";
import { getUserFavorite } from "../utils/getUserFavorite";
import { getFavoriteCountByUser } from "./getFavoriteCount";

export async function SearchFavoriteManga(userId: string, limit: number, page: number) {
    try {
        const count = await getFavoriteCountByUser(userId);
        if(count === 0){
            return null;
        }
        const favorite = await getUserFavorite(userId, limit, page);

        // Ensure the getUserFavorite call succeeded and data is defined
        if (!favorite.success || !favorite.data) {
            console.error("Error fetching favorite manga:", favorite.message);
            return { data: [], total: 0, success: false, message: favorite.message || "Failed to retrieve favorites." };
        }

        const mangaIds = favorite.data.map((element: { mangaid: any }) => String(element.mangaid));
        const result = await SearchMangaWithIds(mangaIds);

        if (!result || result.length === 0) {
            console.log("No manga data available.");
            return { data: [], total: 0, success: true };
        }

        const mangaDetailsArray: { mangaId: string; mangaName: string; genreTags: { id: string; name: string }[]; coverArtId?: string; coverFileName?: string }[] = [];
        const coverArtIds: string[] = [];

        result.forEach((manga: any) => {
            const details = filterMangaDetails(manga);
            mangaDetailsArray.push(details);

            if (details.coverArtId) {
                coverArtIds.push(details.coverArtId);
            }
        });

        const coverArtData = await fetchCoverArt(coverArtIds);

        mangaDetailsArray.forEach(manga => {
            const coverArt = coverArtData.find((art: any) => art.id === manga.coverArtId);
            if (coverArt) {
                manga.coverFileName = coverArt.attributes.fileName;
            }
        });

        return {
            data: mangaDetailsArray,
            total: count,
            success: true
        };

    } catch (error) {
        console.error("Error fetching manga:", error);
        return { data: [], total: 0, success: false, message: "Unexpected error occurred" };
    }
}
