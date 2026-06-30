import { Flex, Text, NumberInput, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

type Props = {
  open: boolean;
  latestWeight: string;
  latestBodyFat: string;
  onSaveWeight: (weight: string, bodyFat: string) => Promise<void>;
};

export const WeightInput = (props: Props) => {
  const { open, latestWeight, latestBodyFat, onSaveWeight } = props;
  const [weight, setWeight] = useState(String(latestWeight));
  const [bodyFat, setBodyFat] = useState(String(latestBodyFat));
  useEffect(() => {
    if (!open) {
      return;
    }
    setWeight(latestWeight);
    setBodyFat(latestBodyFat);
  }, [open, latestWeight, latestBodyFat]);
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
            <NumberInput.Control />
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
            <NumberInput.Control />
            <NumberInput.Input />
          </NumberInput.Root>
          <Text fontWeight="bold">%</Text>
        </Flex>
      </Flex>
      <Flex justifyContent="end" mr={4}>
        <Button
          disabled={!weight}
          onClick={async () => await onSaveWeight(weight, bodyFat)}
        >
          更新
        </Button>
      </Flex>
    </>
  );
};
