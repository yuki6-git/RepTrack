import {
  calculateTrainingVolumeByPart,
  createExercisesPr,
  createTrainingMinutes,
  createWeeklyTrainingData,
} from "../../utils/analytics";
import {
  getThisMonthTrainingCount,
  getThisWeekTrainingCount,
  getThisYearTrainingCount,
} from "../../utils/data/getTrainingCount";
import { useFetchUserProfile } from "../profileSetting/useFetchuserProfile";
import { useWorkoutLogs } from "../workout/useWorkoutLogs";

export const useAnalyticsPageData = () => {
  const { logs } = useWorkoutLogs();
  const { userGoals } = useFetchUserProfile();

  const exerciseRecords = logs.flatMap((log) => log.records);

  const weeklyTrainingData = createWeeklyTrainingData(logs);
  const trainingMinutesData = createTrainingMinutes(logs);
  const exercisePrData = createExercisesPr(exerciseRecords);
  const thisWeekTrainingCount = getThisWeekTrainingCount({
    logs,
    createWeeklyTrainingData,
  });
  const thisMonthTrainingCount = getThisMonthTrainingCount(logs);
  const thisYearTrainingCount = getThisYearTrainingCount(logs);

  const latestVolumeData = logs[0]?.records ?? [];
  const COLORS = ["#2563eb", "#16a34a", "#f59e0b", "#9333ea", "#ef4444"];
  const trainingVolumeData = calculateTrainingVolumeByPart(
    latestVolumeData,
  ).map((data, index) => ({
    ...data,
    fill: COLORS[index % COLORS.length],
  }));

  const latestExerciseRecords = logs
    .slice(0, 4)
    .flatMap((log) => log.records ?? []);

  const volumeData = calculateTrainingVolumeByPart(latestExerciseRecords).sort(
    (a, b) => b.totalVolume - a.totalVolume,
  );
  const latestFourVolumeData = logs.slice(0, 4).map((log) => ({
    id: log.id,
    date: log.date,
    title: log.title,
    volumeData: calculateTrainingVolumeByPart(log.records).sort(
      (a, b) => b.totalVolume - a.totalVolume,
    ),
  }));

  const targetCount = userGoals?.weekly_goal ?? null;
  const progressValue =
    targetCount !== null && targetCount > 0
      ? Math.min((thisWeekTrainingCount / targetCount) * 100, 100)
      : 0;

  return {
    logs,
    userGoals,
    weeklyTrainingData,
    trainingMinutesData,
    exercisePrData,
    latestVolumeData,
    thisWeekTrainingCount,
    thisMonthTrainingCount,
    thisYearTrainingCount,
    targetCount,
    progressValue,
    trainingVolumeData,
    volumeData,
    latestFourVolumeData,
  };
};
