import {
  Heading,
  Table,
  Box,
  VStack,
  Button,
  Checkbox,
  Flex,
} from "@chakra-ui/react";
import type { NewExercise } from "../../types/NewExercise";
import type { ExerciseRecord } from "../../types/Workout";

type Props = {
  exercises: NewExercise[];
  mode: "draft" | "workout";
  onClickEditExercise?: (exercise: NewExercise) => void;
  onClickDeleteExercise?: (id: string) => void;
  toggleCompleted: (trainingMenuExerciseId: string) => Promise<boolean>;
  exerciseRecords: ExerciseRecord[];
};

export const ExerciseListBypart = (props: Props) => {
  const {
    exercises,
    mode,
    onClickEditExercise,
    onClickDeleteExercise,
    toggleCompleted,
    exerciseRecords,
  } = props;

  const groupedExercises = exercises.reduce<Record<string, NewExercise[]>>(
    (groups, exercise) => {
      const part = exercise.part;

      const exercisesByPart = groups[part] ?? [];
      const newExercisesByPart = [...exercisesByPart, exercise];

      return {
        ...groups,
        [part]: newExercisesByPart,
      };
    },
    {},
  );

  return (
    <VStack align="stretch" gap="20px">
      {Object.entries(groupedExercises).map((entry) => {
        const part = entry[0];
        const exercises = entry[1];

        return (
          <Box
            key={part}
            p="20px"
            borderWidth="1px"
            borderRadius="8px"
            bg="white"
          >
            <Heading size="md" mb="20px">
              {part}
            </Heading>

            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>種目</Table.ColumnHeader>
                  <Table.ColumnHeader>MAX重量（kg）</Table.ColumnHeader>
                  <Table.ColumnHeader>セット重量（kg）</Table.ColumnHeader>
                  <Table.ColumnHeader>セット数</Table.ColumnHeader>
                  <Table.ColumnHeader>レップ数</Table.ColumnHeader>
                  {mode === "draft" && (
                    <Table.ColumnHeader>操作</Table.ColumnHeader>
                  )}

                  {mode === "workout" && (
                    <Table.ColumnHeader>完了</Table.ColumnHeader>
                  )}
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {exercises.map((exercise) => {
                  const record = exerciseRecords.find(
                    (record) =>
                      record.training_menu_exercise_id === exercise.id,
                  );
                  return (
                    <Table.Row key={exercise.id}>
                      <Table.Cell fontWeight="bold">
                        {exercise.exerciseName}
                      </Table.Cell>
                      <Table.Cell>{exercise.maxWeight}kg</Table.Cell>
                      <Table.Cell>{exercise.setWeight}kg</Table.Cell>
                      <Table.Cell>{exercise.sets}</Table.Cell>
                      <Table.Cell>{exercise.reps}</Table.Cell>
                      {mode === "draft" && (
                        <Table.Cell>
                          <Flex>
                            <Button
                              mr={2}
                              size="xs"
                              onClick={() => onClickEditExercise?.(exercise)}
                            >
                              編集
                            </Button>
                            <Button
                              onClick={() =>
                                onClickDeleteExercise?.(exercise.id)
                              }
                              size="xs"
                            >
                              削除
                            </Button>
                          </Flex>
                        </Table.Cell>
                      )}

                      {mode === "workout" && (
                        <Table.Cell>
                          <Checkbox.Root
                            colorPalette="blue"
                            variant="subtle"
                            checked={record?.completed ?? false}
                            onCheckedChange={() => toggleCompleted(exercise.id)}
                          >
                            <Checkbox.HiddenInput />
                            <Checkbox.Control cursor="pointer">
                              <Checkbox.Indicator />
                            </Checkbox.Control>
                          </Checkbox.Root>
                        </Table.Cell>
                      )}
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table.Root>
          </Box>
        );
      })}
    </VStack>
  );
};
