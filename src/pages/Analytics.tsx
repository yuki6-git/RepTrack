import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  VStack,
} from "@chakra-ui/react";
import { useAnalyticsData } from "../hooks/analytics/useAnalyticsData";
import { WeeklyTrainingProgress } from "../components/analytics/WeeklyTrainingProgress";
import { useFetchUserProfile } from "../hooks/profileSetting/useFetchuserProfile";
import { TrainingMinutesChart } from "../components/analytics/TrainingMinutesChart";
import { PrByExercises } from "../components/analytics/PrByExercisesChart";
import { TrainingVolumeByPartChart } from "../components/analytics/TrainingVolumeByPartChart";

export const Analytics = () => {
  const {
    createWeeklyTrainingData,
    createTrainingMinutes,
    createExercisesPr,
    calculateTrainingVolumebypart,
  } = useAnalyticsData();

  const { userGoals } = useFetchUserProfile();

  return (
    <VStack align="stretch" gap="24px">
      <Heading size="xl">分析</Heading>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="24px">
        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="20px">
            今週のトレーニング記録
          </Heading>
          <WeeklyTrainingProgress
            createWeeklyTrainingData={createWeeklyTrainingData}
            userGoals={userGoals}
          />
        </Box>

        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="20px">
            トレーニング時間
          </Heading>

          <Flex gap="32px">
            <VStack flex="1">
              <TrainingMinutesChart
                createTrainingMinutes={createTrainingMinutes}
              />
            </VStack>
          </Flex>
        </Box>

        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="20px">
            種目別PR記録
          </Heading>
          <PrByExercises createExercisesPr={createExercisesPr} />
          <Button mt="24px" width="100%" variant="outline">
            すべて見る
          </Button>
        </Box>

        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="20px">
            部位別総重量
          </Heading>
          <TrainingVolumeByPartChart
            calculateTrainingVolumebypart={calculateTrainingVolumebypart}
          />
        </Box>
      </SimpleGrid>
    </VStack>
  );
};
