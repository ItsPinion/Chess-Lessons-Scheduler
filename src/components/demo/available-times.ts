export const workingTimes = [
  { "12": "2:00pm", "24": "14:00" },
  { "12": "3:00pm", "24": "15:00" },
  { "12": "4:00pm", "24": "16:00" },
  { "12": "5:00pm", "24": "17:00" },
  { "12": "6:00pm", "24": "18:00" },
  { "12": "7:00pm", "24": "19:00" },
  { "12": "8:00pm", "24": "20:00" },
  { "12": "9:00pm", "24": "21:00" },
  { "12": "10:00pm", "24": "22:00" },
];

function convertTo12HourFormat(hours: number, minutes: number): string {
  const period = hours >= 12 ? "pm" : "am";
  const adjustedHours = hours % 12 || 12;
  return `${adjustedHours}:${String(minutes).padStart(2, "0")}${period}`;
}

export function getAvailableTimes(offset: number) {
  return workingTimes.map((timeSlot) => {
    const [hours, minutes] = timeSlot[24].split(":").map(Number);
    let adjustedHours = (hours! + offset) % 24;
    if (adjustedHours < 0) adjustedHours += 24;

    const adjusted24 = `${String(adjustedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    const adjusted12 = convertTo12HourFormat(adjustedHours, minutes!);

    return { 12: adjusted12, 24: adjusted24 };
  });
}

export function formatTime(date: Date) {
  let hours = date.getHours();
  const minutes = date.getMinutes();

  const minutesStr = minutes.toString().padStart(2, "0");

  const time24 = `${hours}:${minutesStr}`;

  const ampm = hours >= 12 ? "pm" : "am";
  hours = hours % 12;

  const time12 = `${hours}:${minutesStr}${ampm}`;

  return JSON.stringify({
    "12": time12,
    "24": time24,
  });
}

export function getOffset() {
  const userDate = new Date();
  const offset = -userDate.getTimezoneOffset() / 60;
  return offset;
}

export function getAvaiavleTimes(
  workingTimes: string[],
  selectedTimes: string[],
): string[] {
  // Create a Set from the second array for quick lookup
  const set2 = new Set(selectedTimes);

  // Filter elements in array1 that are not in array2
  return workingTimes.filter((element) => !set2.has(element));
}
