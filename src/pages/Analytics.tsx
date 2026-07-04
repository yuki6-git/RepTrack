import { Box, Flex, Heading, SimpleGrid, VStack } from "@chakra-ui/react";
import { WeeklyTrainingProgress } from "../components/analytics/cards/WeeklyTrainingProgress";
import { TrainingMinutesChart } from "../components/analytics/cards/TrainingMinutesChart";
import { PrByExercisesList } from "../components/analytics/cards/PrByExercisesList";
import { TrainingVolumeByPartChart } from "../components/analytics/cards/TrainingVolumeByPartChart";
import { useAnalyticsPageData } from "../hooks/analytics/useAnalyticsPageData";

export const Analytics = () => {
  const {
    weeklyTrainingData,
    trainingMinutesData,
    exercisePrData,
    targetCount,
    progressValue,
    trainingVolumeData,
    groupedExercises,
    latestFourVolumeData,
    thisWeekTrainingCount,
    thisMonthTrainingCount,
    thisYearTrainingCount,
    weeklyAverageTrainingMinutes,
    monthlyAverageTrainingMinutes,
    thisMonthTrainingMinutes,
  } = useAnalyticsPageData();

  return (
    <VStack align="stretch" gap="24px">
      <Heading size="xl">分析</Heading>

      <SimpleGrid columns={{ base: 1, lg: 2 }} gap="24px">
        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="20px">
            トレーニング記録
          </Heading>
          <WeeklyTrainingProgress
            thisWeekTrainingCount={thisWeekTrainingCount}
            thisMonthTrainingCount={thisMonthTrainingCount}
            thisYearTrainingCount={thisYearTrainingCount}
            targetCount={targetCount}
            progressValue={progressValue}
            weeklyTrainingData={weeklyTrainingData}
          />
        </Box>

        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="20px">
            トレーニング時間 (分)
          </Heading>

          <Flex gap="32px">
            <VStack flex="1">
              <TrainingMinutesChart
                trainingMinutesData={trainingMinutesData}
                weeklyAverageTrainingMinutes={weeklyAverageTrainingMinutes}
                monthlyAverageTrainingMinutes={monthlyAverageTrainingMinutes}
                thisMonthTrainingMinutes={thisMonthTrainingMinutes}
              />
            </VStack>
          </Flex>
        </Box>

        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="20px">
            種目別PR記録
          </Heading>
          <PrByExercisesList exercisePrData={exercisePrData} />
        </Box>

        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="20px">
            部位別総重量
          </Heading>
          <TrainingVolumeByPartChart
            trainingVolumeData={trainingVolumeData}
            latestFourVolumeData={latestFourVolumeData}
            groupedExercises={groupedExercises}
          />
        </Box>
      </SimpleGrid>
    </VStack>
  );
};
