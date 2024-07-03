"use client";
import { Demo } from "~/components/demo";
import { Suspense } from "react";
import { redirect, usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function BookPage({
  searchParams,
}: {
  searchParams: { date: string };
}) {
  const pathname = usePathname();
  const {isLoaded} = useUser()
  if (!isLoaded){
    redirect("/sign-in")
  }

  if (!searchParams.date) {
    const today = new Date();
    const dateString = today.toISOString().slice(0, 10);

    redirect(pathname + "?date=" + dateString);
  }

  return (
    <main className="flex flex-col items-center justify-center min-h-screen">
      <div className="my-10">
        <Suspense>
          <Demo />
        </Suspense>
      </div>
    </main>
  );
}
