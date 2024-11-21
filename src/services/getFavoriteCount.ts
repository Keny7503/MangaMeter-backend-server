import supabase from '../utils/supabaseClient';

export async function getFavoriteCountByUser(userId:string) {
    try {
      const { data, error } = await supabase.rpc('get_favorite_count_by_user', {
        input_user_id: userId, // Pass the userId parameter
      });
  
      if (error) {
        console.error('Error calling function:', error);
        return null;
      }
  
      console.log(`Number of favorites for user ${userId}:`, data);
      return data;
    } catch (err) {
      console.error('Unexpected error:', err);
      return null;
    }
  }