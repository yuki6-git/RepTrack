import { Text, HStack, Spacer } from "@chakra-ui/react";
import type { TrainingMenu as TrainingMenuType } from "../../types/TrainingMenu";
import { ExerciseListBypart } from "./ExerciseListByPart";
import { CreateTrainingMenuModal } from "./CreateTrainingMenuModal";

type Props = {
  trainingMenu: TrainingMenuType;
};

export const TrainingMenu = (props: Props) => {
  const { trainingMenu } = props;

  return (
    <>
      <HStack my={4}>
        <Text fontWeight="bold">今日の筋トレメニュー</Text>
        <Spacer />
        <CreateTrainingMenuModal
          mode="edit"
          addExercises={trainingMenu.exercises}
          tabId={trainingMenu.tabId}
          triggerLabel={"トレーニングメニューを編集"}
        />
      </HStack>

      <ExerciseListBypart exercises={trainingMenu.exercises} mode="workout" />
    </>
  );
};
