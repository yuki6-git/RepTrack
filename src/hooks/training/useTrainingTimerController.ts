import type { NewExercise } from "../../types/NewExercise";
import { useWorkoutTimer } from "./useWorkoutTimer";
import type { TrainingMenu } from "../../types/TrainingMenu";

type Props = {
  trainingMenu: TrainingMenu;
  startworkout: (
    trainingMenuId: string,
    exercises: NewExercise[],
  ) => Promise<boolean>;
  endWorkout: (duration: number) => Promise<boolean>;
};

export const useTrainingTimerController = (props: Props) => {
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
    const elapsedMinutes = Math.ceil(elapsedSeconds / 60);
    const isEnded = await endWorkout(elapsedMinutes);
    if (!isEnded) {
      return;
    }
    stopTimer();
  };

  const onClickRestart = () => {
    resetTimer();
  };

  return {
    formattedTime,
    isRunning,
    onClickTimer,
    onClickRestart,
  };
};
