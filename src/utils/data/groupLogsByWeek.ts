import type { WorkoutLog } from "../../types/Workout";
import { getWeekStartDate } from "./getWeekStartDate";

export const groupLogsByWeek = (logs: WorkoutLog[]) => {
  const logsByWeek: Record<string, WorkoutLog[]> = {};

  logs.forEach((log) => {
    const date = new Date(`${log.date}T00:00:00`);
    const weekStartDate = getWeekStartDate(date);

    const currentLogs = logsByWeek[weekStartDate] ?? [];

    logsByWeek[weekStartDate] = [...currentLogs, log];
  });

  return logsByWeek;
};
