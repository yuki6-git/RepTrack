import { Button, CloseButton, Dialog, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { MenuBasicStep } from "./MenuBasicStep";
import { ExerciseInputStep } from "./ExerciseInputStep";
import { useTrainingMenuContext } from "../../context/TrainingMenuContext";
import type { NewExercise } from "../../types/NewExercise";
import { useTrainingMenuInput } from "../../hooks/training/useTrainingMenuInput";

type Props = {
  tabId: string;
  triggerLabel: string;
  addExercises?: NewExercise[];
  mode: "edit" | "create";
  menuTitle?: string;
};

export const CreateTrainingMenuModal = (props: Props) => {
  const { tabId, triggerLabel, addExercises, mode } = props;
  const [step, setStep] = useState(1);
  const [menuTitle, setMenuTitle] = useState("");
  const [selectedParts, setSelectedParts] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { createTrainingMenu, onUpdateMenu } = useTrainingMenuContext();
  const onSave = async (exercises: NewExercise[]) => {
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
  };

  const { onClickSaveMenu, form, setForm } = useTrainingMenuInput({
    onSave,
    addExercises,
  });
  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      placement="center"
      size="lg"
      scrollBehavior="inside"
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          開く
        </Button>
      </Dialog.Trigger>
      <Dialog.Content>
        <Dialog.Header>
          <Dialog.Title>
            {step === 1 ? "トレーニングメニューを作成" : "種目追加"}
          </Dialog.Title>
          <Dialog.CloseTrigger asChild>
            <CloseButton size="sm" />
          </Dialog.CloseTrigger>
        </Dialog.Header>

        <Dialog.Body>
          {step === 1 && (
            <MenuBasicStep
              menuTitle={menuTitle}
              setMenuTitle={setMenuTitle}
              selectedParts={selectedParts}
              setSelectedParts={setSelectedParts}
            />
          )}

          {step === 2 && (
            <ExerciseInputStep
              selectedParts={selectedParts}
              form={form}
              setForm={setForm}
            />
          )}
        </Dialog.Body>

        <Dialog.Footer>
          {step === 1 && <Button onClick={() => setStep(2)}>次へ →</Button>}

          {step === 2 && (
            <Flex w="100%" justify="space-between">
              <Button variant="outline" onClick={() => setStep(1)}>
                ← 戻る
              </Button>

              <Button onClick={onClickSaveMenu}>保存</Button>
            </Flex>
          )}
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};
