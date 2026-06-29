import { HStack, Progress, VStack } from "@chakra-ui/react";
import { TrainingCountDetailModal } from "../details/TrainingCountDetailModal";
import type { WeeklyTrainingData } from "../../../types/AnalyticsData";

type Props = {
  targetCount: number | null;
  progressValue: number;
  weeklyTrainingData: WeeklyTrainingData[];
  thisWeekTrainingCount: number;
  thisMonthTrainingCount: number;
  thisYearTrainingCount: number;
};

export const WeeklyTrainingProgress = (props: Props) => {
  const {
    targetCount,
    progressValue,
    thisWeekTrainingCount,
    thisMonthTrainingCount,
    thisYearTrainingCount,
    weeklyTrainingData,
  } = props;

  return (
    <VStack align="stretch" h="90%">
      <Progress.Root
        value={progressValue}
        colorPalette={"blue"}
        variant="subtle"
        size={"xl"}
        gap="10px"
      >
        <Progress.Label>今週のトレーニング回数</Progress.Label>
        <HStack mt={8} gap="5">
          <Progress.Track flex="1">
            <Progress.Range />
          </Progress.Track>
          <Progress.ValueText>
            {thisWeekTrainingCount} / {targetCount} 回
          </Progress.ValueText>
        </HStack>
      </Progress.Root>
      <TrainingCountDetailModal
        weeklyTrainingData={weeklyTrainingData}
        thisWeekTrainingCount={thisWeekTrainingCount}
        thisMonthTrainingCount={thisMonthTrainingCount}
        thisYearTrainingCount={thisYearTrainingCount}
      />
    </VStack>
  );
};
