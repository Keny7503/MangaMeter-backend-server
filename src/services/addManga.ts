import supabase from '../utils/supabaseClient';

export async function addManga(id: string, name: string) {
    try {
        const {error } = await supabase
            .from('manga')
            .insert({id: id, name: name});
        if (error) {
            console.error(`Error add manga ${name}`, error);
            return;
        }
    } catch (error) {
        console.error("Error during addManga:", error);
    }
}