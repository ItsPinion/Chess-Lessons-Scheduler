export function calculateAge(dateString: string): {
  years: number;
  months: number;
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} {
  const startDate = new Date(dateString);
  const endDate = new Date();

  
  let diff = endDate.getTime() - startDate.getTime();

  const msPerSecond = 1000;
  const msPerMinute = msPerSecond * 60;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;

  const years = endDate.getFullYear() - startDate.getFullYear();
  const months = endDate.getMonth() - startDate.getMonth() + years * 12;
  const days = Math.floor(diff / msPerDay);
  diff -= days * msPerDay;

  const hours = Math.floor(diff / msPerHour);
  diff -= hours * msPerHour;

  const minutes = Math.floor(diff / msPerMinute);
  diff -= minutes * msPerMinute;

  const seconds = Math.floor(diff / msPerSecond);

  return {
    years: Math.floor(months / 12),
    months: months % 12,
    days: days % 30,
    hours,
    minutes,
    seconds,
  };
}
