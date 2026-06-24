import {
  Text,
  Input,
  NumberInput,
  SegmentGroup,
  Field,
  NativeSelect,
} from "@chakra-ui/react";
import { GenderSelect } from "./GenderSelect";
import type { UserProfileSettingForm } from "../../types/UserInfoForm";

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

      <Text>生年月日</Text>
      <Input
        type="date"
        value={form.birthday}
        onChange={(e) => onChangeForm("birthday", e.target.value)}
      />

      <Text>身長</Text>
      <NumberInput.Root
        value={String(form.height)}
        min={0}
        step={1}
        onValueChange={(e) => onChangeForm("height", e.value)}
      >
        <NumberInput.Input />
      </NumberInput.Root>

      <Field.Root>
        <Field.Label>目標タイプ</Field.Label>
        <SegmentGroup.Root
          size="md"
          width="100%"
          css={{
            "& [data-part=item]": {
              flex: 1,
              justifyContent: "center",
            },
          }}
          value={form.goalType}
          onValueChange={(e) => onChangeForm("goalType", e.value ?? "")}
        >
          <SegmentGroup.Indicator />
          <SegmentGroup.Items items={["増量", "減量", "維持"]} />
        </SegmentGroup.Root>
      </Field.Root>

      <Field.Root>
        <Field.Label>活動レベル</Field.Label>
        <NativeSelect.Root>
          <NativeSelect.Field
            value={form.activityLevel}
            onChange={(e) => onChangeForm("activityLevel", e.target.value)}
          >
            <option value="">選択してください</option>
            <option value="low">ほぼ運動しない</option>
            <option value="light">軽い運動</option>
            <option value="normal">週3〜5回運動</option>
            <option value="high">週6回以上運動</option>
          </NativeSelect.Field>
          <NativeSelect.Indicator />
        </NativeSelect.Root>
      </Field.Root>
    </>
  );
};
