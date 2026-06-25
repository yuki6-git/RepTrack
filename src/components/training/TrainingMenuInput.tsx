import {
  Box,
  Text,
  Button,
  Input,
  InputGroup,
  NumberInput,
  Flex,
  Field,
  Heading,
} from "@chakra-ui/react";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { NewExercise } from "../../types/NewExercise";
import { ExerciseListBypart } from "./ExerciseListByPart";
import { useEditExercises } from "../../hooks/training/useEditExercises";

type Props = {
  onSave: (exercises: NewExercise[]) => void;
  addExercises?: NewExercise[];
  setMenuTitle: Dispatch<SetStateAction<string>>;
  menuTitle: string;
};

export const TrainingMenuInput = (props: Props) => {
  const { onSave, addExercises, setMenuTitle, menuTitle } = props;
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
  const [isLoading, setIsLoading] = useState(false);

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
      tabId: "",
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
    setIsLoading(true);

    if (draftExercises.length === 0) {
      setValidationMessage("種目を1件以上追加してください");
      setIsLoading(false);
      return;
    }

    onSave(draftExercises);
    setIsLoading(false);
  };

  const { onClickEditExercise, onClickDeleteExercise } = useEditExercises({
    setDraftExercises,
    setForm,
    initialForm,
  });

  return (
    <>
      <Box>
        <Heading mb={2}>メニュー名</Heading>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onClickSaveMenu();
          }}
        ></form>
        <Input
          placeholder="メニュー名"
          value={menuTitle}
          onChange={(e) => setMenuTitle(e.target.value)}
        />

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
        <Field.Root required mb="12px">
          <Field.Label color="gray.500">
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

      <Button type="button" onClick={onClickAddExercise} my={4}>
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
        <Button loading={isLoading} disabled={isLoading} type="submit">
          保存
        </Button>
      </Flex>
    </>
  );
};
