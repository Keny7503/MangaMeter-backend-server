import supabase from '../utils/supabaseClient';

export async function getUserMRatingWithGId(genreId: string, userId: string) {
    try {
        const { data, error } = await supabase
            .from('rating')
            .select('ratingscore, votetime')
            .eq('genreid', genreId)
            .eq('userid', userId);

        if (error) {
            console.error("Error fetching mangas:", error);
            return {
                status: 500,
                json: { error: "Error fetching mangas" }
            };
        }

        // Print the fetched data to the console
        console.log("Fetched mangas:", data);

        // Return the data in the expected response format
        return {
            status: 200,
            json: { data }
        };
    } catch (error) {
        console.error("Error during getMIdWithGId:", error);
        return {
            status: 500,
            json: { error: "Unexpected error during getMIdWithGId" }
        };
    }
}
