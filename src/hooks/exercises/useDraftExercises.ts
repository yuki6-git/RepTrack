import { useState } from "react";
import type { NewExercise } from "../../types/NewExercise";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  setDraftExercises: Dispatch<SetStateAction<NewExercise[]>>;
  setForm: Dispatch<SetStateAction<NewExercise>>;
  initialForm: NewExercise;
};

export const useDraftExercises = (props: Props) => {
  const { setDraftExercises, setForm, initialForm } = props;

  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(
    null,
  );

  const onClickDeleteExercise = (id: string) => {
    setDraftExercises((prev) => prev.filter((exercise) => exercise.id !== id));

    if (editingExerciseId === id) {
      setEditingExerciseId(null);
      setForm(initialForm);
    }
  };

  const onClickEditExercise = (exercise: NewExercise) => {
    setDraftExercises((prev) =>
      prev.filter((Exercise) => Exercise.id !== exercise.id),
    );
    setEditingExerciseId(exercise.id);
    setForm(exercise);
  };

  return {
    onClickEditExercise,
    onClickDeleteExercise,
  };
};
