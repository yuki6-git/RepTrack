import { Badge, Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import type { VolumeData } from "../../../../types/AnalyticsData";

type Props = { volumeRanking: VolumeData[] };

export const TrainingVolumeRanking = (props: Props) => {
  const { volumeRanking } = props;

  return (
    <VStack align="stretch" gap="12px">
      {volumeRanking.length === 0 ? (
        <Text color="gray.500">総重量データがありません</Text>
      ) : (
        volumeRanking.map((data, index) => (
          <Box
            key={data.part}
            p="16px"
            borderWidth="1px"
            borderRadius="12px"
            bg="white"
            boxShadow="sm"
          >
            <Flex justify="space-between" align="center" mb="12px">
              <Flex align="center" gap="12px">
                <Badge colorPalette={index === 0 ? "blue" : "gray"}>
                  No.{index + 1}
                </Badge>

                <Heading size="md">{data.part}</Heading>
              </Flex>

              <Flex align="baseline" gap="4px">
                <Heading size="lg">{data.totalVolume}</Heading>
                <Text color="gray.500" fontWeight="bold">
                  kg
                </Text>
              </Flex>
            </Flex>

            <VStack align="stretch" gap="6px">
              {data.exercises.map((exercise, exerciseIndex) => (
                <Flex
                  key={`${exercise.exerciseName}-${exerciseIndex}`}
                  justify="space-between"
                  color="gray.600"
                >
                  <Text>{exercise.exerciseName}</Text>
                  <Text fontWeight="bold">{exercise.volume}kg</Text>
                </Flex>
              ))}
            </VStack>
          </Box>
        ))
      )}
    </VStack>
  );
};
