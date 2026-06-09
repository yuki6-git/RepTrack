import {
  Box,
  Text,
  Button,
  Input,
  InputGroup,
  NumberInput,
  Flex,
} from "@chakra-ui/react";
import { useState } from "react";
import { AddedExerciseList } from "./AddedExerciseList";
import type { NewExercise } from "../types/NewxExercise";

type Props = {
  tabId: string;
  onCreateMenu: (tabId: string, exercises: NewExercise[]) => void;
  addExercises?: NewExercise[];
};

export const TrainingMenuInput = (props: Props) => {
  const { tabId, onCreateMenu, addExercises } = props;
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

  const onClickAddExercise = () => {
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
  };

  return (
    <>
      <Box as="dl">
        <Text as="dt" color="gray.500">
          部位
        </Text>
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
        <Text as="dt" color="gray.500">
          種目名
        </Text>
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

        <Text as="dt" color="gray.500">
          セット重量
        </Text>
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

        <Text as="dt" color="gray.500">
          セット回数
        </Text>
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

        <Text as="dt" color="gray.500">
          レップ数
        </Text>
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
      </Box>

      <Button onClick={onClickAddExercise} my={4}>
        種目を追加
      </Button>

      <Text my={4}>追加済み種目</Text>

      <AddedExerciseList
        setForm={setForm}
        initialForm={initialForm}
        draftExercises={draftExercises}
        setDraftExercises={setDraftExercises}
      />
      <Flex justifyContent="end" mt={4}>
        <Button onClick={() => onCreateMenu(tabId, draftExercises)}>
          保存
        </Button>
      </Flex>
    </>
  );
};
