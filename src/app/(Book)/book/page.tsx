import { Demo } from "~/components/demo";
import { Suspense } from "react";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default function Page({
  searchParams,
}: {
  searchParams: { date: string }; 
}) {
  const today = new Date();
  const dateString = today.toISOString().slice(0, 10);

  if (searchParams.date) {
    const pathname = headers().get("x-current-path");

    redirect(pathname + "?date=" + dateString);
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col items-center justify-center gap-8 px-5">
      <div className="my-4">
        <Suspense>
          <Demo />
        </Suspense>
      </div>
    </main>
  );
}
