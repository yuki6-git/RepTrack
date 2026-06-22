import { Flex, Text, NumberInput, Button } from "@chakra-ui/react";
import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  setOpen: Dispatch<SetStateAction<boolean>>;
  latestWeight: string;
  latestBodyFat: string;
  createWeightRecord: (params: {
    weight: string;
    bodyFat: string;
  }) => Promise<void>;
};

export const WeightInput = (props: Props) => {
  const { latestWeight, latestBodyFat, setOpen, createWeightRecord } = props;
  const [weight, setWeight] = useState(String(latestWeight));
  const [bodyFat, setBodyFat] = useState(String(latestBodyFat));

  const onSaveWeight = async () => {
    await createWeightRecord({
      weight,
      bodyFat,
    });
    setOpen(false);
  };

  return (
    <>
      <Flex justify="space-between" align="center" mb="20px">
        <Text color="gray.500">現在の体重</Text>
        <Flex align="center" gap="6px">
          <NumberInput.Root
            value={weight}
            min={0}
            step={0.1}
            onValueChange={(e) => setWeight(e.value)}
          >
            <NumberInput.Input />
          </NumberInput.Root>
          <Text fontWeight="bold">kg</Text>
        </Flex>
      </Flex>
      <Flex justify="space-between" align="center" mb="20px">
        <Text color="gray.500">現在の体脂肪率</Text>
        <Flex align="center" gap="6px">
          <NumberInput.Root
            value={bodyFat}
            min={0}
            step={1}
            onValueChange={(e) => setBodyFat(e.value)}
          >
            <NumberInput.Input />
          </NumberInput.Root>
          <Text fontWeight="bold">%</Text>
        </Flex>
      </Flex>
      <Flex justifyContent="end" mr={4}>
        <Button onClick={onSaveWeight}>保存</Button>
      </Flex>
    </>
  );
};
