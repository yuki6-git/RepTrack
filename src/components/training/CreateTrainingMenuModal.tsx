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
};

export const CreateTrainingMenuModal = (props: Props) => {
  const { createTrainingMenu, onUpdateMenu } = useTrainingMenuContext();
  const { tabId, triggerLabel, addExercises, mode } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onSave = async (exercises: NewExercise[]) => {
    let isSaved = false;

    if (mode === "create") {
      isSaved = await createTrainingMenu(tabId, exercises);
    } else {
      isSaved = await onUpdateMenu(tabId, exercises);
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
              <TrainingMenuInput addExercises={addExercises} onSave={onSave} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
