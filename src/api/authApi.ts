import { supabase } from "../lib/supabase";

export const signUp = async (email: string, password: string) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${window.location.origin}/login`,
    },
  });
};

export const signIn = async (email: string, password: string) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

export const signOut = async () => {
  return await supabase.auth.signOut();
};

export const getCurrentUser = async () => {
  return await supabase.auth.getUser();
};

export const fetchUserById = async (userId: string) => {
  return await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();
};

export const getCurrentUserId = async () => {
  const { data, error } = await getCurrentUser();

  if (error || !data.user?.id) {
    return null;
  }

  return data.user.id;
};