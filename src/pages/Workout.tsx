import { Box, Text } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import { WorkoutModal } from "../components/workout/WorkoutModal";
import { useWorkoutLogs } from "../hooks/workout/useWorkoutLogs";
import type { WorkoutLog } from "../types/Workout";
import { formatDate } from "../utils/formatdate";

export const Workout = () => {
  const { logs, isLoading, errorMessage } = useWorkoutLogs();
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);

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
  );
};
