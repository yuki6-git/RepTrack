import type { WeeklyTrainingData } from "../../../types/AnalyticsData";
import { WeeklyTrainingCountChart } from "./charts/WeeklyTrainingCountChart";
import { DetailModal } from "./DetailModal";
import { TrainingCountCards } from "./lists/TrainingCountCards";

type Props = {
  weeklyTrainingData: WeeklyTrainingData[];
  thisWeekTrainingCount: number;
  thisMonthTrainingCount: number;
  thisYearTrainingCount: number;
};

export const TrainingCountDetailModal = (props: Props) => {
  const {
    weeklyTrainingData,
    thisWeekTrainingCount,
    thisMonthTrainingCount,
    thisYearTrainingCount,
  } = props;

  return (
    <DetailModal title={"トレーニング回数の詳細"}>
      <WeeklyTrainingCountChart data={weeklyTrainingData} />
      <TrainingCountCards
        thisWeekTrainingCount={thisWeekTrainingCount}
        thisMonthTrainingCount={thisMonthTrainingCount}
        thisYearTrainingCount={thisYearTrainingCount}
      />
    </DetailModal>
  );
};
