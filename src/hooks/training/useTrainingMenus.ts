import {
  fetchTrainingMenuExerciseRows,
  fetchTrainingMenuRows,
  insertTrainingMenu,
  insertTrainingMenuExercises,
  replaceTrainingMenuExercises,
  updateTrainingMenuTitle,
} from "../../api/trainingMenuApi";
import { useCallback, useEffect, useState } from "react";
import { getCurrentUserId } from "../../api/authApi";
import type { TrainingMenu } from "../../types/TrainingMenu";
import type { NewExercise } from "../../types/NewExercise";

export const useTrainingMenus = () => {
  const [trainingMenus, setTrainingMenus] = useState<TrainingMenu[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchTrainingMenus = useCallback(async () => {
    setIsLoading(true);
    setError("");

    const { data: menus, error: menusError } = await fetchTrainingMenuRows();
    const { data: exerciseRows, error: exerciseRowsError } =
      await fetchTrainingMenuExerciseRows();

    if (menusError || exerciseRowsError) {
      setError(menusError?.message ?? exerciseRowsError?.message ?? "");
      setIsLoading(false);
      return;
    }

    const menusWithExercises = (menus ?? []).map((menu) => {
      const exercises = (exerciseRows ?? [])
        .filter((exercise) => exercise.training_menu_id === menu.id)
        .map((exercise) => ({
          id: exercise.id,
          tabId: menu.tab_id,
          part: exercise.part,
          exerciseName: exercise.exercise_name,
          maxWeight:
            exercise.max_weight === null ? "" : String(exercise.max_weight),
          setWeight: String(exercise.set_weight),
          sets: String(exercise.sets),
          reps: String(exercise.reps),
        }));

      return {
        id: menu.id,
        userId: menu.user_id,
        tabId: menu.tab_id,
        title: menu.title,
        createdAt: menu.created_at,
        exercises,
      };
    });

    setTrainingMenus(menusWithExercises);
    setIsLoading(false);
  }, []);

  const createTrainingMenu = useCallback(
    async (tabId: string, menuTitle: string, draftExercises: NewExercise[]) => {
      setIsLoading(true);
      setError("");

      const userId = await getCurrentUserId();

      if (!userId) {
        setError("ユーザー情報がありません");
        setIsLoading(false);
        return false;
      }

      if (draftExercises.length === 0) {
        setError("種目を1件以上追加してください");
        setIsLoading(false);
        return false;
      }

      const { data: menu, error: menuError } = await insertTrainingMenu(
        tabId,
        menuTitle,
        userId,
      );

      if (menuError || !menu) {
        setError(menuError?.message ?? "メニューの保存に失敗しました");
        setIsLoading(false);
        return false;
      }

      const { error: exercisesError } = await insertTrainingMenuExercises(
        menu.id,
        draftExercises,
      );

      if (exercisesError) {
        setError(exercisesError.message);
        setIsLoading(false);
        return false;
      }

      await fetchTrainingMenus();
      setIsLoading(false);
      return true;
    },
    [fetchTrainingMenus],
  );
  useEffect(() => {
    fetchTrainingMenus();
  }, [fetchTrainingMenus]);

  const onToggleComplete = useCallback((id: string) => {
    setTrainingMenus((prev) =>
      prev.map((menu) => ({
        ...menu,
        exercises: menu.exercises.map((exercise) =>
          exercise.id === id
            ? {
                ...exercise,
                completed: !exercise.completed,
              }
            : exercise,
        ),
      })),
    );
  }, []);

  const onUpdateMenu = useCallback(
    async (tabId: string, menuTitle: string, exercises: NewExercise[]) => {
      setIsLoading(true);
      setError("");

      const targetMenu = trainingMenus.find((menu) => menu.tabId === tabId);

      if (!targetMenu) {
        setError("更新するメニューが見つかりません");
        setIsLoading(false);
        return false;
      }

      const { error: replaceExerciseError } =
        await replaceTrainingMenuExercises(targetMenu.id, exercises);

      if (replaceExerciseError) {
        setError(replaceExerciseError.message);
        setIsLoading(false);
        return false;
      }
      const { error: titleError } = await updateTrainingMenuTitle(
        targetMenu.id,
        menuTitle,
      );

      if (titleError) {
        setError(titleError.message);
        setIsLoading(false);
        return false;
      }

      await fetchTrainingMenus();
      setIsLoading(false);
      return true;
    },
    [trainingMenus, fetchTrainingMenus],
  );

  return {
    trainingMenus,
    isLoading,
    error,
    createTrainingMenu,
    onToggleComplete,
    onUpdateMenu,
  };
};
