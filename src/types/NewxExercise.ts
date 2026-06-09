export type NewExercise = {
    id: string;
    tabId:string;
    part: string;
    exerciseName: string;
    maxWeight: string;
    setWeight: string;
    sets: string;
    reps: string;
    completed?: boolean;
}