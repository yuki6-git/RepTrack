import type { VolumeData } from "../../types/AnalyticsData";
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
  type ExercisePrData = {
    exerciseName: string;
    part: string;
    maxWeight: number;
    achievedDate: string;
  };
  const createExercisesPr = (exerciseRecords: ExerciseRecord[]) => {
    const currentPrExercises: Record<string, ExercisePrData> = {};
    exerciseRecords.forEach((exerciseRecord) => {
      const createdDate = formatDate(new Date(exerciseRecord.created_at));
      const recordWeight =
        exerciseRecord.max_weight && exerciseRecord.max_weight > 0
          ? exerciseRecord.max_weight
          : exerciseRecord.set_weight;
      const currentPr =
        currentPrExercises[exerciseRecord.exercise_name]?.maxWeight ?? 0;
      if (currentPr < recordWeight) {
        currentPrExercises[exerciseRecord.exercise_name] = {
          exerciseName: exerciseRecord.exercise_name,
          part: exerciseRecord.part,
          maxWeight: recordWeight,
          achievedDate: createdDate,
        };
      }
    });
    return Object.values(currentPrExercises).sort((a, b) => {
      return b.maxWeight - a.maxWeight;
    });
  };
  
  const calculateTrainingVolumebypart = (exerciseRecords: ExerciseRecord[]) => {
    const volumeByPart: Record<string, VolumeData> = {};
    exerciseRecords.forEach((exerciseRecord) => {
      const volume =
        exerciseRecord.set_weight * exerciseRecord.sets * exerciseRecord.reps;
      const currentData = volumeByPart[exerciseRecord.part];

      if (!currentData) {
        volumeByPart[exerciseRecord.part] = {
          part: exerciseRecord.part,
          totalVolume: volume,
          exercises: [{ exerciseName: exerciseRecord.exercise_name, volume }],
        };
        return;
      }
      volumeByPart[exerciseRecord.part] = {
        ...currentData,
        totalVolume: currentData.totalVolume + volume,
        exercises: [
          ...currentData.exercises,
          {
            exerciseName: exerciseRecord.exercise_name,
            volume,
          },
        ],
      };
    });
    return Object.values(volumeByPart);
  };

  return {
    createWeeklyTrainingData,
    createTrainingMinutes,
    calculateTrainingVolumebypart,
    createExercisesPr,
  };
};
