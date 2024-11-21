import supabase from '../utils/supabaseClient';
export async function checkFavoriteExists(userId:string, mangaId:string) {
    try {
      const { data, error } = await supabase.rpc('check_favorite_exists', {
        input_user_id: userId,
        input_manga_id: mangaId,
      });
  
      if (error) {
        console.error('Error calling function:', error);
        return null;
      }
  
      console.log(`Favorite exists for user ${userId} and manga ${mangaId}:`, data);
      return data; // Returns true or false
    } catch (err) {
      console.error('Unexpected error:', err);
      return null;
    }
  }