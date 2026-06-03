import { Box } from "@chakra-ui/react";
import { useState } from "react";
import Calendar from "react-calendar";
import { WorkoutModal } from "../components/WorkoutModal";

const workoutLogs = [
  {
    date: "2026-06-14",
    title: "背中トレーニング",
    part: "背中",
    start: "18:30",
    end: "19:45",
    duration: "75分",
    pr: "デッドリフト 100kg",
  },
];

export const Workout = () => {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectedLog = workoutLogs.find((log) => log.date === selectedDate);

  const handleClickDay = (date: Date) => {
    const dateKey = formatDate(date);

    const log = workoutLogs.find((log) => log.date === dateKey);

    if (!log) return;

    setSelectedDate(dateKey);
    setIsOpen(true);
  };

  // 取得した日付データを文字列に整える関数
  const formatDate = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  };

  return (
    <>
      <Calendar
        minDetail="month"
        onClickDay={handleClickDay}
        tileContent={({ date, view }) => {
          if (view !== "month") return null;

          const dateKey = formatDate(date);
          const hasWorkout = workoutLogs.some((log) => log.date === dateKey);

          if (!hasWorkout) return null;

          return (
            <Box
              w="6px"
              h="6px"
              bg="blue.600"
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
    
    </>
  );
};
