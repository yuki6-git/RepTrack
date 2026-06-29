import { Dialog, Button, Portal, CloseButton } from "@chakra-ui/react";
import { UserGoalsInput } from "./UserGoalsInput";
import { useState } from "react";
import type { UserGoals } from "../../types/ProfileSetting";
import type { UserGoalsForm } from "../../types/UserInfoForm";

type Props = {
  userGoals: UserGoals | null;
  onSave: (form: UserGoalsForm) => Promise<boolean>;
};

export const UserGoalsModal = (props: Props) => {
  const { userGoals, onSave } = props;

  const [form, setForm] = useState<UserGoalsForm>({
    weeklyGoal: String(userGoals?.weekly_goal ?? ""),
    targetWeight: String(userGoals?.target_weight ?? ""),
    targetCalories: String(userGoals?.target_calories ?? ""),
  });

  const onChangeForm = (name: keyof UserGoalsForm, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };
  const [isOpen, setIsOpen] = useState(false);
  const onClickSave = async () => {
    await onSave(form);
  };

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(e) => setIsOpen(e.open)}
      size="md"
      placement="top"
      motionPreset="slide-in-bottom"
    >
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
              <UserGoalsInput form={form} onChangeForm={onChangeForm} />
            </Dialog.Body>
            <Dialog.Footer>
              <Button onClick={() => setIsOpen(false)} variant="outline">
                キャンセル
              </Button>

              <Button onClick={onClickSave}>保存</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
