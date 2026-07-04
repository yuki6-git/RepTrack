export const calculateAverageTrainingTime = (durations: number[]) => {
  if (durations.length === 0) {
    return 0;
  }
  const totalMinutes = durations.reduce((sum, duration) => {
    return sum + duration;
  }, 0);
  return Math.round(totalMinutes / durations.length);
};
