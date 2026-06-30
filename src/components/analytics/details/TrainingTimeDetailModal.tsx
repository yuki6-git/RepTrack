import { TrainingTimeDetail } from "./lists/TrainingTimeDetail";
import { DetailModal } from "./DetailModal";
import type {
  AverageTrainingMinutesData,
  TrainingMinutesListItem,
} from "../../../types/AnalyticsData";

type Props = {
  weeklyAverageTrainingMinutes: AverageTrainingMinutesData[];
  monthlyAverageTrainingMinutes: AverageTrainingMinutesData[];
  thisMonthTrainingMinutes: TrainingMinutesListItem[];
};

export const TrainingTimeDetailModal = (props: Props) => {
  const {
    weeklyAverageTrainingMinutes,
    monthlyAverageTrainingMinutes,
    thisMonthTrainingMinutes,
  } = props;
  return (
    <DetailModal title="トレーニング時間の詳細">
      <TrainingTimeDetail
        weeklyAverageTrainingMinutes={weeklyAverageTrainingMinutes}
        monthlyAverageTrainingMinutes={monthlyAverageTrainingMinutes}
        thisMonthTrainingMinutes={thisMonthTrainingMinutes}
      />
    </DetailModal>
  );
};
