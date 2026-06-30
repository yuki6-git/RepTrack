import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import { Text } from "@chakra-ui/react";
import { TrainingTimeDetailModal } from "../details/TrainingTimeDetailModal";
import type {
  AverageTrainingMinutesData,
  TrainingMinutes,
  TrainingMinutesListItem,
} from "../../../types/AnalyticsData";

type Props = {
  trainingMinutesData: TrainingMinutes[];
  weeklyAverageTrainingMinutes: AverageTrainingMinutesData[];
  monthlyAverageTrainingMinutes: AverageTrainingMinutesData[];
  thisMonthTrainingMinutes: TrainingMinutesListItem[];
};
export const TrainingMinutesChart = (props: Props) => {
  const {
    trainingMinutesData,
    weeklyAverageTrainingMinutes,
    monthlyAverageTrainingMinutes,
    thisMonthTrainingMinutes,
  } = props;

  return (
    <>
      {trainingMinutesData.length === 0 ? (
        <Text color="gray.500">トレーニングデータがありません</Text>
      ) : (
        <BarChart
          style={{
            width: "100%",
            maxWidth: "700px",
            maxHeight: "70vh",
            aspectRatio: 1.618,
          }}
          responsive
          data={trainingMinutesData}
          margin={{
            top: 5,
            right: 5,
            left: 0,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis
            label={{
              value: "(分)",
              position: "top",
              offset: -8,
            }}
            width="auto"
          />
          <Tooltip />
          <Bar
            dataKey="duration"
            fill="#8884d8"
            activeBar={{ fill: "pink", stroke: "blue" }}
            radius={[10, 10, 0, 0]}
          />
        </BarChart>
      )}
      <TrainingTimeDetailModal
        weeklyAverageTrainingMinutes={weeklyAverageTrainingMinutes}
        monthlyAverageTrainingMinutes={monthlyAverageTrainingMinutes}
        thisMonthTrainingMinutes={thisMonthTrainingMinutes}
      />
    </>
  );
};
