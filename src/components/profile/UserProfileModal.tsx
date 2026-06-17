import { Button, CloseButton, Dialog, Portal, Flex } from "@chakra-ui/react";
import { useState } from "react";
import { UserProfileInput } from "./UserProfilenput";
import type { ProfileSetting, UserInfo } from "../../types/ProfileSetting";
import type { UserProfileSettingForm } from "../../types/UserInfoForm";

type Props = {
  userInfo: UserInfo | null;
  profileSetting: ProfileSetting | null;
  onSave: (form: UserProfileSettingForm) => Promise<boolean>;
};

export const UserProfileModal = (props: Props) => {
  const { userInfo, profileSetting, onSave } = props;

  const [form, setForm] = useState<UserProfileSettingForm>({
    username: userInfo?.username ?? "",
    email: userInfo?.email ?? "",
    gender: profileSetting?.gender ?? "",
    birthday: profileSetting?.birthday ?? "",
    height: String(profileSetting?.height ?? ""),
    activityLevel: profileSetting?.activity_level ?? "",
    goalType: profileSetting?.goal_type ?? "",
  });

  const onChangeForm = (name: keyof UserProfileSettingForm, value: string) => {
    setForm({
      ...form,
      [name]: value,
    });
  };

  const onClickSave = async () => {
    await onSave(form);
  };
  const [open, setOpen] = useState(false);
  return (
    <Dialog.Root
      size="lg"
      placement="top"
      motionPreset="slide-in-bottom"
      open={open}
      onOpenChange={(e) => setOpen(e.open)}
    >
      <Dialog.Trigger asChild>
        <Button variant="outline" size="sm">
          プロフィールを編集
        </Button>
      </Dialog.Trigger>
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>プロフィールを編集</Dialog.Title>
              <Dialog.CloseTrigger asChild>
                <CloseButton size="sm" />
              </Dialog.CloseTrigger>
            </Dialog.Header>
            <Dialog.Body overflowY="auto">
              <UserProfileInput form={form} onChangeForm={onChangeForm} />
            </Dialog.Body>
            <Dialog.Footer>
              <Flex>
                <Dialog.ActionTrigger asChild>
                  <Button variant="outline">キャンセル</Button>
                </Dialog.ActionTrigger>

                <Button ml={4} onClick={onClickSave}>保存</Button>
              </Flex>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
