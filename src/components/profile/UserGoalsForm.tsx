import { Text, Flex, NumberInput, Button } from "@chakra-ui/react";
import type { UserGoals } from "../../types/UserGoals";
import type { Dispatch, SetStateAction } from "react";

type UserGoalsModalProps = {
  userGoals: UserGoals;
  setUserGoals: Dispatch<SetStateAction<UserGoals>>;
};

export const UserGoalsForm = (props: UserGoalsModalProps) => {
  const { userGoals, setUserGoals } = props;

  return (
    <>
      <Flex justify="space-between" align="center" mb="20px">
        <Text color="gray.500">目標体重</Text>
        <Flex align="center" gap="6px">
          <NumberInput.Root
            value={String(userGoals.targetWeight)}
            min={0}
            step={0.1}
            onValueChange={(e) =>
              setUserGoals({
                ...userGoals,
                targetWeight: e.valueAsNumber,
              })
            }
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
            value={String(userGoals.weeklyGoal)}
            min={0}
            step={1}
            onValueChange={(e) =>
              setUserGoals({
                ...userGoals,
                weeklyGoal: e.valueAsNumber,
              })
            }
          >
            <NumberInput.Input />
          </NumberInput.Root>
          <Text fontWeight="bold">回</Text>
        </Flex>
      </Flex>
      <Flex justifyContent="end">
        <Button>保存</Button>
      </Flex>
    </>
  );
};
