import supabase from '../utils/supabaseClient';

export async function getTheGenreId(genreList: string[]) {
    try {
        const { data, error } = await supabase
            .from('genre')
            .select('id')
            .in('name', genreList);

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
