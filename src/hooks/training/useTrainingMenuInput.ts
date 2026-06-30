import { useCallback, useState } from "react";
import { useEditExercises } from "./useEditExercises";
import type { NewExercise } from "../../types/NewExercise";

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

  const onClickAddExercise = useCallback(
    (form: NewExercise, part: string) => {
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
    },
    [initialForm],
  );

  const onClickSaveMenu = useCallback(() => {
    setIsLoading(true);

    if (draftExercises.length === 0) {
      setValidationMessage("種目を1件以上追加してください");
      setIsLoading(false);
      return;
    }

    onSave(draftExercises);
    setIsLoading(false);
  }, [draftExercises, onSave]);

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
