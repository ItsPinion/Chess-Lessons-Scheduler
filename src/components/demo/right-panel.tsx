"use client";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";

import type { DateValue } from "@react-aria/calendar";
import { useLocale } from "@react-aria/i18n";
import {
  convertTimesToDate,
  getAvailableTimes,
  getOffset,
} from "./available-times";
import { useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getAvaiavleTimesbyDate } from "~/server/lesson";
import { useEffect } from "react";

import { waveform } from "ldrs";

waveform.register();

export default function  RightPanel({
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

  const workingHours = getAvailableTimes(getOffset());
  const realWorkingHours = convertTimesToDate(workingHours);

  const dateQuery = useSearchParams().get("date")!;

  const {
    data: avaiavleTimesbyDate,
    refetch,
    isLoading,
    isRefetching
  } = useQuery({
    queryKey: ["allURL"],
    queryFn: () => getAvaiavleTimesbyDate(dateQuery, realWorkingHours),
  });

  useEffect(() => {
    async function fetchData() {
      console.log("refetch");
      await refetch();
    }
    void fetchData();
  }, [dateQuery, refetch]);

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
            {(isLoading || isRefetching) ? (
              <div className="grid gap-2 pr-3">
                {workingHours?.map((workingHour) => (
                  <Button
                    className="text-white"
                    key={workingHour[time as "12" | "24"]}
                  >
                    <l-waveform
                      size="30"
                      stroke="3.5"
                      speed="1"
                      color="white"
                    ></l-waveform>
                  </Button>
                ))}
              </div>
            ) : avaiavleTimesbyDate && avaiavleTimesbyDate?.length > 0 ? (
              <div className="grid gap-2 pr-3">
                {avaiavleTimesbyDate.map((availableTime) => (
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
            ) : (
              <p className="text-center text-muted-foreground">
                All the time slots are booked for this date
              </p>
            )}
          </ScrollArea>
        </TabsContent>
      ))}
    </Tabs>
  );
}
