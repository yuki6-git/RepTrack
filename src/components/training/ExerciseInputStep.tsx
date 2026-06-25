import {
  Box,
  Field,
  Heading,
  Input,
  InputGroup,
  NumberInput,
  Tabs,
} from "@chakra-ui/react";
import type { NewExercise } from "../../types/NewExercise";
import type { Dispatch, SetStateAction } from "react";

type Props = {
  selectedParts: string[];
  form: NewExercise;
  setForm: Dispatch<SetStateAction<NewExercise>>;
};
export const ExerciseInputStep = (props: Props) => {
  const { selectedParts, form, setForm } = props;
  return (
    <Tabs.Root defaultValue={selectedParts[0]} h="200px">
      <Box overflowX="auto" maxW="100%">
        <Tabs.List>
          {selectedParts.map((part: string) => (
            <Tabs.Trigger value={part}>{part}</Tabs.Trigger>
          ))}
        </Tabs.List>
      </Box>
      {selectedParts.map((part: string) => (
        <Tabs.Content value={part}>
          <Box>
            <Heading mt={4}>種目</Heading>
            <Field.Root required mb="12px">
              <Field.Label color="gray.500">
                種目名 <Field.RequiredIndicator />
              </Field.Label>
              <Input
                placeholder="種目名"
                value={form.exerciseName}
                onChange={(e) =>
                  setForm({
                    ...form,
                    exerciseName: e.target.value,
                  })
                }
              />
            </Field.Root>

            <Field.Root mb="12px">
              <Field.Label color="gray.500">Max重量 (opitinal)</Field.Label>
              <NumberInput.Root
                value={form.maxWeight}
                onValueChange={(e) =>
                  setForm({
                    ...form,
                    maxWeight: e.value,
                  })
                }
                maxW={200}
              >
                <NumberInput.Control />
                <InputGroup
                  endElement={
                    <Box pr="30px" color="gray.500">
                      kg
                    </Box>
                  }
                >
                  <NumberInput.Input />
                </InputGroup>
              </NumberInput.Root>
            </Field.Root>

            <Field.Root required mb="12px">
              <Field.Label color="gray.500">
                セット重量 <Field.RequiredIndicator />
              </Field.Label>
              <NumberInput.Root
                value={form.setWeight}
                onValueChange={(e) =>
                  setForm({
                    ...form,
                    setWeight: e.value,
                  })
                }
                maxW={200}
              >
                <NumberInput.Control />
                <InputGroup
                  endElement={
                    <Box pr="30px" color="gray.500">
                      kg
                    </Box>
                  }
                >
                  <NumberInput.Input />
                </InputGroup>
              </NumberInput.Root>
            </Field.Root>

            <Field.Root required mb="12px">
              <Field.Label color="gray.500">
                セット回数 <Field.RequiredIndicator />
              </Field.Label>
              <NumberInput.Root
                value={form.sets}
                onValueChange={(e) =>
                  setForm({
                    ...form,
                    sets: e.value,
                  })
                }
                maxW={200}
              >
                <NumberInput.Control />
                <InputGroup
                  endElement={
                    <Box pr="30px" color="gray.500">
                      回
                    </Box>
                  }
                >
                  <NumberInput.Input />
                </InputGroup>
              </NumberInput.Root>
            </Field.Root>

            <Field.Root required mb="12px">
              <Field.Label color="gray.500">
                レップ数 <Field.RequiredIndicator />
              </Field.Label>
              <NumberInput.Root
                value={form.reps}
                onValueChange={(e) =>
                  setForm({
                    ...form,
                    reps: e.value,
                  })
                }
                maxW={200}
              >
                <NumberInput.Control />
                <InputGroup
                  endElement={
                    <Box pr="30px" color="gray.500">
                      回
                    </Box>
                  }
                >
                  <NumberInput.Input />
                </InputGroup>
              </NumberInput.Root>
            </Field.Root>
          </Box>
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
