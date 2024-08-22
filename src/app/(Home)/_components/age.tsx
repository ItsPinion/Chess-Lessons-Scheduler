"use client";

import { useEffect, useState } from "react";
import { calculateAge } from "~/lib/calculateAge";

export function Age() {
  const [age, setAge] = useState(calculateAge("2004-03-15"));

  useEffect(() => {
    const interval = setInterval(() => {
      setAge(calculateAge("2006-03-15"));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="text-primary">
      {`${age.years} year[s] ${age.months} month[s] ${age.days} day[s] ${age.hours} hour[s] ${age.minutes} minutes and ${age.seconds} second[s] old`}{" "}
      male from human species,
    </span>
  );
}
