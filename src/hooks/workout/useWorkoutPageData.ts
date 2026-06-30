import { useCallback, useState } from "react";
import {
  getThisMonthTrainingCount,
  getThisWeekTrainingCount,
} from "../../utils/data/getTrainingCount";
import type { WorkoutLog } from "../../types/Workout";
import { formatDate } from "../../utils/data/formatdate";
import { useWorkoutLogs } from "./useWorkoutLogs";
import { createWeeklyTrainingData } from "../../utils/analytics";

export const useWorkoutPageData = () => {
  const { logs, isLoading, errorMessage } = useWorkoutLogs();

  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const thisWeekTrainingCount = getThisWeekTrainingCount({
    logs,
    createWeeklyTrainingData,
  });
  const thisMonthTrainingCount = getThisMonthTrainingCount(logs);

  const selectedLog: WorkoutLog | undefined = logs.find(
    (log) => log.date === selectedDate,
  );

  const handleClickDay = useCallback((date: Date) => {
    const dateKey = formatDate(date);
    const log = logs.find((log) => log.date === dateKey);
    if (!log) return;
    setSelectedDate(dateKey);
    setIsOpen(true);
  }, []);

  const hasWorkoutOnDate = useCallback(
    (date: Date) => {
      const dateKey = formatDate(date);
      return logs.some((log) => log.date === dateKey);
    },
    [logs],
  );

  return {
    isLoading,
    errorMessage,
    handleClickDay,
    isOpen,
    setIsOpen,
    selectedLog,
    thisWeekTrainingCount,
    thisMonthTrainingCount,
    logs,
    hasWorkoutOnDate,
  };
};
