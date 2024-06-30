import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 px-4">
      <SignIn />
    </div>
  );
}
