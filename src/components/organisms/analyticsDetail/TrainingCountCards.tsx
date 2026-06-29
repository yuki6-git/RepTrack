import { Box, SimpleGrid, Text, Flex } from "@chakra-ui/react";
import { useGetTrainingCount } from "../../../utils/useGetTrainingCount";

export const TrainingCountCards = () => {
  const {
    getThisWeekTraingCount,
    getThisMonthTrainingCount,
    getThisYearTrainingCount,
  } = useGetTrainingCount();

  const thisMonthTrainingCount = getThisMonthTrainingCount();
  const thisYearTrainingCount = getThisYearTrainingCount();

  return (
    <SimpleGrid m={10} columns={{ base: 1, md: 3 }} gap="20px">
      <Box
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="16px"
        p="24px"
        boxShadow="sm"
      >
        <Text fontSize="sm" color="gray.500" fontWeight="bold" mb="12px">
          今週のトレーニング回数
        </Text>

        <Flex align="baseline" justify="space-between">
          <Text fontSize="3xl">{getThisWeekTraingCount}</Text>
          <Text fontSize="lg" fontWeight="bold" color="gray.600">
            回
          </Text>
        </Flex>
      </Box>

      <Box
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="16px"
        p="24px"
        boxShadow="sm"
      >
        <Text fontSize="sm" color="gray.500" fontWeight="bold" mb="12px">
          今月のトレーニング回数
        </Text>

        <Flex align="baseline" justify="space-between">
          <Text fontSize="3xl">{thisMonthTrainingCount}</Text>
          <Text fontSize="lg" fontWeight="bold" color="gray.600">
            回
          </Text>
        </Flex>
      </Box>

      <Box
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
        borderRadius="16px"
        p="24px"
        boxShadow="sm"
      >
        <Text fontSize="sm" color="gray.500" fontWeight="bold" mb="12px">
          今年のトレーニング回数
        </Text>

        <Flex align="baseline" justify="space-between">
          <Text fontSize="3xl">{thisYearTrainingCount}</Text>
          <Text fontSize="lg" fontWeight="bold" color="gray.600">
            回
          </Text>
        </Flex>
      </Box>
    </SimpleGrid>
  );
};
