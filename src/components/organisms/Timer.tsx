import {
  Text,
  Button,
  HStack,
  Flex,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { useWorkoutSession } from "../../hooks/workout/useWorkoutSession";
import type { TrainingMenu as TrainingMenuType } from "../../types/TrainingMenu";

type Props = {
  trainingMenu: TrainingMenuType;
};

export const Timer = (props: Props) => {
  const { trainingMenu } = props;
  const [startedTime, setStartedTime] = useState<Date | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState<Boolean>(false);
  const { startworkout, endWorkout } = useWorkoutSession();

  useEffect(() => {
    if (!startedTime || !isRunning) return;

    const timerId = setInterval(() => {
      const oneSecound = Math.floor(
        (Date.now() - startedTime.getTime()) / 1000,
      );
      setElapsedSeconds(oneSecound);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [startedTime, isRunning]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const onClickTimer = () => {
    if (!isRunning) {
      setStartedTime(new Date());
      setIsRunning(true);
      startworkout(trainingMenu.id, trainingMenu.exercises);
      return;
    }

    setIsRunning(false);
    endWorkout(elapsedSeconds);
  };

  const onClickRestart = () => {
    setElapsedSeconds(0);
    setStartedTime(new Date());
  };

  return (
    <Flex borderRadius="8px" boxShadow="sm" alignItems="center" p={4}>
      <HStack>
        <Text fontWeight="bold">トレーニング時間 :</Text>
        <Text fontSize="3xl">{formatTime(elapsedSeconds)}</Text>
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
