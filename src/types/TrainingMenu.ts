import type { NewExercise } from "./NewExercise";

export type TrainingMenus = {
  id: string;
  tabId: string;
  exercises: NewExercise[];
};