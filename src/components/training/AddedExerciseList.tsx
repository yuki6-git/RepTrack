import { useState } from "react";
import type { NewExercise } from "../../types/NewExercise";
import type { Dispatch, SetStateAction } from "react";
import { ExerciseListBypart } from "./ExerciseListByPart";

type Props = {
  draftExercises: NewExercise[];
  setDraftExercises: Dispatch<SetStateAction<NewExercise[]>>;
  initialForm: NewExercise;
  setForm: Dispatch<SetStateAction<NewExercise>>;
};

export const AddedExerciseList = (props: Props) => {
  const { draftExercises, setDraftExercises, setForm, initialForm } = props;

  const [editingExerciseId, setEditingExerciseId] = useState<string | null>(
    null,
  );

  const onClickDeleteExercise = (id: string) => {
    setDraftExercises((prev) => prev.filter((Exercise) => Exercise.id !== id));

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

  return (
    <ExerciseListBypart
      onClickEditExercise={onClickEditExercise}
      onClickDeleteExercise={onClickDeleteExercise}
      exercises={draftExercises}
      mode="draft"
    />
  );
};
