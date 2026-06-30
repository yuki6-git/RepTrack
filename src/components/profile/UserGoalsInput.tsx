import { Text, Flex, NumberInput } from "@chakra-ui/react";
import type { UserGoalsForm } from "../../types/UserInfoForm";

type Props = {
  form: UserGoalsForm;
  onChangeForm: (name: keyof UserGoalsForm, value: string) => void;
};

export const UserGoalsInput = (props: Props) => {
  const { form, onChangeForm } = props;
  return (
    <>
      <Flex justify="space-between" align="center" mb="20px">
        <Text color="gray.500">目標体重</Text>
        <Flex align="center" gap="6px">
          <NumberInput.Root
            value={String(form.targetWeight)}
            min={0}
            step={0.1}
            onValueChange={(e) => onChangeForm("targetWeight", e.value)}
          >
            <NumberInput.Input />
          </NumberInput.Root>
          <Text fontWeight="bold">kg</Text>
        </Flex>
      </Flex>

      <Flex justify="space-between" align="center" mb="24px">
        <Text color="gray.500">トレーニング目標</Text>
        <Flex align="center" gap="6px">
          <NumberInput.Root
            value={String(form.weeklyGoal)}
            min={0}
            step={1}
            onValueChange={(e) => onChangeForm("weeklyGoal", e.value)}
          >
            <NumberInput.Input />
          </NumberInput.Root>
          <Text fontWeight="bold">回</Text>
        </Flex>
      </Flex>

      <Flex justify="space-between" align="center" mb="20px">
        <Text color="gray.500">目標摂取カロリー</Text>
        <Flex align="center" gap="6px">
          <NumberInput.Root
            value={String(form.targetCalories)}
            min={0}
            step={0.1}
            onValueChange={(e) => onChangeForm("targetCalories", e.value)}
          >
            <NumberInput.Input />
          </NumberInput.Root>
          <Text fontWeight="bold">kcal</Text>
        </Flex>
      </Flex>
    </>
  );
};
