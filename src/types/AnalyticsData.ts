export type ExerciseVolume = {
  exerciseName: string;
  volume: number;
};

export type VolumeData = {
  part: string;
  totalVolume: number;
  exercises: ExerciseVolume[];
};
