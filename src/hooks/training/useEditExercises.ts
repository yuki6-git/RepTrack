import { useCallback, useState } from "react";
import type { NewExercise } from "../../types/NewExercise";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  setDraftExercises: Dispatch<SetStateAction<NewExercise[]>>;
  setForm: Dispatch<SetStateAction<NewExercise>>;
  initialForm: NewExercise;
};

export const useEditExercises = (props: Props) => {
  const { setDraftExercises, setForm, initialForm } = props;

  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(
    null,
  );

  const onClickDeleteExercise = useCallback(
    (id: string) => {
      setDraftExercises((prev) =>
        prev.filter((exercise) => exercise.id !== id),
      );

      if (editingExerciseId === id) {
        setEditingExerciseId(null);
        setForm(initialForm);
      }
    },
    [editingExerciseId, initialForm, setDraftExercises, setForm],
  );

  const onClickEditExercise = useCallback(
    (exercise: NewExercise) => {
      setDraftExercises((prev) =>
        prev.filter((Exercise) => Exercise.id !== exercise.id),
      );
      setEditingExerciseId(exercise.id);
      setForm(exercise);
    },
    [setDraftExercises, setForm],
  );

  return {
    onClickEditExercise,
    onClickDeleteExercise,
  };
};
