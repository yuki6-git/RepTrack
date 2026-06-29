import {
  Text,
  Button,
  HStack,
  Flex,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";
import type { TrainingMenu as TrainingMenuType } from "../../types/TrainingMenu";
import type { NewExercise } from "../../types/NewExercise";
import { useWorkoutTimer } from "../../hooks/training/useWorkoutTimer";

type Props = {
  trainingMenu: TrainingMenuType;
  startworkout: (
    trainingMenuId: string,
    exercises: NewExercise[],
  ) => Promise<boolean>;
  endWorkout: (duration: number) => Promise<boolean>;
};

export const TrainingTimer = (props: Props) => {
  const { trainingMenu, startworkout, endWorkout } = props;
  const {
    elapsedSeconds,
    formattedTime,
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  } = useWorkoutTimer();

  const onClickTimer = async () => {
    if (!isRunning) {
      const isStart = window.confirm("トレーニングを開始しますか？");
      if (!isStart) {
        return;
      }
      const isStarted = await startworkout(
        trainingMenu.id,
        trainingMenu.exercises,
      );
      if (!isStarted) {
        return;
      }

      startTimer();

      return;
    }
    const isEnd = window.confirm("トレーニングを終了しますか？");
    if (!isEnd) {
      return;
    }
    const isEnded = await endWorkout(elapsedSeconds);
    if (!isEnded) {
      return;
    }
    stopTimer();
  };

  const onClickRestart = () => {
    resetTimer();
    return;
  };

  return (
    <Flex borderRadius="8px" boxShadow="sm" alignItems="center" p={4}>
      <HStack>
        <Text fontWeight="bold">トレーニング時間 :</Text>
        <Text fontSize="3xl">{formattedTime}</Text>
      </HStack>
      <Spacer />
      <Button mx={4} size="sm" onClick={onClickTimer}>
        {isRunning ? "終了" : "開始"}
      </Button>
      <IconButton
        color="black"
        bg="transparent"
        aria-label="resetTimer"
        onClick={onClickRestart}
      >
        <FiRefreshCw />
      </IconButton>
    </Flex>
  );
};
