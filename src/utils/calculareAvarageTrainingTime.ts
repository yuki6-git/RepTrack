export const calculateAverageTrainingTime = (durations: number[]) => {
  if (durations.length === 0) {
    return 0;
  }
  const totalSeconds = durations.reduce((sum, duration) => {
    return sum + duration;
  }, 0);
  return Math.round(totalSeconds / durations.length / 60);
};
