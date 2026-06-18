export type Workout = {
  id: string;
  user_id: string;
  training_menu_id: string;
  workout_date: string;
  created_at: string;
  start_time: string | null;
  end_time: string | null;
  duration: number | null;
};

export type ExerciseRecord = {
  id: string;
  workout_id: string;
  training_menu_exercise_id: string;
  exercise_name: string;
  set_weight: number;
  max_weight: number | null;
  reps: number;
  sets: number;
  completed: boolean;
  created_at: string;
};

export type WorkoutLog = {
  id: string;
  date: string;
  title: string;
  start: string | null;
  end: string | null;
  duration: number | null;
  records: ExerciseRecord[];
};
