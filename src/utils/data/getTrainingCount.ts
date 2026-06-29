import { getWeekStartDate } from "./getWeekStartDate";
import type { WorkoutLog } from "../../types/Workout";
import type { WeeklyTrainingData } from "../../types/AnalyticsData";

type CreateWeeklyTrainingData = {
  logs: WorkoutLog[];
  createWeeklyTrainingData: (workouts: WorkoutLog[]) => WeeklyTrainingData[];
};

export const getThisWeekTrainingCount = ({
  logs,
  createWeeklyTrainingData,
}: CreateWeeklyTrainingData) => {
  const weeklyTrainingData = createWeeklyTrainingData(logs);
  const getThisWeekStartDate = getWeekStartDate(new Date());

  return (
    weeklyTrainingData.find((data) => data.week === getThisWeekStartDate)
      ?.count ?? 0
  );
};

export const getThisMonthTrainingCount = (logs: WorkoutLog[]) => {
  const today = new Date();
  const thisMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

  return logs.filter((log) => log.date.startsWith(thisMonth)).length;
};

export const getThisYearTrainingCount = (logs: WorkoutLog[]) => {
  const today = new Date();
  const thisYear = `${today.getFullYear()}`;

  return logs.filter((log) => log.date.startsWith(thisYear)).length;
};
