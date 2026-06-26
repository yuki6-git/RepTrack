import { Box, Heading, Text, HStack, Flex, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import { WorkoutModal } from "../components/workout/WorkoutModal";
import { useWorkoutLogs } from "../hooks/workout/useWorkoutLogs";
import type { WorkoutLog } from "../types/Workout";
import { formatDate } from "../utils/formatdate";
import { getThisMonthTrainingCount } from "../components/workout/getThisMonthTrainingCount";
import { useWeeklyTrainingCount } from "../utils/weeklyTrainingCount";

export const Workout = () => {
  const { logs, isLoading, errorMessage } = useWorkoutLogs();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const weeklyCount = useWeeklyTrainingCount();
  const monthlyCount = getThisMonthTrainingCount(logs);

  const selectedLog: WorkoutLog | undefined = logs.find(
    (log) => log.date === selectedDate,
  );

  const handleClickDay = (date: Date) => {
    const dateKey = formatDate(date);
    const log = logs.find((log) => log.date === dateKey);
    if (!log) return;
    setSelectedDate(dateKey);
    setIsOpen(true);
  };

  if (isLoading) {
    return <Text>読み込み中...</Text>;
  }

  if (errorMessage) {
    return <Text color="red.500">{errorMessage}</Text>;
  }
  return (
    <>
      <Box mx={10}>
        <Calendar
          minDetail="month"
          onClickDay={handleClickDay}
          tileContent={({ date, view }) => {
            if (view !== "month") return null;

            const dateKey = formatDate(date);
            const hasWorkout = logs.some((log) => log.date === dateKey);

            if (!hasWorkout) return null;

            return (
              <Box
                w="8px"
                h="8px"
                bg="blue.800"
                borderRadius="full"
                mx="auto"
                mt="4px"
              />
            );
          }}
        />
        <WorkoutModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          selectedLog={selectedLog}
        />
      </Box>

      <SimpleGrid m={10} columns={{ base: 1, md: 2 }} gap="20px">
        <Box
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="16px"
          p="24px"
          boxShadow="sm"
        >
          <Text fontSize="sm" color="gray.500" fontWeight="bold" mb="12px">
            今週のトレーニング回数
          </Text>

          <Flex align="baseline" justify="space-between">
            <Text fontSize="3xl">{weeklyCount}</Text>
            <Text fontSize="lg" fontWeight="bold" color="gray.600">
              回
            </Text>
          </Flex>
        </Box>

        <Box
          bg="white"
          borderWidth="1px"
          borderColor="gray.200"
          borderRadius="16px"
          p="24px"
          boxShadow="sm"
        >
          <Text fontSize="sm" color="gray.500" fontWeight="bold" mb="12px">
            今月のトレーニング回数
          </Text>

          <Flex align="baseline" justify="space-between">
            <Text fontSize="3xl">{monthlyCount}</Text>
            <Text fontSize="lg" fontWeight="bold" color="gray.600">
              回
            </Text>
          </Flex>
        </Box>
      </SimpleGrid>
    </>
  );
};
