import { supabase } from "../lib/supabase";
import type { NewExercise } from "../types/NewExercise";

export const insertWorkout = async (userId: string, trainingMenuId: string) => {
  return await supabase
    .from("workouts")
    .insert({
      user_id: userId,
      training_menu_id: trainingMenuId,
      workout_date: new Date().toISOString().slice(0, 10),
      start_time: new Date().toISOString(),
    })
    .select()
    .single();
};

export const insertExerciseRecords = async (
  workoutId: string,
  exercises: NewExercise[],
) => {
  const exerciseRows = exercises.map((exercise) => ({
    workout_id: workoutId,
    training_menu_exercise_id: exercise.id,
    exercise_name: exercise.exerciseName,
    set_weight: Number(exercise.setWeight),
    max_weight: Number(exercise.maxWeight),
    reps: Number(exercise.reps),
    sets: Number(exercise.sets),
    completed: false,
  }));
  return await supabase.from("exercise_records").insert(exerciseRows).select();
};

export const updateWorkoutEnd = async (workoutID: string, duration: number) => {
  return await supabase
    .from("workouts")
    .update({
      end_time: new Date().toISOString(),
      duration,
    })
    .eq("id", workoutID);
};

export const updateExerciseRecordCompleted = async (
  workoutId: string,
  trainingMenuExerciseId: string,
  completed: boolean,
) => {
  return await supabase
    .from("exercise_records")
    .update({
      completed,
    })
    .eq("workout_id", workoutId)
    .eq("training_menu_exercise_id", trainingMenuExerciseId);
};

export const fetchWorkoutLogs = async (userId: string) => {
  return await supabase
    .from("workouts")
    .select(
      `
      *,
      exercise_records (*)
    `,
    )
    .eq("user_id", userId)
    .order("workout_date", { ascending: false });
};
