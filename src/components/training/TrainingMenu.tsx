import { Text, HStack, Spacer } from "@chakra-ui/react";
import type { TrainingMenus } from "../../types/TrainingMenu";
import type { NewExercise } from "../../types/NewExercise";
import { ExerciseListBypart } from "./ExerciseListByPart";
import { CreateTrainingMenuModal } from "./CreateTrainingMenuModal";

type Props = {
  trainingMenu: TrainingMenus;
  setTrainingMenus:React.Dispatch<React.SetStateAction<TrainingMenus[]>>;
  onToggleComplete: (exerciseId: string) => void;
};

export const TrainingMenu = (props: Props) => {
  const { trainingMenu, setTrainingMenus, onToggleComplete } = props;
  const onUpdateMenu = (tabId: string, exercises: NewExercise[]) => {
    setTrainingMenus((prev) =>
      prev.map((menu) =>
        menu.tabId === tabId
          ? {
              ...menu,
              exercises,
            }
          : menu,
      ),
    );
  };

  return (
    <>
      <HStack my={4}>
        <Text fontWeight="bold">今日の筋トレメニュー</Text>
        <Spacer />
        <CreateTrainingMenuModal
          onSaveMenu={onUpdateMenu}
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
