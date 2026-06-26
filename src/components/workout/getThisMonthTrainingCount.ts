import type { WorkoutLog } from "../../types/Workout";

export const getThisMonthTrainingCount = (logs: WorkoutLog[]) => {
  const today = new Date();
  const thisMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

  return logs.filter((log) => log.date.startsWith(thisMonth)).length;
};
