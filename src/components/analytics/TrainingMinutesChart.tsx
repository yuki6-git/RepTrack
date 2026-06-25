import { Bar, BarChart, CartesianGrid, Tooltip, XAxis, YAxis } from "recharts";
import type { WorkoutLog } from "../../types/Workout";
import { useWorkoutLogs } from "../../hooks/workout/useWorkoutLogs";
import { Text } from "@chakra-ui/react";

type TrainingMinues = {
  date: string;
  duration: number;
};

type Props = {
  createTrainingMinutes: (workouts: WorkoutLog[]) => TrainingMinues[];
};

export const TrainingMinutesChart = (props: Props) => {
  const { createTrainingMinutes } = props;
  const { logs } = useWorkoutLogs();

  const TrainingMinutesData = createTrainingMinutes(logs);

  return (
    <>
      {TrainingMinutesData.length === 0 ? (
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
          data={TrainingMinutesData}
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
    </>
  );
};
