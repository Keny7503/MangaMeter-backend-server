import supabase from '../utils/supabaseClient';

export async function getAverMRating(mangaId: string) {
    try {
        const { data, error } = await supabase
        .rpc('get_average_rating_by_manga', {
          input_manga_id: mangaId
        });

        if (error) {
            console.error("Error fetching rating manga:", error);
            return {
                status: 500,
                json: { error: "Error fetching rating manga" }
            };
        }

        // Print the fetched data to the console
        console.log("Fetched rating manga:", data);

        // Optionally return data for use in the API (you can omit this for testing purposes)
        return {
            status: 200,
            json: { data }
        };
    } catch (error) {
        console.error("Error during getAverMRating:", error);
        return {
            status: 500,
            json: { error: "Unexpected error during getAverMRating" }
        };
    }
}
