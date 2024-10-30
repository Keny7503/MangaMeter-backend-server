import { tagUpdate } from '../utils/tagUpdate';

export async function updateGenres() {
    try {
        const data = await tagUpdate();
        const genres: { id: any; name: any }[] = [];
        var countG=0;
        // Log the data to verify its structure
        console.log("Fetched data:", data);

        // Check if data is an array
        if (Array.isArray(data)) {
            data.forEach((element: { attributes: any; id: any }) => {
                if (element.attributes.group === 'genre' && element.attributes?.name?.en) {
                    countG++;
                    const genre = { id: element.id, name: element.attributes.name.en };
                    genres.push(genre);
                }
            });
        } else {
            console.warn("Expected 'data' to be an array, but got:", typeof data);
        }

        // Print the filtered genres to the console
        // console.log("updateGenres:", genres);
        // console.log("count: ",countG);

        // Optionally return genres for further use
        return genres;
    } catch (error) {
        console.error("Error during updateGenres:", error);
    }
}