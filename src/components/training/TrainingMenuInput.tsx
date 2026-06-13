import {
  Box,
  Text,
  Button,
  Input,
  InputGroup,
  NumberInput,
  Flex,
  Field,
} from "@chakra-ui/react";
import { useState } from "react";
import type { NewExercise } from "../../types/NewExercise";
import { ExerciseListBypart } from "./ExerciseListByPart";
import { useDraftExercises } from "../../hooks/exercises/useDraftExercises";

type Props = {
  tabId: string;
  onClickSave: (tabId: string, exercises: NewExercise[]) => void;
  addExercises?: NewExercise[];
};

export const TrainingMenuInput = (props: Props) => {
  const { tabId, onClickSave, addExercises } = props;
  const initialForm: NewExercise = {
    id: "",
    tabId: "",
    part: "",
    exerciseName: "",
    maxWeight: "",
    setWeight: "",
    sets: "",
    reps: "",
  };

  const [form, setForm] = useState(initialForm);

  const [draftExercises, setDraftExercises] = useState<NewExercise[]>(
    addExercises ?? [],
  );
  const [validationMessage, setValidationMessage] = useState("");

  const hasRequiredValues =
    form.part.trim() !== "" &&
    form.exerciseName.trim() !== "" &&
    form.setWeight.trim() !== "" &&
    form.sets.trim() !== "" &&
    form.reps.trim() !== "";

  const onClickAddExercise = () => {
    if (!hasRequiredValues) {
      setValidationMessage("必須項目を入力してください");
      return;
    }

    const newExercise: NewExercise = {
      id: crypto.randomUUID(),
      tabId: tabId,
      part: form.part,
      exerciseName: form.exerciseName,
      maxWeight: form.maxWeight,
      setWeight: form.setWeight,
      sets: form.sets,
      reps: form.reps,
    };

    setDraftExercises((prev) => [...prev, newExercise]);
    setForm(initialForm);
    setValidationMessage("");
  };

  const onClickSaveMenu = () => {
    if (draftExercises.length === 0) {
      setValidationMessage("種目を1件以上追加してください");
      return;
    }

    onClickSave(tabId, draftExercises);
  };

  const { onClickEditExercise, onClickDeleteExercise } = useDraftExercises({
    setDraftExercises,
    setForm,
    initialForm,
  });
  return (
    <>
      <Box as="dl">
        <Field.Root required>
          <Field.Label as="dt" color="gray.500">
            部位 <Field.RequiredIndicator />
          </Field.Label>
          <Input
            placeholder="部位"
            value={form.part}
            onChange={(e) =>
              setForm({
                ...form,
                part: e.target.value,
              })
            }
            as="dd"
          />

          <Field.Label as="dt" color="gray.500">
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
            as="dd"
          />

          <Text as="dt" color="gray.500">
            Max重量
          </Text>
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

          <Field.Label as="dt" color="gray.500">
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

          <Field.Label as="dt" color="gray.500">
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

          <Field.Label as="dt" color="gray.500">
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

          <Field.Label as="dt" color="gray.500">
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

      <Button onClick={onClickAddExercise} my={4}>
        種目を追加
      </Button>

      {validationMessage && (
        <Text color="red.500" mb={4}>
          {validationMessage}
        </Text>
      )}

      <Text my={4}>追加済み種目</Text>

      <ExerciseListBypart
        exercises={draftExercises}
        onClickEditExercise={onClickEditExercise}
        onClickDeleteExercise={onClickDeleteExercise}
        mode="draft"
      />

      <Flex justifyContent="end" mt={4}>
        <Button onClick={onClickSaveMenu}>保存</Button>
      </Flex>
    </>
  );
};
