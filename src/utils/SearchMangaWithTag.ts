import axios from "axios";

export async function SearchMangaWithTag(genreId: string) {
    try {
        const trans = [genreId];
        const baseUrl = 'https://api.mangadex.org';
        const response = await axios({
            method: 'GET',
            url: `${baseUrl}/manga`,
            params: {
                'includedTags': trans
            }
        });
        const result = await response.data;

        // Check if the response contains data
        if (result && result.data && result.data.length > 0) {
            // console.log(result.data);
            return result.data;
        } else {
            console.log("No manga available.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching manga:", error);
        return [];
    }
}