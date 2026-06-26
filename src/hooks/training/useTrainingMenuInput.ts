import { useState } from "react";
import type { NewExercise } from "../../types/NewExercise";
import { useEditExercises } from "./useEditExercises";

export const useTrainingMenuInput = ({
  onSave,
  addExercises,
}: {
  onSave: (exercises: NewExercise[]) => void;
  addExercises?: NewExercise[];
}) => {
  const initialForm: NewExercise = {
    id: "",
    tabId: "",
    part: "",
    exerciseName: "",
    maxWeight: "",
    setWeight: "",
    sets: "",
    reps: "",
  };
  const [form, setForm] = useState(initialForm);
  const [validationMessage, setValidationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [draftExercises, setDraftExercises] = useState<NewExercise[]>(
    addExercises ?? [],
  );

  const onClickAddExercise = (form: NewExercise, part: string) => {
    const hasRequiredValues =
      part.trim() !== "" &&
      form.exerciseName.trim() !== "" &&
      form.setWeight.trim() !== "" &&
      form.sets.trim() !== "" &&
      form.reps.trim() !== "";
    if (!hasRequiredValues) {
      setValidationMessage("必須項目を入力してください");
      return;
    }
    const newExercise: NewExercise = {
      id: crypto.randomUUID(),
      tabId: "",
      part,
      exerciseName: form.exerciseName,
      maxWeight: form.maxWeight,
      setWeight: form.setWeight,
      sets: form.sets,
      reps: form.reps,
    };

    setDraftExercises((prev) => [...prev, newExercise]);
    setForm(initialForm);
    setValidationMessage("");
  };
  const onClickSaveMenu = () => {
    setIsLoading(true);

    if (draftExercises.length === 0) {
      setValidationMessage("種目を1件以上追加してください");
      setIsLoading(false);
      return;
    }

    onSave(draftExercises);
    setIsLoading(false);
  };
  const { onClickEditExercise, onClickDeleteExercise } = useEditExercises({
    setDraftExercises,
    setForm,
    initialForm,
  });

  return {
    onClickDeleteExercise,
    onClickEditExercise,
    onClickSaveMenu,
    onClickAddExercise,
    validationMessage,
    draftExercises,
    isLoading,
    form,
    setForm,
  };
};
