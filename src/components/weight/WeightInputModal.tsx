import { Dialog, Button, Portal, CloseButton } from "@chakra-ui/react";
import type { Dispatch, SetStateAction } from "react";
import { WeightInput } from "./WeightInput";
type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  onSaveWeight: (weight: string, bodyFat: string) => Promise<void>;
  latestWeight: string;
  latestBodyFat: string;
};

export const WeightInputModal = (props: Props) => {
  const { open, setOpen, onSaveWeight, latestWeight, latestBodyFat } = props;

  return (
    <Dialog.Root
      size="md"
      placement="top"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          体重を記録する
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>最新の記録</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body overflowY="auto">
              <WeightInput
                open={open}
                latestWeight={latestWeight}
                latestBodyFat={latestBodyFat}
                onSaveWeight={onSaveWeight}
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
