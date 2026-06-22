import { Dialog, Button, Portal, CloseButton } from "@chakra-ui/react";
import { useState } from "react";
import { WeightInput } from "./WeightInput";

type Props = {
  latestWeight: string;
  latestBodyFat: string;
  createWeightRecord: (params: {
    weight: string;
    bodyFat: string;
  }) => Promise<void>;
};

export const WeightInputModal = (props: Props) => {
  const { latestWeight, latestBodyFat, createWeightRecord } = props;
  const [open, setOpen] = useState(false);
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
                latestWeight={latestWeight}
                latestBodyFat={latestBodyFat}
                createWeightRecord={createWeightRecord}
                setOpen={setOpen}
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
