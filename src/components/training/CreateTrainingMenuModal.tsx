import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { TrainingMenuInput } from "./TrainingMenuInput";
import { useTrainingMenuContext } from "../../context/TrainingMenuContext";
import type { NewExercise } from "../../types/NewExercise";

type Props = {
  tabId: string;
  triggerLabel: string;
  addExercises?: NewExercise[];
  mode: "edit" | "create";
  menuTitle?: string;
};

export const CreateTrainingMenuModal = (props: Props) => {
  const { createTrainingMenu, onUpdateMenu } = useTrainingMenuContext();
  const {
    tabId,
    triggerLabel,
    addExercises,
    mode,
    menuTitle: initialMenuTitle,
  } = props;
  const [isOpen, setIsOpen] = useState(false);
  const [menuTitle, setMenuTitle] = useState<string>(initialMenuTitle ?? "");
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

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      size="cover"
      placement="center"
      motionPreset="slide-in-bottom"
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          {triggerLabel}
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{triggerLabel}</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body overflowY="auto">
              <TrainingMenuInput
                addExercises={addExercises}
                onSave={onSave}
                menuTitle={menuTitle}
                setMenuTitle={setMenuTitle}
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
