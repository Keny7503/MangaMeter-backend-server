import supabase from '../utils/supabaseClient';

export async function getAverGRating(genreId: string, sortDescending: boolean) {
    try {
        const { data, error } = await supabase
        .rpc('get_manga_ratings_by_genre', {
          input_genre_id: genreId,
          sort_desc: sortDescending
        });

        if (error) {
            console.error("Error fetching rating genres:", error);
            return {
                status: 500,
                json: { error: "Error fetching rating genres" }
            };
        }

        // Print the fetched data to the console
        console.log("Fetched rating genres:", data);

        // Optionally return data for use in the API (you can omit this for testing purposes)
        return {
            status: 200,
            json: { data }
        };
    } catch (error) {
        console.error("Error during getAverGRating:", error);
        return {
            status: 500,
            json: { error: "Unexpected error during getAverGRating" }
        };
    }
}
