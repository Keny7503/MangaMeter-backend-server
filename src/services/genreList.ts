import supabase from '../utils/supabaseClient';

export async function fetchGenres() {
    try {
        const { data, error } = await supabase
            .from('genre')
            .select();

        if (error) {
            console.error("Error fetching genres:", error);
            return;
        }

        // Print the fetched data to the console
        console.log("Fetched genres:", data);

        // Optionally return data for use in the API (you can omit this for testing purposes)
        return data;
    } catch (error) {
        console.error("Error during fetchGenres:", error);
    }
}
