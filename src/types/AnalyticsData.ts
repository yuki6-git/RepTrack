export type VolumeData = {
  part: string;
  totalVolume: number;
  exercises: ExerciseVolume[];
};

export type TrainingMinutes = {
  date: string;
  duration: number;
};

export type CreateExercisesPr = {
  exerciseName: string;
  part: string;
  maxWeight: number;
  achievedDate: string;
};

export type ExerciseVolume = {
  exerciseName: string;
  volume: number;
};

export type CalculateTrainingVolumeByPart = {
  part: string;
  totalVolume: number;
  exercises: ExerciseVolume[];
};
export type AverageTrainingMinutesData = {
  label: string;
  averageMinutes: number;
};

export type TrainingMinutesListItem = {
  id: string;
  date: string;
  title: string;
  durationMinutes: number;
};

export type WeeklyTrainingData = {
  week: string;
  count: number;
};

export type ExercisePrData = {
  exerciseName: string;
  part: string;
  maxWeight: number;
  achievedDate: string;
};

export type TrainingVolumeData = {
  fill: string;
  part: string;
  totalVolume: number;
  exercises: ExerciseVolume[];
};

export type LatestFourVolumeData = {
  id: string;
  date: string;
  title: string;
  volumeData: VolumeData[];
};
