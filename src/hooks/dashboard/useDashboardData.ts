import { useEffect, useState } from "react";
import type { TrainingMenu } from "../../types/TrainingMenu";
import type { ExerciseRecord, Workout } from "../../types/Workout";
import { fetchUserGoals } from "../../api/profileSettingApi";
import { fetchWorkoutLogs } from "../../api/workoutApi";
import { fetchweightRecords } from "../../api/weightApi";
import type { DashboardData } from "../../types/DashboardData";
import { fetchTrainingMenuRows } from "../../api/trainingMenuApi";
import type { WeightRecord } from "../../types/WeightRecord";
import { getCurrentUserId } from "../../api/authApi";

type WorkoutWithRecords = Workout & {
  exercise_records?: ExerciseRecord[];
};

export const useDashboardData = () => {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    latestWeight: null,
    targetWeight: null,
    weeklyWorkoutCount: 0,
    weeklyGoal: null,
    todayTrainingMenu: null,
    latestWorkouts: null,
    latestPr: null,
  });

  const getTodayTrainingMenu = ({
    trainingMenus,
    workouts,
  }: {
    trainingMenus: TrainingMenu[];
    workouts: Workout[];
  }) => {
    if (trainingMenus.length === 0) {
      return null;
    }
    if (workouts.length === 0) {
      return trainingMenus[0];
    }
    const latestTraining = workouts[0];
    const latestTrainingMenuIndex = trainingMenus.findIndex(
      (menu: TrainingMenu) => menu.id === latestTraining.training_menu_id,
    );
    if (latestTrainingMenuIndex === -1) {
      return trainingMenus[0];
    }
    const nextIndex = (latestTrainingMenuIndex + 1) % trainingMenus.length;

    return trainingMenus[nextIndex];
  };

  const getLatestPr = (records: ExerciseRecord[]) => {
    if (records.length === 0) {
      return null;
    }

    return records.reduce((maxRecord, record) =>
      (record.max_weight ?? 0) > (maxRecord.max_weight ?? 0)
        ? record
        : maxRecord,
    );
  };

  const fetchDashboardData = async () => {
    const userId = await getCurrentUserId();

    if (!userId) {
      return;
    }

    const { data: goals } = await fetchUserGoals(userId);
    const { data: weightRecordsData } = await fetchweightRecords(userId);
    const { data: workouts } = await fetchWorkoutLogs(userId);
    const { data: Menus } = await fetchTrainingMenuRows();

    const weightRecords = (weightRecordsData ?? []) as WeightRecord[];
    const workoutLogs = (workouts ?? []) as WorkoutWithRecords[];
    const trainingMenus = (Menus ?? []).map((menu) => ({
      id: menu.id,
      userId: menu.user_id,
      tabId: menu.tab_id,
      title: menu.title,
      createdAt: menu.created_at,
      exercises: [],
    }));

    const todayTrainingMenu = getTodayTrainingMenu({
      trainingMenus,
      workouts: workoutLogs,
    });
    const latestWorkout = workoutLogs[0] ?? null;
    const latestPr = latestWorkout
      ? getLatestPr(latestWorkout.exercise_records ?? [])
      : null;

    // ここでDashboard用に整形
    setDashboardData({
      latestWeight: weightRecords[0]?.weight ?? null,
      targetWeight: goals?.target_weight ?? null,
      weeklyWorkoutCount: 0,
      weeklyGoal: goals?.weekly_goal ?? null,
      todayTrainingMenu,
      latestWorkouts: workoutLogs.slice(0, 3),
      latestPr,
    });
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return { getTodayTrainingMenu, dashboardData };
};
