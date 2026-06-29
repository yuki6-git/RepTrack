import { Box, Text } from "@chakra-ui/react";
import { AverageTrainingMinuesLineChart } from "../../analytics/details/chart/AverageTrainingMinuesLineChart";
import { useWorkoutLogs } from "../../../hooks/workout/useWorkoutLogs";
import { TrainingTimeList } from "../../analytics/details/chart/TrainingTimeList";
import { groupLogsByWeek } from "../../../utils/groupLogsByWeek";
import { calculateAverageTrainingTime } from "../../../utils/calculareAvarageTrainingTime";

export const TrainingTimeDetail = () => {
  const { logs } = useWorkoutLogs();
  const thisMonthTrainingMinutes = logs.map((log) => ({
    id: log.id ?? "",
    date: log.date ?? "",
    title: log.title ?? "",
    durationMinutes: log.duration ?? 0,
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
  const monthlyLogs = groupLogsByWeek(logs);
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
        <AverageTrainingMinuesLineChart data={weeklyAverageTrainingMinutes} />
      </Box>
      <Box>
        <Text>週ごとの平均トレーニング時間</Text>
        <AverageTrainingMinuesLineChart data={monthlyAverageTrainingMinutes} />
      </Box>
    </>
  );
};
