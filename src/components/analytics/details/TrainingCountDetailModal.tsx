import { useWorkoutLogs } from "../../../hooks/workout/useWorkoutLogs";
import { useAnalyticsData } from "../../../hooks/analytics/useAnalyticsData";
import { WeeklyTrainingCountChart } from "./chart/WeeklyTrainingCountChart";
import { DetailModal } from "./DeatailModal";

export const TrainingCountDetailModal = () => {
  const { logs } = useWorkoutLogs();
  const { createWeeklyTrainingData } = useAnalyticsData();
  const weeklyTrainingData = createWeeklyTrainingData(logs);
  return (
    <DetailModal title={"トレーニング回数の詳細"}>
      <WeeklyTrainingCountChart data={weeklyTrainingData} />
    </DetailModal>
  );
};
