import { Label, Pie, PieChart, Tooltip } from "recharts";
import type { ExerciseRecord } from "../../types/Workout";
import { useWorkoutLogs } from "../../hooks/workout/useWorkoutLogs";
import { Text } from "@chakra-ui/react";

type CalculateTrainingVolumebypart = {
  part: string;
  volume: number;
};
type Props = {
  calculateTrainingVolumebypart: (
    exerciseRecords: ExerciseRecord[],
  ) => CalculateTrainingVolumebypart[];
};
export const TrainingVolumeByPartChart = (props: Props) => {
  const { calculateTrainingVolumebypart } = props;
  const { logs } = useWorkoutLogs();
  const exerciseRecords = logs.flatMap((log) => log.records);
  const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#9333ea", "#ef4444"];
  const trainingVolumeData = calculateTrainingVolumebypart(exerciseRecords).map(
    (data, index) => ({
      ...data,
      fill: COLORS[index % COLORS.length],
    }),
  );

  return (
    <>
      {trainingVolumeData.length === 0 ? (
        <Text color="gray.500">重量のデータがありません</Text>
      ) : (
        <PieChart>
          <Pie
            data={trainingVolumeData}
            dataKey="volume"
            nameKey="part"
            fill="#8884d8"
            innerRadius="80%"
            outerRadius="100%"
            paddingAngle={4}
            cornerRadius="50%"
          >
            <Label
              value="部位別総重量"
              position="center"
              fontSize={16}
              fontWeight="bold"
            />
          </Pie>
          <Tooltip formatter={(value, name) => [`${value}kg`, name]} />
        </PieChart>
      )}
    </>
  );
};
