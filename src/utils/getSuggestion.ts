import axios from "axios";

export async function getSuggestion(query:string) {
    const url = `https://api.mangadex.org/manga?limit=5&title=${query}&includedTagsMode=AND&excludedTagsMode=OR&contentRating%5B%5D=safe&contentRating%5B%5D=suggestive&contentRating%5B%5D=erotica&order%5BlatestUploadedChapter%5D=desc`;
    
    try {

        const response = await axios.get(url);

        console.log('Cover fetched successfully:', response);
        return response;
    } catch (error) {
        console.error('Error fetching manga cover:', error);
        throw error;
    }
}