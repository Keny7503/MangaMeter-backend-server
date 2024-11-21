import supabase from '../utils/supabaseClient';

export async function getRatingCountByGenre(genreId: string) {
    try {
      const { data, error } = await supabase.rpc('get_rating_count_by_genre', {
        input_genre_id: genreId, // Pass the input parameter
      });
  
      if (error) {
        console.error('Error calling function:', error);
        return null;
      }
  
      console.log('Number of manga groups:', data);
      return data;
    } catch (err) {
      console.error('Unexpected error:', err);
      return null;
    }
  }