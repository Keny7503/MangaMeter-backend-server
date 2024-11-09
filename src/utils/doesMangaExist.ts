import supabase from '../utils/supabaseClient';

export async function doesMangaExist(mangaId: string): Promise<boolean> {
    const { data, error } = await supabase
        .from('manga')
        .select('id')
        .eq('id', mangaId)
        .single();  // Retrieves only a single row
    console.log(data)
    if (error) {
        console.error("Error checking manga existence:", error);
        return false;  // Return false if there's an error in the query
    }

    return data !== null;  // If data is not null, the row exists
}
