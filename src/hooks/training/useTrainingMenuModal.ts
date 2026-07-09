import { useCallback, useEffect, useState } from "react";
import type { NewExercise } from "../../types/NewExercise";
import { useTrainingMenuContext } from "../../context/TrainingMenuContext";
import { useEditExercises } from "./useEditExercises";

type Props = {
  mode: "edit" | "create";
  tabId: string;
  initialMenuTitle: string | undefined;
  addExercises: NewExercise[] | undefined;
};
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
export const useTrainingMenuModal = (props: Props) => {
  const { mode, tabId, initialMenuTitle, addExercises } = props;
  const [step, setStep] = useState(1);
  const [menuTitle, setMenuTitle] = useState(initialMenuTitle ?? "");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState(initialForm);
  const [validationMessage, setValidationMessage] = useState("");
  const [draftExercises, setDraftExercises] = useState<NewExercise[]>(
    addExercises ?? [],
  );

  const { createTrainingMenu, onUpdateMenu } = useTrainingMenuContext();

  const onSave = useCallback(
    async (exercises: NewExercise[]) => {
      let isSaved = false;

      if (mode === "create") {
        isSaved = await createTrainingMenu(tabId, menuTitle, exercises);
      }
      if (mode === "edit") {
        isSaved = await onUpdateMenu(tabId, menuTitle, exercises);
      }

      if (isSaved) {
        setIsOpen(false);
      }
    },
    [mode, tabId, menuTitle, createTrainingMenu, onUpdateMenu],
  );

  useEffect(() => {
    if (!addExercises) return;

    const trainingPartsSet = new Set(
      addExercises.map((exercise) => exercise.part),
    );
    const trainingParts = [...trainingPartsSet];

    setSelectedParts(trainingParts);
  }, [addExercises]);

  const onClickAddExercise = useCallback((form: NewExercise, part: string) => {
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
  }, []);

  const { onClickEditExercise, onClickDeleteExercise } = useEditExercises({
    setDraftExercises,
    setForm,
    initialForm,
  });

  const onClickSaveMenu = useCallback(() => {
    setIsLoading(true);

    if (draftExercises.length === 0) {
      setValidationMessage("種目を1件以上追加してください");
      setIsLoading(false);
      return;
    }

    onSave(draftExercises);
    setStep(1);
    setIsLoading(false);
  }, [draftExercises, onSave]);

  return {
    onSave,
    isLoading,
    setIsLoading,
    step,
    setStep,
    isOpen,
    setIsOpen,
    menuTitle,
    setMenuTitle,
    selectedParts,
    setSelectedParts,
    form,
    setForm,
    validationMessage,
    draftExercises,
    setDraftExercises,
    onClickAddExercise,
    onClickEditExercise,
    onClickDeleteExercise,
    onClickSaveMenu,
  };
};
