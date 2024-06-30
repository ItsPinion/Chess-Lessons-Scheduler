"use client";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import type { DateValue } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import { getAvailableTimes, getOffset } from "./available-times";
import { useSearchParams } from "next/navigation";

export function RightPanel({
  date,
  timeZone,
  weeksInMonth,
  handleChangeAvailableTime,
}: {
  date: DateValue;
  timeZone: string;
  weeksInMonth: number;
  handleChangeAvailableTime: (time: string) => void;
}) {
  const { locale } = useLocale();
  const [dayNumber, dayName] = date
    .toDate(timeZone)
    .toLocaleDateString(locale, {
      weekday: "short",
      day: "numeric",
    })
    .split(" ");

  
  const availableTimes = getAvailableTimes(getOffset());

  const searchParams = useSearchParams();
  console.log(searchParams.get("date")!);
  return (
    <Tabs
      defaultValue="12"
      className="flex w-[280px] flex-col gap-4 border-l pl-6"
    >
      <div className="flex items-center justify-between">
        <p
          aria-hidden
          className="align-center text-md text-gray-12 flex-1 font-bold"
        >
          {dayName} <span className="text-gray-11">{dayNumber}</span>
        </p>
        <TabsList className="grid w-fit grid-cols-2">
          <TabsTrigger value="12">12h</TabsTrigger>
          <TabsTrigger value="24">24h</TabsTrigger>
        </TabsList>
      </div>
      {["12", "24"].map((time) => (
        <TabsContent key={time} value={time}>
          <ScrollArea
            type="always"
            className="h-full"
            style={{
              maxHeight: weeksInMonth > 5 ? "380px" : "320px",
            }}
          >
            <div className="grid gap-2 pr-3">
              {availableTimes.map((availableTime) => (
                <Button
                  className="text-white"
                  onClick={() =>
                    handleChangeAvailableTime(
                      availableTime[time as "12" | "24"],
                    )
                  }
                  key={availableTime[time as "12" | "24"]}
                >
                  {availableTime[time as "12" | "24"]}
                </Button>
              ))}
            </div>
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
}
