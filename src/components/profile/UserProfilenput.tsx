import { Text, Input, Button, Flex } from "@chakra-ui/react";
import type { Profile } from "../../types/profile";
import type { Dispatch, SetStateAction } from "react";
import { GenderSelect } from "./GenderSelect";

type UserProfileModalProps = {
  profile: Profile;
  setProfile: Dispatch<SetStateAction<Profile>>;
};

export const UserProfileForm = (props: UserProfileModalProps) => {
  const { profile, setProfile } = props;
  return (
    <>
      <Text>ユーザー名</Text>
      <Input
        value={profile.username}
        onChange={(e) =>
          setProfile({
            ...profile,
            username: e.target.value,
          })
        }
      />
      <Text>メールアドレス</Text>
      <Input
        value={profile.email}
        onChange={(e) =>
          setProfile({
            ...profile,
            email: e.target.value,
          })
        }
      />
      <Text>性別</Text>
      <GenderSelect
        value={profile.gender}
        onChange={(gender) =>
          setProfile({
            ...profile,
            gender,
          })
        }
      />

      <Text>生年月日</Text>
      <Input
        type="date"
        defaultValue={"1998-04-15"}
        value={profile.birthday}
        onChange={(e) =>
          setProfile({
            ...profile,
            birthday: e.target.value,
          })
        }
      />
      <Flex justifyContent="end">
        <Button mt={4}>保存</Button>
      </Flex>
      
    </>
  );
};
