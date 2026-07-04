export const formatWeekLabel = (week: string) => {
    const date = new Date(`${week}T00:00:00`);
    const month = date.getMonth() + 1;
    const day = date.getDate();
  
    return `${month}/${day}週`;
  };