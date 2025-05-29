export function getNext7Days(): Date[] {
  const dates: Date[] = [];
  const today = new Date();

  for (let i = 0; i < 7; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date);
  }

  return dates;
}

export const getTimeFromDate = (datetime: any) => {
  const date = new Date(datetime);
  const hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const time = `${hours}:${formattedMinutes}`;
  return time;
};
