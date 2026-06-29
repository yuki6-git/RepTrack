import type { WorkoutLog } from "../types/Workout";

export const groupLogsByMonth = (logs: WorkoutLog[]) => {
  const logsByMonth: Record<string, WorkoutLog[]> = {};

  logs.forEach((log) => {
    const date = new Date(log.date);
    const TargetMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
    const currentLogs = logsByMonth[TargetMonth] ?? [];

    logsByMonth[TargetMonth] = [...currentLogs, log];
  });
  return logsByMonth;
};
