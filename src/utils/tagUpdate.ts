export async function tagUpdate() {
    try {
        // Construct the URL with all cover art IDs
        const url = `https://api.mangadex.org/manga/tag`;
        const response = await fetch(url);
        const result = await response.json();

        // Check if the response contains data
        if (result && result.data && result.data.length > 0) {
            // console.log(result.data);
            return result.data;
        } else {
            console.log("No tags data available.");
            return [];
        }
    } catch (error) {
        console.error("Error fetching tags:", error);
        return [];
    }
}