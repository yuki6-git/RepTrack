import {
  Box,
  Button,
  Field,
  Heading,
  HStack,
  Input,
  InputGroup,
  NumberInput,
  Tabs,
  Text,
} from "@chakra-ui/react";
import type { NewExercise } from "../../types/NewExercise";
import type { Dispatch, SetStateAction } from "react";
import { ExerciseListByPart } from "./ExerciseListByPart";

type Props = {
  selectedParts: string[];
  form: NewExercise;
  setForm: Dispatch<SetStateAction<NewExercise>>;
  onClickAddExercise: (form: NewExercise, part: string) => void;
  validationMessage: string;
  draftExercises: NewExercise[];
  onClickEditExercise: (exercises: NewExercise) => void;
  onClickDeleteExercise: (id: string) => void;
};

export const ExerciseInputStep = (props: Props) => {
  const {
    selectedParts,
    form,
    setForm,
    onClickAddExercise,
    validationMessage,
    draftExercises,
    onClickEditExercise,
    onClickDeleteExercise,
  } = props;

  return (
    <Tabs.Root defaultValue={selectedParts[0]} w="100%">
      <Box overflowX="auto" maxW="100%">
        <Tabs.List>
          {selectedParts.map((part: string) => (
            <Tabs.Trigger key={part} value={part}>
              {part}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Box>
      {selectedParts.map((part: string) => (
        <Tabs.Content key={part} value={part}>
          <Box>
            <Heading mt={4}>種目</Heading>
            <Field.Root maxW="500px" required mb="12px">
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
            <HStack>
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
            </HStack>
          </Box>
          <Button
            type="button"
            onClick={() => onClickAddExercise(form, part)}
            my={4}
          >
            種目を追加
          </Button>
          {validationMessage && (
            <Text color="red.500" mb={4}>
              {validationMessage}
            </Text>
          )}
          <Text my={4}>追加済み種目</Text>

          <ExerciseListByPart
            exercises={draftExercises.filter(
              (exercise) => exercise.part === part,
            )}
            onClickEditExercise={onClickEditExercise}
            onClickDeleteExercise={onClickDeleteExercise}
            mode="draft"
          />
        </Tabs.Content>
      ))}
    </Tabs.Root>
  );
};
