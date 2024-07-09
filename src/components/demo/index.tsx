"use client";

import { Calendar } from "~/components/calendar";

import {
  CalendarDate,
  getLocalTimeZone,
  getWeeksInMonth,
  today,
} from "@internationalized/date";
import type { DateValue } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { useRouter, useSearchParams } from "next/navigation";
import * as React from "react";
// import { FormPanel } from "./form-panel";

import dynamic from "next/dynamic";
const FormPanel = dynamic(() => import("./form-panel"), {
  ssr: false,
});
const RightPanel = dynamic(() => import("./right-panel"), {
  ssr: false,
});

function addDays(date: CalendarDate, days: number): CalendarDate {
  const newDate = new Date(date.toString());
  newDate.setDate(newDate.getDate() + days);
  return new CalendarDate(
    newDate.getFullYear(),
    newDate.getMonth() + 1,
    newDate.getDate(),
  );
}

import { LeftPanel } from "./left-panel";

export function Demo() {
  const router = useRouter();
  const { locale } = useLocale();

  const searchParams = useSearchParams();
  const dateParam = searchParams.get("date");
  const slotParam = searchParams.get("slot");

  const timeZone = "America/New_York";
  const [date, setDate] = React.useState(today(getLocalTimeZone()));
  const [focusedDate, setFocusedDate] = React.useState<CalendarDate | null>(
    date,
  );

  const weeksInMonth = getWeeksInMonth(focusedDate as DateValue, locale);

  const handleChangeDate = (date: DateValue) => {
    setDate(date as CalendarDate);
    const url = new URL(window.location.href);
    url.searchParams.set(
      "date",
      date.toDate(timeZone).toISOString().split("T")[0]!,
    );
    router.push(url.toString());
  };

  const handleChangeAvailableTime = (time: string) => {
    const timeValue = time.split(":").join(" ");

    const match = timeValue.match(/^(\d{1,2}) (\d{2})([ap]m)?$/i);
    if (!match) {
      console.error("Invalid time format");
      return null;
    }

    let hours = Number.parseInt(match[1]!);
    const minutes = Number.parseInt(match[2]!);
    const isPM = match[3] && match[3].toLowerCase() === "pm";

    if (isPM && (hours < 1 || hours > 12)) {
      console.error("Time out of range (1-12) in 12-hour format");
      return null;
    }

    if (isPM && hours !== 12) {
      hours += 12;
    } else if (!isPM && hours === 12) {
      hours = 0;
    }

    const currentDate = date.toDate(timeZone);
    currentDate.setHours(hours, minutes);

    const url = new URL(window.location.href);
    url.searchParams.set("slot", currentDate.toISOString());
    router.push(url.toString());
  };

  const showForm = !!dateParam && !!slotParam;

  return (
    <div className="mx-auto w-full max-w-max rounded-md bg-[#16181b] px-8 py-6">
      <div className="flex gap-3">
        <LeftPanel showForm={showForm} />
        {!showForm ? (
          <>
            <Calendar
              minValue={today(getLocalTimeZone())}
              defaultValue={today(getLocalTimeZone())}
              value={date}
              onChange={handleChangeDate}
              onFocusChange={(focused) => setFocusedDate(focused)}
              maxValue={addDays(today(getLocalTimeZone()), 4)}
            />
            <RightPanel
              {...{ date, timeZone, weeksInMonth, handleChangeAvailableTime }}
            />
          </>
        ) : (
          <FormPanel />
          // <></>
        )}
      </div>
    </div>
  );
}
