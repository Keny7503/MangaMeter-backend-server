import supabase from '../utils/supabaseClient';

export async function getUserFavorite(userId: string, limit: number, page: number) {
    try {
        const { data, error } = await supabase
            .from('favoritelist')
            .select('mangaid')
            .eq('userid', userId)
            .range((page - 1) * limit, page * limit - 1);  // Fixing the range here
        if (error) {
            console.error(`Error get favorite manga (user ${userId})`, error);
            return { success: false, message: `Failed to get favorite: ${error.message}` };
        }

        return { success: true, data };
    } catch (error) {
        console.error("Error during getUserFavorite:", error);
        return { success: false, message: "Unexpected error occurred" };
    }
}
