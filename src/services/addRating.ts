import supabase from '../utils/supabaseClient';

export async function addRating(rating: number, mangaId: string,userId: string, genreId: string) {
    try {
        // Insert into the 'manga' table
        const { error } = await supabase
            .from('rating')
            .insert({ ratingscore: rating, mangaid: mangaId, userid: userId, genreid: genreId });

        if (error) {
            console.error(`Error adding rating with genre ID ${genreId}:`, error);
            return { success: false, message: `Failed to add rating: ${error.message}` };
        }

        // Return success response if no error occurred
        return { success: true, message: "rating added successfully" };

    } catch (error) {
        console.error("Unexpected error during addRating:", error);
        return { success: false, message: "Unexpected error occurred" };
    }
}
