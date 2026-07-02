import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { WeightRecordTable } from "./WeightRecordTable";
import type { WeightTableData } from "../../types/WeightData";

type Props = {
  weightRecord: WeightTableData[];
};
export const AllWeightRecordModal = (props: Props) => {
  const { weightRecord } = props;
  return (
    <Dialog.Root
      size="cover"
      placement="center"
      scrollBehavior="inside"
      motionPreset="slide-in-bottom"
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm" my={2}>
          全て見る
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>全ての体重記録</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body>
              <WeightRecordTable weightRecord={weightRecord} />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
