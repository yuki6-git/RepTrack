import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title: string;
};

export const DetailModal = (props: Props) => {
  const { children, title } = props;
  return (
    <Dialog.Root size="full" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button mt="auto" width="100%" variant="outline">
          詳しく見る
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>{title}</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body>{children}</Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">閉じる</Button>
              </Dialog.ActionTrigger>
            </Dialog.Footer>
            <Dialog.CloseTrigger asChild>
              <CloseButton size="sm" />
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
