import { Text, HStack, Spacer, Box } from "@chakra-ui/react";
import type { TrainingMenu as TrainingMenuType } from "../../types/TrainingMenu";
import { ExerciseListBypart } from "./ExerciseListByPart";
import { CreateTrainingMenuModal } from "./CreateTrainingMenuModal";
import { Timer } from "../organisms/Timer";
import { useWorkoutSession } from "../../hooks/workout/useWorkoutSession";

type Props = {
  trainingMenu: TrainingMenuType;
};

export const TrainingMenu = (props: Props) => {
  const { trainingMenu } = props;
  const {
    toggleCompleted,
    startworkout,
    endWorkout,
    exerciseRecords,
    isLoading,
    errorMessage,
  } = useWorkoutSession();
  return (
    <>
      <HStack my={4}>
        <Text fontWeight="bold">今日の筋トレメニュー</Text>
        <Spacer />
        {isLoading && <Text>...読み込み中</Text>}
        {errorMessage && <Text>{errorMessage}</Text>}
        <CreateTrainingMenuModal
          mode="edit"
          addExercises={trainingMenu.exercises}
          tabId={trainingMenu.tabId}
          triggerLabel={"トレーニングメニューを編集"}
        />
      </HStack>
      <Box mb={4}>
        <Timer
          trainingMenu={trainingMenu}
          startworkout={startworkout}
          endWorkout={endWorkout}
        />
      </Box>

      <ExerciseListBypart
        exercises={trainingMenu.exercises}
        mode="workout"
        toggleCompleted={toggleCompleted}
        exerciseRecords={exerciseRecords}
      />
    </>
  );
};
