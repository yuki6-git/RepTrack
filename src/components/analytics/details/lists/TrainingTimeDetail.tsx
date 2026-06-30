import { Box, Text } from "@chakra-ui/react";
import { AverageTrainingMinutesLineChart } from "../charts/AverageTrainingMinutesLineChart";
import { TrainingTimeList } from "./TrainingTimeList";
import type {
  AverageTrainingMinutesData,
  TrainingMinutesListItem,
} from "../../../../types/AnalyticsData";

type Props = {
  weeklyAverageTrainingMinutes: AverageTrainingMinutesData[];
  monthlyAverageTrainingMinutes: AverageTrainingMinutesData[];
  thisMonthTrainingMinutes: TrainingMinutesListItem[];
};
export const TrainingTimeDetail = (props: Props) => {
  const {
    weeklyAverageTrainingMinutes,
    monthlyAverageTrainingMinutes,
    thisMonthTrainingMinutes,
  } = props;

  return (
    <>
      <Box>
        <Text>今月のトレーニング記録一覧</Text>
        <TrainingTimeList thisMonthTrainingMinutes={thisMonthTrainingMinutes} />
      </Box>

      <Box>
        <Text>月ごとの平均トレーニング時間</Text>
        <AverageTrainingMinutesLineChart data={monthlyAverageTrainingMinutes} />
      </Box>
      <Box>
        <Text>週ごとの平均トレーニング時間</Text>
        <AverageTrainingMinutesLineChart data={weeklyAverageTrainingMinutes} />
      </Box>
    </>
  );
};
