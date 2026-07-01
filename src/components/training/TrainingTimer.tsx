import {
  Text,
  Button,
  HStack,
  Flex,
  IconButton,
  Spacer,
} from "@chakra-ui/react";
import { FiRefreshCw } from "react-icons/fi";
import { useTrainingTimerController } from "../../hooks/training/useTrainingTimerController";
import type { TrainingMenu } from "../../types/TrainingMenu";
import type { NewExercise } from "../../types/NewExercise";

type Props = {
  trainingMenu: TrainingMenu;
  startworkout: (
    trainingMenuId: string,
    exercises: NewExercise[],
  ) => Promise<boolean>;
  endWorkout: (duration: number) => Promise<boolean>;
};

export const TrainingTimer = (props: Props) => {
  const { trainingMenu, startworkout, endWorkout } = props;

  const { formattedTime, isRunning, onClickTimer, onClickRestart } =
    useTrainingTimerController({
      trainingMenu,
      startworkout,
      endWorkout,
    });

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
