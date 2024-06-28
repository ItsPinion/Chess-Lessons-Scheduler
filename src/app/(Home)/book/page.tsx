"use client";
import { Demo } from "~/components/demo";
import { Suspense } from "react";
import { redirect, usePathname } from "next/navigation";

export default function Page({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  const pathname = usePathname();
  if (!searchParams.date) {
    const today = new Date();
    const dateString = today.toISOString().slice(0, 10);

    redirect(pathname + "?date=" + dateString);
  }

  return (
    <main className="flex flex-col items-center justify-center">
      <div className="my-10">
        <Suspense>
          <Demo />
        </Suspense>
      </div>
    </main>
  );
}
