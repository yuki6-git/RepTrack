import { HStack, Progress } from "@chakra-ui/react";
import type { WorkoutLog } from "../../types/Workout";
import { useWorkoutLogs } from "../../hooks/workout/useWorkoutLogs";
import { getWeekStartDate } from "../../utils/getWeekStartDate";
import type { UserGoals } from "../../types/ProfileSetting";

type WeeklyTrainingData = {
  week: string;
  count: number;
};

type Props = {
  createWeeklyTrainingData: (workouts: WorkoutLog[]) => WeeklyTrainingData[];
  userGoals: UserGoals | null;
};

export const WeeklyTrainingProgress = (props: Props) => {
  const { createWeeklyTrainingData, userGoals } = props;
  const { logs } = useWorkoutLogs();

  const weeklyTrainingData = createWeeklyTrainingData(logs);
  const getThisWeekStartDate = getWeekStartDate(new Date());
  const currentCount =
    weeklyTrainingData.find(
      (data: WeeklyTrainingData) => data.week === getThisWeekStartDate,
    )?.count ?? 0;

  if (!userGoals) {
    return null;
  }
  const targetCount = userGoals.weekly_goal;
  const progressValue =
    targetCount > 0 ? Math.min((currentCount / targetCount) * 100, 100) : 0;

  return (
    <Progress.Root
      value={progressValue}
      colorPalette={"blue"}
      variant="subtle"
      size={"xl"}
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
  );
};
