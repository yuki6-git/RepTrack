import { useState, useEffect } from "react";
import { fetchWorkoutLogs } from "../../api/workoutApi";
import type { WorkoutLog } from "../../types/Workout";

export const useWorkoutLogs = () => {
  const [logs, setLogs] = useState<WorkoutLog[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchLogs = async () => {
    setIsLoading(true);
    setErrorMessage("");
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setErrorMessage("ユーザー情報がありません");
      setIsLoading(false);
      return;
    }

    const { data, error } = await fetchWorkoutLogs(userId);
    if (error) {
      setErrorMessage("workout記録の取得に失敗しました");
      setIsLoading(false);
      return;
    }

    const newLogs = (data ?? []).map((workout) => ({
      id: workout.id,
      date: workout.workout_date,
      title: "トレーニング",
      start: workout.start_time,
      end: workout.end_time,
      duration: workout.duration,
      records: workout.exercise_records,
    }));

    setLogs(newLogs);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  return { logs, isLoading, errorMessage, fetchLogs };
};
