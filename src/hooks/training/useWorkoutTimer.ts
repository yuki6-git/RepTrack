import { useEffect, useState } from "react";

export const useWorkoutTimer = () => {
  const [startedTime, setStartedTime] = useState<Date | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    if (!startedTime || !isRunning) return;

    const timerId = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedTime.getTime()) / 1000);
      setElapsedSeconds(elapsed);
    }, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [startedTime, isRunning]);

  const startTimer = () => {
    setStartedTime(new Date());
    setElapsedSeconds(0);
    setIsRunning(true);
  };

  const stopTimer = () => {
    setIsRunning(false);
  };

  const resetTimer = () => {
    setStartedTime(null);
    setElapsedSeconds(0);
    setIsRunning(false);
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;

    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  return {
    elapsedSeconds,
    formattedTime: formatTime(elapsedSeconds),
    isRunning,
    startTimer,
    stopTimer,
    resetTimer,
  };
};
