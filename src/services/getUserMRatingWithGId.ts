import supabase from '../utils/supabaseClient';

export async function getUserMRatingWithGId(genreId: string, userId: string) {
    try {
        let data, error;

        if (genreId === "all") {
            ({ data, error } = await supabase
                .from('rating')
                .select('ratingscore, votetime')
                .eq('userid', userId)
            );
        } else {
            ({ data, error } = await supabase
                .from('rating')
                .select('ratingscore, votetime')
                .eq('genreid', genreId)
                .eq('userid', userId)
            );
        }

        if (error) {
            console.error("Error fetching ratings:", error);
            return {
                status: 500,
                json: { error: "Error fetching ratings" }
            };
        }

        console.log("Fetched ratings:", data);

        return {
            status: 200,
            json: { data }
        };
    } catch (error) {
        console.error("Unexpected error during getUserMRatingWithGId:", error);
        return {
            status: 500,
            json: { error: "Unexpected error during getUserMRatingWithGId" }
        };
    }
}
