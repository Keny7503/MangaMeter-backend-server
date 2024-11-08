import supabase from '../utils/supabaseClient';

export async function addRating(rating: number, mangaId: string,userId: string, genreId: string) {
    try {
        // Insert into the 'manga' table
        const { error } = await supabase
            .from('manga')
            .insert({ ratingscore: rating, mangaid: mangaId, userid: userId, genreid: genreId });

        if (error) {
            console.error(`Error adding manga with ID ${mangaId}:`, error);
            return { success: false, message: `Failed to add manga: ${error.message}` };
        }

        // Return success response if no error occurred
        return { success: true, message: "Manga added successfully" };

    } catch (error) {
        console.error("Unexpected error during addManga:", error);
        return { success: false, message: "Unexpected error occurred" };
    }
}
