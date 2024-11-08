import supabase from '../utils/supabaseClient';

export async function addMangaGenreId(mid: string, gid: string) {
    try {
        const {error } = await supabase
            .from('mangagenres')
            .insert({mangaid: mid, genreid: gid});
        if (error) {
            console.error(`Error add manga ${mid} - ${gid}`, error);
            return;
        }
    } catch (error) {
        console.error("Error during addManga:", error);
    }
}