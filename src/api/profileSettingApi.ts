import { supabase } from "../lib/supabase";

export const fetchUserInfo = async () => {
  return await supabase.from("").select();
};
