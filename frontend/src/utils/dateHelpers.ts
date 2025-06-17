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
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const time = `${hours}:${formattedMinutes}`;
  return time;
};
export const getEndTime = (datetime: Date, duration: number) => {
  const startDate = new Date(datetime);
  console.log(startDate);
  const endDate = new Date(startDate.getTime() + duration * 60000);
  console.log(endDate);
  const hours = endDate.getHours();
  const minutes = endDate.getMinutes();
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const time = `${hours}:${formattedMinutes}`;
  return time;
};
export const convertDateToString = (datetime: any) => {
  return new Date(datetime).toLocaleDateString('de-DE');
};
