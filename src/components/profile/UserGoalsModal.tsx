import { Dialog, Button, Portal, CloseButton } from "@chakra-ui/react";
import { UserGoalsForm } from "./UserGoalsForm";
import type { Dispatch, SetStateAction } from "react";
import type { UserGoals } from "../../types/UserGoals";

type UserGoalsModalProps = {
  userGoals: UserGoals;
  setUserGoals: Dispatch<SetStateAction<UserGoals>>;
};

export const UserGoalsModal = (props: UserGoalsModalProps) => {
  const { userGoals, setUserGoals } = props;
  return (
    <Dialog.Root size="md" placement="top" motionPreset="slide-in-bottom">
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          目標を編集
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>目標を編集</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body overflowY="auto">
              <UserGoalsForm
                userGoals={userGoals}
                setUserGoals={setUserGoals}
              />
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
