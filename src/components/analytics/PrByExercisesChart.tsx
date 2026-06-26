import { Button, Flex, Text, VStack } from "@chakra-ui/react";
import type { ExerciseRecord } from "../../types/Workout";
import { useWorkoutLogs } from "../../hooks/workout/useWorkoutLogs";

type CreateExercisesPr = {
  exerciseName: string;
  maxWeight: number;
};
type Props = {
  createExercisesPr: (exerciseRecords: ExerciseRecord[]) => CreateExercisesPr[];
};

export const PrByExercises = (props: Props) => {
  const { createExercisesPr } = props;
  const { logs } = useWorkoutLogs();
  const exerciseRecords = logs.flatMap((log) => log.records);
  const ExercisePrData = createExercisesPr(exerciseRecords);

  return (
    <>
      {ExercisePrData.length === 0 ? (
        <Text color="gray.500">PRデータがありません</Text>
      ) : (
        <VStack align="stretch" gap="12px">
          {ExercisePrData.slice(0, 3).map((pr, index) => (
            <Flex
              key={pr.exerciseName}
              justify="space-between"
              align="center"
              p="12px"
              borderWidth="1px"
              borderRadius="8px"
            >
              <Flex align="center" gap="12px">
                <Text fontWeight="bold" color="gray.500">
                  {index + 1}
                </Text>
                <Text fontWeight="bold">{pr.exerciseName}</Text>
              </Flex>

              <Text fontWeight="bold">{pr.maxWeight}kg</Text>
            </Flex>
          ))}
          <Button mt="24px" width="100%" variant="outline">
            くわしく見る
          </Button>
        </VStack>
      )}
    </>
  );
};
