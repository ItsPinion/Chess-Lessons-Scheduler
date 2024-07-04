"use client";
import { Demo } from "~/components/demo";
import { Suspense } from "react";
import { redirect, usePathname } from "next/navigation";

export default function BookPage({
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
    <main className="flex min-h-screen flex-col items-center justify-center">
      <Suspense>
        <Demo />
      </Suspense>
    </main>
  );
}
