import { useState } from "react";
import {
  insertWorkout,
  insertExerciseRecords,
  updateWorkoutEnd,
  updateExerciseRecordCompleted,
} from "../../api/workoutApi";
import type { ExerciseRecord, Workout } from "../../types/Workout";
import type { NewExercise } from "../../types/NewExercise";

export const useWorkoutSession = () => {
  const [workout, setWorkout] = useState<Workout | null>(null);
  const [exerciseRecords, setExerciseRecords] = useState<ExerciseRecord[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const startworkout = async (
    trainingMenuId: string,
    exercises: NewExercise[],
  ) => {
    setIsLoading(true);
    setErrorMessage("");

    const userId = localStorage.getItem("userId");

    if (!userId) {
      setErrorMessage("ユーザー情報がありません");
      setIsLoading(false);
      return false;
    }

    const { data: workoutData, error: workoutError } = await insertWorkout(
      userId,
      trainingMenuId,
    );
    if (workoutError || !workoutData) {
      setErrorMessage("トレーニングの開始に失敗しました");
      setIsLoading(false);
      return false;
    }

    const { data: recordData, error: recordError } =
      await insertExerciseRecords(workoutData.id, exercises);

    if (recordError) {
      setErrorMessage("種目記録の作成に失敗しました");
      setIsLoading(false);
      return false;
    }

    setWorkout(workoutData);
    setExerciseRecords(recordData ?? []);
    setIsLoading(false);

    return true;
  };

  const endWorkout = async (duration: number) => {
    if (!workout) {
      setErrorMessage("開始中のトレーニングがありません");
      return false;
    }

    const { error } = await updateWorkoutEnd(workout.id, duration);

    if (error) {
      setErrorMessage("トレーニング終了の保存に失敗しました");
      return false;
    }

    return true;
  };

  const toggleCompleted = async (trainingMenuExerciseId: string) => {
    if (!workout) {
      setErrorMessage("開始中のトレーニングがありません");
      return false;
    }

    const targetRecord = exerciseRecords.find(
      (record) => record.training_menu_exercise_id === trainingMenuExerciseId,
    );

    if (!targetRecord) {
      setErrorMessage("対象の種目記録がありません");
      return false;
    }

    const toggleExerciseComplete = !targetRecord.completed;

    const { error } = await updateExerciseRecordCompleted(
      workout.id,
      trainingMenuExerciseId,
      toggleExerciseComplete,
    );

    if (error) {
      setErrorMessage("完了状態の更新に失敗しました");
      return false;
    }

    setExerciseRecords((prev) =>
      prev.map((record) =>
        record.training_menu_exercise_id === trainingMenuExerciseId
          ? { ...record, completed: toggleExerciseComplete }
          : record,
      ),
    );

    return true;
  };

  return {
    isLoading,
    errorMessage,
    workout,
    exerciseRecords,
    startworkout,
    endWorkout,
    toggleCompleted,
  };
};
