import type { Workout } from "../../types/Workout";
import { getWeekStartDate } from "./getWeekStartDate";
import { groupLogsByWeek } from "./groupLogsByWeek";

export const getThisWeekTrainingLogs = (workouts: Workout[]) => {
  const workoutLogs = workouts.map((workout) => ({
    id: workout.id,
    date: workout.workout_date,
    title: "",
    start: workout.start_time,
    end: workout.end_time,
    duration: workout.duration,
    records: [],
  }));
  const logsByWeek = groupLogsByWeek(workoutLogs);
  const thisWeekKey = getWeekStartDate(new Date());
  const thisWeekLogs = logsByWeek[thisWeekKey] ?? [];
  return thisWeekLogs;
};
