import { Dialog, Button, Portal, CloseButton } from "@chakra-ui/react";
import { WeightInput } from "./WeightInput";

type Props = {
  latestWeight: string;
  latestBodyFat: string;
  createWeightRecord: (params: {
    weight: number;
    bodyFat: number;
  }) => Promise<void>;
};

export const WeightInputModal = (props: Props) => {
  const { latestWeight, latestBodyFat, createWeightRecord } = props;
  return (
    <Dialog.Root size="md" placement="top" motionPreset="slide-in-bottom">
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
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
