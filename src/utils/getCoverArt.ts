import axios from "axios";

export async function getMangaCover(mangaId:string, coverFileName:string) {
    const url = `https://uploads.mangadex.org/covers/${mangaId}/${coverFileName}`;
    
    try {

        const response = await axios.get(url, { responseType: 'arraybuffer' });

        console.log('Cover fetched successfully:', response);
        return response;
    } catch (error) {
        console.error('Error fetching manga cover:', error);
        throw error;
    }
}