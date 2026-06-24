import type { ExerciseRecord, WorkoutLog } from "../../types/Workout";
import { formatDate } from "../../utils/formatdate";

export const useAnalyticsData = () => {
  const createWeeklyTrainingData = (workouts: WorkoutLog[]) => {
    const weeklyCounts: Record<string, number> = {};
    workouts.forEach((workout) => {
      const date = new Date(`${workout.date}T00:00:00`);
      const day = date.getDay();
      const monday = new Date(date);
      monday.setDate(date.getDate() - ((day + 6) % 7));

      const weekKey = formatDate(monday);
      weeklyCounts[weekKey] = (weeklyCounts[weekKey] ?? 0) + 1;
    });
    return Object.entries(weeklyCounts).map(([week, count]) => ({
      week,
      count,
    }));
  };

  const createTrainingMinutes = (workouts: WorkoutLog[]) => {
    const latestFiveWorkouts = workouts.slice(0, 5).map((workout) => ({
      date: workout.date,
      duration: workout.duration ? Math.round(workout.duration / 60) : 0,
    }));
    return latestFiveWorkouts;
  };

  const createExercisesPr = (exerciseRecords: ExerciseRecord[]) => {
    const currentPrExercises: Record<string, number> = {};
    exerciseRecords.forEach((exerciseRecord) => {
      if (exerciseRecord.max_weight === null) {
        return;
      }
      const currentPr = currentPrExercises[exerciseRecord.exercise_name] ?? 0;
      if (currentPr < exerciseRecord.max_weight) {
        currentPrExercises[exerciseRecord.exercise_name] =
          exerciseRecord.max_weight;
      }
    });
    return Object.entries(currentPrExercises)
      .map(([exerciseName, maxWeight]) => ({
        exerciseName,
        maxWeight,
      }))
      .sort((a, b) => {
        return b.maxWeight - a.maxWeight;
      });
  };

  const calculateTrainingVolumebypart = (exerciseRecords: ExerciseRecord[]) => {
    const volumebypart: Record<string, number> = {};
    exerciseRecords.forEach((exerciseRecord) => {
      const volume =
        exerciseRecord.set_weight * exerciseRecord.sets * exerciseRecord.reps;

      volumebypart[exerciseRecord.part] =
        (volumebypart[exerciseRecord.part] ?? 0) + volume;
    });
    return Object.entries(volumebypart).map(([part, volume]) => ({
      part,
      volume,
    }));
  };

  return {
    createWeeklyTrainingData,
    createTrainingMinutes,
    calculateTrainingVolumebypart,
    createExercisesPr,
  };
};
