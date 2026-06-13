import { Text, HStack, Spacer } from "@chakra-ui/react";
import type { TrainingMenu as TrainingMenuType } from "../../types/TrainingMenu";
import type { NewExercise } from "../../types/NewExercise";
import { ExerciseListBypart } from "./ExerciseListByPart";
import { CreateTrainingMenuModal } from "./CreateTrainingMenuModal";

type Props = {
  trainingMenu: TrainingMenuType;
  onToggleComplete: (exerciseId: string) => void;
  onUpdateMenu: (tabId: string, exercises: NewExercise[]) => void;
};

export const TrainingMenu = (props: Props) => {
  const { trainingMenu, onToggleComplete, onUpdateMenu } = props;

  return (
    <>
      <HStack my={4}>
        <Text fontWeight="bold">今日の筋トレメニュー</Text>
        <Spacer />
        <CreateTrainingMenuModal
          createTrainingMenu={onUpdateMenu}
          addExercises={trainingMenu.exercises}
          tabId={trainingMenu.tabId}
          triggerLabel={"トレーニングメニューを編集"}
        />
      </HStack>

      <ExerciseListBypart
        exercises={trainingMenu.exercises}
        mode="workout"
        onToggleComplete={onToggleComplete}
      />
    </>
  );
};
