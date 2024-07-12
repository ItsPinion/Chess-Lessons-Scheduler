"use client";
import { Demo } from "~/components/demo";
import { Suspense } from "react";
import { redirect, usePathname } from "next/navigation";
import { format } from "date-fns-tz";

export default function BookPage({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  const pathname = usePathname();

  if (!searchParams.date) {
    const today = new Date();
    const dateString = format(today, "yyyy-MM-dd");

    redirect(pathname + "?date=" + dateString);
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Suspense>
        <Demo />
      </Suspense>
    </main>
  );
}
