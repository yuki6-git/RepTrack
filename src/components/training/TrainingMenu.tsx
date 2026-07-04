import { Text, HStack, Spacer, Box } from "@chakra-ui/react";
import type { TrainingMenu as TrainingMenuType } from "../../types/TrainingMenu";
import { ExerciseListByPart } from "./ExerciseListByPart";
import { TrainingTimer } from "./TrainingTimer";
import { useWorkoutSession } from "../../hooks/workout/useWorkoutSession";
import { CreateTrainingMenuModal } from "./CreateTrainingMenuModal";

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
        <Text fontWeight="bold">
          {trainingMenu.title ?? "トレーニングメニュー"}
        </Text>
        <Spacer />
        {isLoading && <Text>...読み込み中</Text>}
        {errorMessage && <Text color="red">{errorMessage}</Text>}
        <CreateTrainingMenuModal
          mode="edit"
          addExercises={trainingMenu.exercises}
          tabId={trainingMenu.tabId}
          triggerLabel={"トレーニングメニューを編集"}
          menuTitle={trainingMenu.title}
        />
      </HStack>
      <Box mb={4}>
        <TrainingTimer
          trainingMenu={trainingMenu}
          startworkout={startworkout}
          endWorkout={endWorkout}
        />
      </Box>

      <ExerciseListByPart
        exercises={trainingMenu.exercises}
        mode="workout"
        toggleCompleted={toggleCompleted}
        exerciseRecords={exerciseRecords}
      />
    </>
  );
};
