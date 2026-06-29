import type { ExercisePrData } from "../../types/AnalyticsData";
import type { ExerciseRecord } from "../../types/Workout";
import { formatDate } from "../data/formatdate";

export const createExercisesPr = (exerciseRecords: ExerciseRecord[]) => {
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
