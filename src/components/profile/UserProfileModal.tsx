import { Button, CloseButton, Dialog, Portal } from "@chakra-ui/react";
import { UserProfileForm } from "./UserProfileForm";
import type { Profile } from "../../types/profile";
import type { Dispatch, SetStateAction } from "react";


type UserProfileModalProps = {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
};

export const UserProfileModal = (props:UserProfileModalProps) => {
    const { profile, setProfile} = props
  return (
    <Dialog.Root size="lg" placement="top" motionPreset="slide-in-bottom">
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
              <UserProfileForm profile={profile} setProfile={setProfile}/>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
};
