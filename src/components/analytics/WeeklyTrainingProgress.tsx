import {
  Box,
  Button,
  Flex,
  HStack,
  Progress,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { useWeeklyTrainingCount } from "../../utils/weeklyTrainingCount";
import type { UserGoals } from "../../types/ProfileSetting";
import { TrainingCountDetailModal } from "./details/TrainingCountDetailModal";

type Props = {
  userGoals: UserGoals | null;
};

export const WeeklyTrainingProgress = (props: Props) => {
  const { userGoals } = props;
  const currentCount = useWeeklyTrainingCount();

  if (!userGoals) {
    return null;
  }
  const targetCount = userGoals.weekly_goal;
  const progressValue =
    targetCount > 0 ? Math.min((currentCount / targetCount) * 100, 100) : 0;

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
            {currentCount} / {targetCount} 回
          </Progress.ValueText>
        </HStack>
      </Progress.Root>
      <TrainingCountDetailModal />
    </VStack>
  );
};
