import type { NewExercise } from "./NewxExercise";

export type TrainingMenus = {
  id: string;
  tabId: string;
  exercises: NewExercise[];
};