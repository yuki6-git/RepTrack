import type { WorkoutLog } from "../../types/Workout";

export const createTrainingMinutes = (workouts: WorkoutLog[]) => {
  const latestFiveWorkouts = workouts.slice(0, 5).map((workout) => ({
    date: workout.date,
    duration: workout.duration ? Math.round(workout.duration / 60) : 0,
  }));
  return latestFiveWorkouts;
};
