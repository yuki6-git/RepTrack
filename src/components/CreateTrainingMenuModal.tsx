import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { useState } from "react";
import { TrainingMenuInput } from "./TrainingMenuInput";
import type { NewExercise } from "../types/NewxExercise";

type Props = {
  tabId: string;
  onSaveMenu: (tabId: string, exercises: NewExercise[]) => void;
  triggerLabel: string;
  addExercises?: NewExercise[];
};

export const CreateTrainingMenuModal = (props: Props) => {
  const { tabId, onSaveMenu, triggerLabel, addExercises } = props;
  const [isOpen, setIsOpen] = useState(false);

  const onClickSave = (tabId: string, exercises: NewExercise[]) => {
    onSaveMenu(tabId, exercises);
    setIsOpen(false);
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
                onCreateMenu={onClickSave}
                tabId={tabId}
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
