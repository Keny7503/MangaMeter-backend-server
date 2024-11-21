import supabase from '../utils/supabaseClient';

export async function deleteFavoriteManga(mangaId: string, userId: string) {
    try {
        // Perform the deletion
        const { data, error } = await supabase
            .from('favoritelist')
            .delete()
            .eq('mangaid', mangaId)
            .eq('userid', userId)
        if (error) {
            // Improved error logging
            console.error("Error deleting favorite manga:", error.message);
            return;
        }

        // Ensure the data returned after deletion
        // if (data.length === 0) {
        //     console.log("No record found for deletion");
        // } else {
        //     console.log("Successfully deleted favorite manga:", data);
        // }

        // Return the data if necessary for further handling
        return true;
    } catch (error) {
        // More specific error message handling
        console.error("Error during deleteFavoriteManga operation:", error instanceof Error ? error.message : error);
    }
}
