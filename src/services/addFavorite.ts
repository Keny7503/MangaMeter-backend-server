import supabase from '../utils/supabaseClient';

export async function addFavorite(mangaId: string, userId: string) {
    try {
        const {error } = await supabase
            .from('favoritelist')
            .insert({mangaid: mangaId, userid: userId});
        if (error) {
            console.error(`Error add favorite ${mangaId} (user: ${userId})`, error);
            return { success: false, message: `Failed to add favorite: ${error.message}` };
        }

        return { success: true, message: "favorite added successfully" };
    } catch (error) {
        console.error("Error during addFavorite:", error);
        return { success: false, message: "Unexpected error occurred" };
    }
}