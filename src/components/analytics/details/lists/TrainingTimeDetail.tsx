import { Box, Text } from "@chakra-ui/react";
import { AverageTrainingMinutesLineChart } from "../charts/AverageTrainingMinutesLineChart";
import { TrainingTimeList } from "./TrainingTimeList";
import { groupLogsByWeek } from "../../../../utils/data/groupLogsByWeek";
import { calculateAverageTrainingTime } from "../../../../utils/analytics/calculateAverageTrainingTime";
import { groupLogsByMonth } from "../../../../utils/data/groupLogsByMonth"
import type { WorkoutLog } from "../../../../types/Workout";

type Props = {
  logs: WorkoutLog[];
};
export const TrainingTimeDetail = (props: Props) => {
  const { logs } = props;
  const thisMonthTrainingMinutes = logs.map((log) => ({
    id: log.id ?? "",
    date: log.date ?? "",
    title: log.title ?? "",
    durationMinutes: log.duration ? Math.round(log.duration / 60) : 0,
  }));

  const weeklyLogs = groupLogsByWeek(logs);
  const weeklyAverageTrainingMinutes = Object.entries(weeklyLogs).map(
    ([week, Logs]) => {
      const durations = Logs.map((log) => log.duration ?? 0);
      return {
        label: week,
        averageMinutes: calculateAverageTrainingTime(durations),
      };
    },
  );
  const monthlyLogs = groupLogsByMonth(logs);
  const monthlyAverageTrainingMinutes = Object.entries(monthlyLogs).map(
    ([month, Logs]) => {
      const durations = Logs.map((log) => log.duration ?? 0);
      return {
        label: month,
        averageMinutes: calculateAverageTrainingTime(durations),
      };
    },
  );
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
