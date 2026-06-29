import { Flex, Text, VStack } from "@chakra-ui/react";
import { PrDetailModal } from "../details/PrDetailModal";
import type { ExercisePrData } from "../../../types/AnalyticsData";

type Props = {
  exercisePrData: ExercisePrData[];
};

export const PrByExercisesList = (props: Props) => {
  const { exercisePrData } = props;

  return (
    <>
      {exercisePrData.length === 0 ? (
        <Text color="gray.500">PRデータがありません</Text>
      ) : (
        <VStack align="stretch" gap="12px">
          {exercisePrData.slice(0, 3).map((pr, index) => (
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
          <PrDetailModal ExercisePrData={exercisePrData} />
        </VStack>
      )}
    </>
  );
};
