import { supabase } from "../lib/supabase";
import type { NewExercise } from "../types/NewExercise";

const toNullableNumber = (value: string) => {
  if (value.trim() === "") {
    return null;
  }

  return Number(value);
};

const toNumber = (value: string) => {
  return Number(value);
};

export const fetchTrainingMenuRows = async () => {
  return await supabase
    .from("training_menu")
    .select("*")
    .order("created_at", { ascending: true });
};

export const fetchTrainingMenuExerciseRows = async () => {
  return await supabase
    .from("training_menu_exercises")
    .select("*")
    .order("created_at", { ascending: true });
};

export const insertTrainingMenu = async (
  tabId: string,
  menuTitle: string,
  userId: string,
) => {
  return await supabase
    .from("training_menu")
    .insert({
      user_id: userId,
      tab_id: tabId,
      title: menuTitle,
    })
    .select()
    .single();
};

export const insertTrainingMenuExercises = async (
  trainingMenuId: string,
  draftExercises: NewExercise[],
) => {
  const exerciseRows = draftExercises.map((draftExercise) => ({
    training_menu_id: trainingMenuId,
    part: draftExercise.part,
    exercise_name: draftExercise.exerciseName,
    max_weight: toNullableNumber(draftExercise.maxWeight),
    set_weight: toNumber(draftExercise.setWeight),
    sets: toNumber(draftExercise.sets),
    reps: toNumber(draftExercise.reps),
  }));

  return await supabase.from("training_menu_exercises").insert(exerciseRows);
};

export const replaceTrainingMenuExercises = async (
  trainingMenuId: string,
  exercises: NewExercise[],
) => {
  const { error: deleteError } = await supabase
    .from("training_menu_exercises")
    .delete()
    .eq("training_menu_id", trainingMenuId);

  if (deleteError) {
    return { error: deleteError };
  }

  return await insertTrainingMenuExercises(trainingMenuId, exercises);
};

export const updateTrainingMenuTitle = async (
  trainingMenuId: string,
  menuTitle: string,
) => {
  return await supabase
    .from("training_menu")
    .update({ title: menuTitle })
    .eq("id", trainingMenuId);
};
