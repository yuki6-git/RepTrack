import { useAnalyticsData } from "../hooks/analytics/useAnalyticsData";
import { useWorkoutLogs } from "../hooks/workout/useWorkoutLogs";
import { getWeekStartDate } from "./getWeekStartDate";

type WeeklyTrainingData = {
  week: string;
  count: number;
};
export const useGetTrainingCount = () => {
  const { createWeeklyTrainingData } = useAnalyticsData();
  const { logs } = useWorkoutLogs();
  const weeklyTrainingData = createWeeklyTrainingData(logs);
  const getThisWeekStartDate = getWeekStartDate(new Date());
  const getThisWeekTraingCount =
    weeklyTrainingData.find(
      (data: WeeklyTrainingData) => data.week === getThisWeekStartDate,
    )?.count ?? 0;

  const getThisMonthTrainingCount = () => {
    const today = new Date();
    const thisMonth = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}`;

    return logs.filter((log) => log.date.startsWith(thisMonth)).length;
  };

  const getThisYearTrainingCount = () => {
    const today = new Date();
    const thisYear = `${today.getFullYear()}`;

    return logs.filter((log) => log.date.startsWith(thisYear)).length;
  };

  return {
    getThisWeekTraingCount,
    getThisMonthTrainingCount,
    getThisYearTrainingCount,
  };
};
