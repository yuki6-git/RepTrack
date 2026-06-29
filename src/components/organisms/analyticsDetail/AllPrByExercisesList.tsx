import { Box, Flex, Heading, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import type { CreateExercisesPr } from "../../analytics/PrByExercisesList";

type Props = { ExercisePrData: CreateExercisesPr[] };
export const AllPrByExercisesList = (props: Props) => {
  const { ExercisePrData } = props;
  return (
    <>
      {ExercisePrData.length === 0 ? (
        <Text color="gray.500">PRデータがありません</Text>
      ) : (
        <SimpleGrid columns={{ base: 1, md: 3 }} gap="16px">
          {ExercisePrData.map((pr, index) => (
            <Box
              key={pr.exerciseName}
              p="16px"
              borderWidth="1px"
              borderRadius="12px"
              bg="white"
              boxShadow="sm"
            >
              <Flex justify="space-between" align="center" mb="12px">
                <Text fontSize="sm" fontWeight="bold" color="gray.500">
                  No.{index + 1}
                </Text>

                <Text fontSize="sm" color="gray.700">
                  達成日: {pr.achievedDate}
                </Text>
              </Flex>
              <Flex justify="stretch" align="baseline" gap="10px">
                <Text fontWeight="bold" fontSize="lg" mb="8px">
                  {pr.exerciseName}
                </Text>
                <Text fontWeight="bold" fontSize="lg" mb="8px">
                  ({pr.part})
                </Text>
              </Flex>
              <Flex align="baseline" gap="4px">
                <Text fontSize="2xl">{pr.maxWeight}</Text>
                <Text fontWeight="bold" color="gray.600">
                  kg
                </Text>
              </Flex>
            </Box>
          ))}
        </SimpleGrid>
      )}
    </>
  );
};
