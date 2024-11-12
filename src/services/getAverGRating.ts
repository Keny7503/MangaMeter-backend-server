import supabase from '../utils/supabaseClient';
import { SearchMangaByIds } from './SearchMangaByIds';

export async function getAverGRating(genreId: string, sortDescending: boolean, limit: number, page: number) {
    try {
        const { data, error } = await supabase
            .rpc('get_manga_ratings_by_genre', {
                input_genre_id: genreId,
                sort_desc: sortDescending,
                limit_rows: limit,
                offset_row: (page-1)*limit
            });

        if (error) {
            console.error("Error fetching rating genres:", error);
            return {
                status: 500,
                json: { error: "Error fetching rating genres" }
            };
        }

        console.log("Fetched rating genres:", data);

        const mangaIds = data.map((element: { manga_id: any }) => String(element.manga_id));     

        console.log(mangaIds);

        const fetch = await SearchMangaByIds(mangaIds);
        // console.log("Fetched manga:", fetch);
        // Type check to ensure fetch has the expected structure
        if (!fetch || typeof fetch !== 'object' || !('data' in fetch) || !Array.isArray(fetch.data)) {
            console.error("Unexpected fetch result:", fetch);
            return {
                status: 500,
                json: { error: "Failed to retrieve manga data" }
            };
        }
        // const fetch1 = fetch.data;
        // console.log("Fetched manga:", fetch1);
        // console.log("Fetched manga:", fetch1.length);
        // Create a mapping of manga_id to average_rating for easy access
        const ratingMap = data.reduce((map: { [x: string]: any; }, item: { manga_id: string | number; average_rating: any; }) => {
            map[item.manga_id] = item.average_rating;
            return map;
        }, {});
        console.log("Fetched ratingMap:", ratingMap);
        // Filter the manga list and add the average rating
        const filteredMangaList = fetch.data
            // .filter((manga: { mangaId: any; }) => ratingMap.hasOwnProperty(manga.mangaId))
            .map((manga: { mangaId: string | number; }) => ({
                ...manga,
                average_rating: ratingMap[manga.mangaId] || null
            }));
        console.log("Fetched filteredMangaList:", filteredMangaList);
        return {
            status: 200,
            json: { data: {
                filteredMangaList,
                total: fetch.data.length
            } }
        };
    } catch (error) {
        console.error("Error during getAverGRating:", error);
        return {
            status: 500,
            json: { error: "Unexpected error during getAverGRating" }
        };
    }
}
