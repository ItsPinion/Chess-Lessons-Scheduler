import { SignUp } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <span className="rounded-sm hover:shadow-[0px_0px_15px_rgba(50,100,255,1)]">
        <SignUp />
      </span>
    </div>
  );
}
