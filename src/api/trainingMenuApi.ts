import { supabase } from "../lib/supabase";
import type { NewExercise } from "../types/NewExercise";

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

export const insertTrainingMenu = async (tabId: string) => {
  return await supabase
    .from("training_menu")
    .insert({
      tab_id: tabId,
      title: "トレーニングメニュー",
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
    max_weight: draftExercise.maxWeight,
    set_weight: draftExercise.setWeight,
    sets: draftExercise.sets,
    reps: draftExercise.reps,
  }));

  return await supabase.from("training_menu_exercises").insert(exerciseRows);
};
