import type { NewExercise } from "./NewExercise";

export type ExerciseListProps = {
  exercises: NewExercise[];
  mode: "draft" | "workout";
  onClickEditExercise?: (exercise: NewExercise) => void;
  onClickDeleteExercise?: (id: string) => void;
  onToggleComplete?: (id: string) => void;
};