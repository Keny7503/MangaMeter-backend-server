import supabase from "../utils/supabaseClient";

export async function getOneRating(mangaId: string, genreId: string, userId: string) {
    try {
      // Query the "rating" table to get the rating based on mangaId, genreId, and userId
      const { data, error } = await supabase
        .from('rating')
        .select('ratingscore')
        .eq('mangaid', mangaId)
        .eq('genreid', genreId)
        .eq('userid', userId)
        .single(); // Use .single() to get a single result
  
      if (error) {
        throw error;
      }
  
      // Return the rating value if found, otherwise return null
      return data ? data.ratingscore : null;
    } catch (error) {
      console.error('Error fetching rating:', error);
      throw error; // Optionally rethrow the error for higher-level handling
  }
}