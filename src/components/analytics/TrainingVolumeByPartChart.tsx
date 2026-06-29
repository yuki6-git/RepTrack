import { Label, Pie, PieChart, Tooltip } from "recharts";
import type { ExerciseRecord } from "../../types/Workout";
import { useWorkoutLogs } from "../../hooks/workout/useWorkoutLogs";
import { HStack, Text, VStack, Button, Spacer, Box } from "@chakra-ui/react";
import { TrainingVolumeDetailModal } from "./details/TrainingVolumeDetailModal";

type ExerciseVolume = {
  exerciseName: string;
  volume: number;
};

type CalculateTrainingVolumebypart = {
  part: string;
  totalVolume: number;
  exercises: ExerciseVolume[];
};
type Props = {
  calculateTrainingVolumebypart: (
    exerciseRecords: ExerciseRecord[],
  ) => CalculateTrainingVolumebypart[];
};
export const TrainingVolumeByPartChart = (props: Props) => {
  const { calculateTrainingVolumebypart } = props;
  const { logs } = useWorkoutLogs();
  const latestExerciseRecords = logs[0]?.records ?? [];
  const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#9333ea", "#ef4444"];
  const trainingVolumeData = calculateTrainingVolumebypart(
    latestExerciseRecords,
  ).map((data, index) => ({
    ...data,
    fill: COLORS[index % COLORS.length],
  }));

  return (
    <>
      {trainingVolumeData.length === 0 ? (
        <Text color="gray.500">重量のデータがありません</Text>
      ) : (
        <HStack>
          <PieChart width={300} height={300}>
            <Pie
              data={trainingVolumeData}
              dataKey="totalVolume"
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
                color="black"
              />
            </Pie>
            <Tooltip formatter={(value, name) => [`${value}kg`, name]} />
          </PieChart>
          <VStack h="100%" as="ul" ml="4" align="flex-start" justify="stretch">
            <Box>
              {trainingVolumeData.map((partVolume) => (
                <li key={partVolume.part}>
                  <Text fontSize="xl" textAlign="left">
                    {partVolume.part} : {partVolume.totalVolume}kg
                  </Text>
                </li>
              ))}
            </Box>
            <TrainingVolumeDetailModal />
          </VStack>
        </HStack>
      )}
    </>
  );
};
