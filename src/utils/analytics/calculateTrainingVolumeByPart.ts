import type { VolumeData } from "../../types/AnalyticsData";
import type { ExerciseRecord } from "../../types/Workout";

export const calculateTrainingVolumeByPart = (
  exerciseRecords: ExerciseRecord[],
) => {
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
