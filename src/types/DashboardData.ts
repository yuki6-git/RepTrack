import type { TrainingMenu } from "./TrainingMenu";
import type { ExerciseRecord, Workout } from "./Workout";

export type DashboardData = {
  latestWeight: number | null;
  targetWeight: number | null;
  weeklyWorkoutCount: number;
  weeklyGoal: number | null;
  todayTrainingMenu: TrainingMenu | null;
  latestWorkouts: Workout[] | null;
  latestPr: ExerciseRecord | null;
};
