import { Dialog, Portal, VStack, Flex, Text, Button } from "@chakra-ui/react";
import type { WorkoutLog } from "../../types/Workout";
import { formatTime } from "../../utils/formatTime";
import { formatDurationMinutes } from "../../utils/formatDurationMinutes";

type Props = {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedLog: WorkoutLog | undefined;
};

export const WorkoutModal = (props: Props) => {
  const { isOpen, setIsOpen, selectedLog } = props;

  const trainedParts = Array.from(
    new Set(selectedLog?.records.map((record) => record.part) ?? []),
  );

  const startTIme = selectedLog?.start ?? null;
  const endTime = selectedLog?.end ?? null;
  const duration = selectedLog?.duration ?? null;
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
                    {formatTime(startTIme)} 〜 {formatTime(endTime)}
                  </Text>
                </Flex>

                <Flex justify="space-between">
                  <Text fontWeight="bold">総時間</Text>
                  <Text>{formatDurationMinutes(duration)}</Text>
                </Flex>
                <Flex justify="space-between">
                  <Text fontWeight="bold" mr={4}>
                    部位
                  </Text>

                  <Text>{trainedParts.join(" / ")}</Text>
                </Flex>
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
