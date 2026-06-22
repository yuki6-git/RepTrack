import { Dialog, Portal, VStack, Flex, Text, Button } from "@chakra-ui/react";
import type { WorkoutLog } from "../../types/Workout";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLog: WorkoutLog | undefined;
};

export const WorkoutModal = (props: Props) => {
  const { isOpen, setIsOpen, selectedLog } = props;
  return (
    <Dialog.Root open={isOpen} onOpenChange={(e) => setIsOpen(e.open)}>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content maxW="560px">
            <Dialog.Header>
              <Dialog.Title>
                {selectedLog?.date} {selectedLog?.title}
              </Dialog.Title>
            </Dialog.Header>

            <Dialog.Body>
              <VStack align="stretch" gap="16px">
                <Flex justify="space-between">
                  <Text fontWeight="bold">開始〜終了</Text>
                  <Text>
                    {selectedLog?.start} 〜 {selectedLog?.end}
                  </Text>
                </Flex>

                <Flex justify="space-between">
                  <Text fontWeight="bold">総時間</Text>
                  <Text>{selectedLog?.duration}</Text>
                </Flex>
                {selectedLog?.records.map((record) => (
                  <Flex justify="space-between">
                    <Text fontWeight="bold">部位</Text>
                    <Text>{record?.part}</Text>
                  </Flex>
                ))}
              </VStack>
            </Dialog.Body>
            <Dialog.CloseTrigger asChild>
              <Button variant="ghost">×</Button>
            </Dialog.CloseTrigger>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
