import { useAnalyticsData } from "../hooks/analytics/useAnalyticsData";
import { useWorkoutLogs } from "../hooks/workout/useWorkoutLogs";
import { getWeekStartDate } from "./getWeekStartDate";

type WeeklyTrainingData = {
  week: string;
  count: number;
};
export const useWeeklyTrainingCount = () => {
  const { createWeeklyTrainingData } = useAnalyticsData();
  const { logs } = useWorkoutLogs();
  const weeklyTrainingData = createWeeklyTrainingData(logs);
  const getThisWeekStartDate = getWeekStartDate(new Date());
  return (
    weeklyTrainingData.find(
      (data: WeeklyTrainingData) => data.week === getThisWeekStartDate,
    )?.count ?? 0
  );
};
