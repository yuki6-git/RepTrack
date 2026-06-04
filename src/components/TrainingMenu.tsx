import { Box, Flex, Text, Table, Button, VStack, HStack, Heading, Spacer } from "@chakra-ui/react";
import { useState } from "react";

const workoutDays = [
  {
    id: "day1",
    label: "Day1",
    title: "今日のワークアウト（Day1）",
    sections: [
      {
        id: "chest",
        icon: "🫀",
        name: "胸",
        exercises: [
          {
            id: 1,
            name: "ベンチプレス",
            maxWeight: "75kg",
            setWeight: "60kg",
            sets: 3,
            reps: 10,
            completed: true,
          },
          {
            id: 2,
            name: "ダンベルフライ",
            maxWeight: "20kg",
            setWeight: "12kg",
            sets: 3,
            reps: 12,
            completed: true,
          },
        ],
      },
      {
        id: "legs",
        icon: "🦵",
        name: "脚",
        exercises: [
          {
            id: 3,
            name: "スミスカーフレイズ",
            maxWeight: "80kg",
            setWeight: "60kg",
            sets: 4,
            reps: 15,
            completed: false,
          },
          {
            id: 4,
            name: "レッグプレス",
            maxWeight: "180kg",
            setWeight: "120kg",
            sets: 4,
            reps: 12,
            completed: false,
          },
        ],
      },
    ],
  },
  {
    id: "day2",
    label: "Day2",
    title: "今日のワークアウト（Day2）",
    sections: [
      {
        id: "back",
        icon: "💪",
        name: "背中",
        exercises: [
          {
            id: 5,
            name: "ラットプルダウン",
            maxWeight: "60kg",
            setWeight: "50kg",
            sets: 3,
            reps: 12,
            completed: false,
          },
        ],
      },
    ],
  },
];

export const TrainingMenu = ({ trainingMenuId }: { trainingMenuId: string }) => {
  const selectedWorkout = workoutDays.find((menu) => menu.id === trainingMenuId);

  return (
    <Box>
        <Flex>
            <Heading ml={4}>今日のトレーニング</Heading>
            <Spacer/>
        </Flex>
      <VStack align="stretch" gap="20px">
        {selectedWorkout?.sections.map((section) => (
          <Box
            key={section.id}
            p="20px"
            borderWidth="1px"
            borderRadius="8px"
            bg="white"
          >
            <HStack mb="20px" gap="12px">
              <Text fontSize="32px">{section.icon}</Text>
              <Heading size="md">{section.name}</Heading>
              <Button size="sm" ml="auto" >種目を追加する</Button>
            </HStack>

            <Table.Root>
              <Table.Header>
                <Table.Row>
                  <Table.ColumnHeader>種目</Table.ColumnHeader>
                  <Table.ColumnHeader>MAX重量（kg）</Table.ColumnHeader>
                  <Table.ColumnHeader>セット重量（kg）</Table.ColumnHeader>
                  <Table.ColumnHeader>セット数</Table.ColumnHeader>
                  <Table.ColumnHeader>レップ数</Table.ColumnHeader>
                  <Table.ColumnHeader>完了</Table.ColumnHeader>
                </Table.Row>
              </Table.Header>

              <Table.Body>
                {section.exercises.map((exercise) => (
                  <Table.Row key={exercise.id}>
                    <Table.Cell fontWeight="bold">{exercise.name}</Table.Cell>
                    <Table.Cell>{exercise.maxWeight}</Table.Cell>
                    <Table.Cell>{exercise.setWeight}</Table.Cell>
                    <Table.Cell>{exercise.sets}</Table.Cell>
                    <Table.Cell>{exercise.reps}</Table.Cell>
                    <Table.Cell>{exercise.completed ? "✅" : "□"}</Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table.Root>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};
