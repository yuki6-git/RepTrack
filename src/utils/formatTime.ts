export const formatTime = (dateTime: string | null) => {
  if (!dateTime) {
    return "-";
  }
  return new Date(dateTime).toLocaleTimeString("ja-JP", {
    hour: "2-digit",
    minute: "2-digit",
  });
};
