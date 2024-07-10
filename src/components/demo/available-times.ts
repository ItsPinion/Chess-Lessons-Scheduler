export const workingHours = [
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
  return workingHours.map((timeSlot) => {
    const [hours, minutes] = timeSlot[24].split(":").map(Number);
    let adjustedHours = (hours! + offset) % 24;
    if (adjustedHours < 0) adjustedHours += 24;

    const adjusted24 = `${String(adjustedHours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
    const adjusted12 = convertTo12HourFormat(adjustedHours, minutes!);

    return { 12: adjusted12, 24: adjusted24 };
  });
}

export const convertTimesToDate = (
  workingHours: {
    "12": string;
    "24": string;
  }[],
): {
  time: Date;
  "12": string;
  "24": string;
}[] => {
  return workingHours
    .map((time) => {
      const timeValue = time["12"].split(":").join(" ");

      const match = timeValue.match(/^(\d{1,2}) (\d{2})([ap]m)?$/i);
      if (!match) {
        console.error("Invalid time format");
        return null;
      }

      let hours = parseInt(match[1]!, 10);
      const minutes = parseInt(match[2]!, 10);
      const isPM = match[3]?.toLowerCase() === "pm";

      if (
        (isPM && (hours < 1 || hours > 12)) ||
        (!isPM && (hours < 0 || hours > 11))
      ) {
        console.error("Time out of range (1-12) in 12-hour format");
        return null;
      }

      if (isPM && hours !== 12) {
        hours += 12;
      } else if (!isPM && hours === 12) {
        hours = 0;
      }

      const currentDate = new Date();
      currentDate.setHours(hours, minutes);

      return { ...time, time: currentDate };
    })
    .filter(
      (time): time is { time: Date; "12": string; "24": string } =>
        time !== null,
    ); // Correctly filter out null values
};

export const findAvailableHours = (
  workingHours: {
    time: Date;
    "12": string;
    "24": string;
  }[],
  bookedHours: {
    time: Date;
  }[],
): {
  time: Date;
  "12": string;
  "24": string;
}[] => {
  return workingHours.filter(
    (time1) =>
      !bookedHours.some(
        (time2) =>
          time2.time.getHours() === time1.time.getHours() &&
          time2.time.getMinutes() === time1.time.getMinutes(),
      ),
  );
};

export function getOffset() {
  const userDate = new Date();
  const offset = -userDate.getTimezoneOffset() / 60;
  return offset;
}
