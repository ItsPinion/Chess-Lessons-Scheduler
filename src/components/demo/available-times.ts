function convertTo12HourFormat(hours: number, minutes: number): string {
  const period = hours >= 12 ? "pm" : "am";
  const adjustedHours = hours % 12 || 12; // Converts 0 to 12 for midnight
  return `${adjustedHours}:${String(minutes).padStart(2, "0")}${period}`;
}

export function getAvailableTimes(offset: number) {
  const times = [
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

  return times.map((timeSlot) => {
    const [hours, minutes] = timeSlot[24].split(":").map(Number);
    let adjustedHours = (hours! + offset) % 24;
    if (adjustedHours < 0) adjustedHours += 24;

    const adjusted24 = `${String(adjustedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    const adjusted12 = convertTo12HourFormat(adjustedHours, minutes!);

    return { 12: adjusted12, 24: adjusted24 };
  });
}

export function formatTimeFromISO(isoString: string): {
  "12": string;
  "24": string;
} {
  const date = new Date(isoString);

  const hours24 = date.getUTCHours();
  const minutes = date.getUTCMinutes();

  const formatted24 = `${String(hours24).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;

  const period = hours24 >= 12 ? "pm" : "am";
  const hours12 = hours24 % 12 || 12;
  const formatted12 = `${hours12}:${String(minutes).padStart(2, "0")}${period}`;

  return {
    "12": formatted12,
    "24": formatted24,
  };
}

export function getOffset() {
  const userDate = new Date();
  const offset = -userDate.getTimezoneOffset() / 60;
  return offset;
}
