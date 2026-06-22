import { supabase } from "../lib/supabase";

export const insertWeightRecords = async (weight: string, bodyFat: string) => {
  return await supabase.from("weight_records").insert({
    weight: Number(weight),
    body_fat: Number(bodyFat),
    recorded_at: new Date().toISOString().slice(0, 10),
  });
};

export const fetchweightRecords = async (userId:string) => {
  return await supabase
    .from("weight_records")
    .select("*")
    .eq("user_id", userId)
    .order("recorded_at", { ascending: false });
};
