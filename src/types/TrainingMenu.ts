import type { NewExercise } from "./NewExercise";

export type TrainingMenu = {
  id: string;
  userId: string;
  tabId: string;
  title: string;
  createdAt: string;
  exercises: NewExercise[];
};

export type TrainingMenuRow = {
  id: string;
  user_id: string;
  tab_id: string;
  title: string;
  created_at: string;
};

export type TrainingMenuExerciseRow = {
  id: string;
  training_menu_id: string;
  part: string;
  exercise_name: string;
  max_weight: number;
  set_weight: number;
  sets: number;
  reps: number;
  created_at: string;
};
