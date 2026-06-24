export const formatDurationMinutes = (duration: number | null) => {
  if (!duration) {
    return "-";
  }

  return `${Math.round(duration / 60)}分`;
};
