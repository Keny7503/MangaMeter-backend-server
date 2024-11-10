import supabase from "../utils/supabaseClient";

export async function getRatingFromMangaUser(mangaId: string, userId: string) {
    try {
      // Query the "rating" table to get the rating based on mangaId, genreId, and userId
      const { data, error } = await supabase
        .from('rating')
        .select('genreid, ratingscore')
        .eq('mangaid', mangaId)
        .eq('userid', userId) 
  
      if (error) {
        throw error;
      }
  
      // Return the rating value if found, otherwise return null
      return data || [];
    } catch (error) {
      console.error('Error fetching rating:', error);
      throw error; // Optionally rethrow the error for higher-level handling
  }
}