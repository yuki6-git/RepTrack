import { Text, Input, NumberInput } from "@chakra-ui/react";
import { GenderSelect } from "./GenderSelect";
import type { UserProfileSettingForm } from "../../types/UserInfo";

type Props = {
  form: UserProfileSettingForm;
  onChangeForm: (name: keyof UserProfileSettingForm, value: string) => void;
};

export const UserProfileInput = (props: Props) => {
  const { form, onChangeForm } = props;
  return (
    <>
      <Text>ユーザー名</Text>
      <Input
        value={form.username}
        onChange={(e) => onChangeForm("username", e.target.value)}
      />
      <Text>メールアドレス</Text>
      <Input
        value={form.email}
        onChange={(e) => onChangeForm("email", e.target.value)}
      />
      <Text>性別</Text>
      <GenderSelect value={form.gender} onChange={onChangeForm} />

      <Text>身長</Text>
      <NumberInput.Root
        value={String(form.height)}
        min={0}
        step={1}
        onValueChange={(e) => onChangeForm("height", e.value)}
      >
        <NumberInput.Input />
      </NumberInput.Root>

      <Text>生年月日</Text>
      <Input
        type="date"
        defaultValue={"1998-04-15"}
        value={form.birthday}
        onChange={(e) => onChangeForm("birthday", e.target.value)}
      />
    </>
  );
};
