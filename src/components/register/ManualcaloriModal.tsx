import {
  Dialog,
  Button,
  Portal,
  NumberInput,
  InputGroup,
} from "@chakra-ui/react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  manualTargetCalories: string;
  setManualTargetCalories: Dispatch<SetStateAction<string>>;
  setIsManualCalories: Dispatch<SetStateAction<boolean>>;
};

export const ManualCaloriModal = (props: Props) => {
  const { manualTargetCalories, setManualTargetCalories, setIsManualCalories } =
    props;
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root size="sm" open={open} onOpenChange={(e) => setOpen(e.open)}>
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          自分で入力する
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.CloseTrigger />
            <Dialog.Header>
              <Dialog.Title>目標カロリー</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>
              <NumberInput.Root
                value={manualTargetCalories}
                onValueChange={(e) => setManualTargetCalories(e.value)}
              >
                <InputGroup endElement="kcal">
                  <NumberInput.Input />
                </InputGroup>
              </NumberInput.Root>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button
                  onClick={() => {
                    setIsManualCalories(false);
                    setManualTargetCalories("");
                  }}
                  variant="outline"
                >
                  キャンセル
                </Button>
              </Dialog.ActionTrigger>
              <Button
                onClick={() => {
                  setIsManualCalories(true);
                  setOpen(false);
                }}
              >
                保存
              </Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
