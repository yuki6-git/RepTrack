import { useCallback, useMemo } from "react";
import {
  calculateTrainingVolumeByPart,
  createExercisesPr,
  createTrainingMinutes,
  createWeeklyTrainingData,
} from "../../utils/analytics";
import { calculateAverageTrainingTime } from "../../utils/analytics/calculateAverageTrainingTime";
import {
  getThisMonthTrainingCount,
  getThisWeekTrainingCount,
  getThisYearTrainingCount,
} from "../../utils/data/getTrainingCount";
import { groupLogsByMonth } from "../../utils/data/groupLogsByMonth";
import { groupLogsByWeek } from "../../utils/data/groupLogsByWeek";
import { useFetchUserProfile } from "../profileSetting/useFetchuserProfile";
import { useWorkoutLogs } from "../workout/useWorkoutLogs";

const PART_COLORS: Record<string, string> = {
  胸: "blue",
  背中: "green",
  脚: "orange",
  肩: "purple",
  上腕二頭筋: "pink",
  上腕三頭筋: "cyan",
};

export const useAnalyticsPageData = () => {
  const { logs } = useWorkoutLogs();
  const { userGoals } = useFetchUserProfile();
  const exerciseRecords = useMemo(() => {
    return logs.flatMap((log) => log.records);
  }, [logs]);

  //トレーニング時間関連のロジック
  const trainingMinutesData = createTrainingMinutes(logs);
  const thisMonthTrainingMinutes = useMemo(() => {
    return logs.map((log) => ({
      id: log.id ?? "",
      date: log.date ?? "",
      title: log.title ?? "",
      durationMinutes: log.duration ?? 0,
    }));
  }, [logs]);

  const weeklyAverageTrainingMinutes = useMemo(() => {
    const weeklyLogs = groupLogsByWeek(logs);
    return Object.entries(weeklyLogs).map(([week, Logs]) => {
      const durations = Logs.map((log) => log.duration ?? 0);
      return {
        label: week,
        averageMinutes: calculateAverageTrainingTime(durations),
      };
    });
  }, [logs]);

  const monthlyAverageTrainingMinutes = useMemo(() => {
    const monthlyLogs = groupLogsByMonth(logs);
    return Object.entries(monthlyLogs).map(([month, Logs]) => {
      const durations = Logs.map((log) => log.duration ?? 0);
      return {
        label: month,
        averageMinutes: calculateAverageTrainingTime(durations),
      };
    });
  }, [logs]);

  //pr関連のロジック
  const exercisePrData = createExercisesPr(exerciseRecords);

  //トレーニング回数関連のロジック
  const weeklyTrainingData = createWeeklyTrainingData(logs);
  const thisWeekTrainingCount = getThisWeekTrainingCount({
    logs,
    createWeeklyTrainingData,
  });
  const thisMonthTrainingCount = getThisMonthTrainingCount(logs);
  const thisYearTrainingCount = getThisYearTrainingCount(logs);
  const targetCount = userGoals?.weekly_goal ?? null;
  const progressValue =
    targetCount !== null && targetCount > 0
      ? Math.min((thisWeekTrainingCount / targetCount) * 100, 100)
      : 0;

  //総重量関連のロジック
  const latestVolumeData = logs[0]?.records ?? [];
  const trainingVolumeData = calculateTrainingVolumeByPart(
    latestVolumeData,
  ).map((data) => ({
    ...data,
    fill: PART_COLORS[data.part] ?? "gray",
  }));
  const latestExerciseRecords = useMemo(() => {
    return logs.slice(0, 4).flatMap((log) => log.records ?? []);
  }, [logs]);

  const volumeData = calculateTrainingVolumeByPart(latestExerciseRecords).sort(
    (a, b) => b.totalVolume - a.totalVolume,
  );
  const latestFourVolumeData = useMemo(() => {
    return logs.slice(0, 4).map((log) => ({
      id: log.id,
      date: log.date,
      title: log.title,
      volumeData: calculateTrainingVolumeByPart(log.records)
        .map((partData) => ({
          ...partData,
          fill: PART_COLORS[partData.part] ?? "gray",
        }))
        .sort((a, b) => b.totalVolume - a.totalVolume),
    }));
  }, [logs]);

  const groupedExercises = useMemo(() => {
    return volumeData.map((data) => {
      const exercisesByName = data.exercises.reduce<
        Record<string, { exerciseName: string; volume: number }>
      >((groups, exercise) => {
        const currentExercise = groups[exercise.exerciseName];
        if (!currentExercise) {
          return {
            ...groups,
            [exercise.exerciseName]: {
              exerciseName: exercise.exerciseName,
              volume: exercise.volume,
            },
          };
        }
        return {
          ...groups,
          [exercise.exerciseName]: {
            ...currentExercise,
            volume: currentExercise.volume + exercise.volume,
          },
        };
      }, {});
      return {
        ...data,
        exercises: Object.values(exercisesByName),
      };
    });
  }, [volumeData]);

  return {
    logs,
    userGoals,

    trainingMinutesData,
    thisMonthTrainingMinutes,
    weeklyAverageTrainingMinutes,
    monthlyAverageTrainingMinutes,

    exercisePrData,

    weeklyTrainingData,
    thisWeekTrainingCount,
    thisMonthTrainingCount,
    thisYearTrainingCount,
    targetCount,

    progressValue,
    volumeData,
    trainingVolumeData,
    latestVolumeData,
    latestFourVolumeData,
    groupedExercises,
  };
};
