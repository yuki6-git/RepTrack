import { NativeSelect } from "@chakra-ui/react";

type GenderSelectProps = {
  value: string;
  onChange: (value: string) => void;
};

export const GenderSelect = ({ value, onChange }: GenderSelectProps) => (
  <NativeSelect.Root>
    <NativeSelect.Field
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="男性">男性</option>
      <option value="女性">女性</option>
      <option value="その他">その他</option>
    </NativeSelect.Field>
    <NativeSelect.Indicator />
  </NativeSelect.Root>
);