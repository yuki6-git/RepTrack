import type { WorkoutLog } from "../../types/Workout";
import { formatDate } from "../data/formatdate";

export const createWeeklyTrainingData = (workouts: WorkoutLog[]) => {
  const weeklyCounts: Record<string, number> = {};
  workouts.forEach((workout) => {
    const date = new Date(`${workout.date}T00:00:00`);
    const day = date.getDay();
    const monday = new Date(date);
    monday.setDate(date.getDate() - ((day + 6) % 7));

    const weekKey = formatDate(monday);
    weeklyCounts[weekKey] = (weeklyCounts[weekKey] ?? 0) + 1;
  });
  return Object.entries(weeklyCounts).map(([week, count]) => ({
    week,
    count,
  }));
};
