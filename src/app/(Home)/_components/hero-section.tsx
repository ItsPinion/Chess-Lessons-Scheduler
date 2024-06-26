import { Button } from "~/components/ui/button";
import { ChessBoard } from "./chess-board";

export function HeroSection() {
  return (
    <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
      <div className="flex w-[50%] flex-col items-center justify-center text-center">
        <b className="text-lg">
          <span className="text-purple-500  drop-shadow-[0px_0px_5px_rgba(168,85,247,1)]">
            AMBITION
          </span>{" "}
          IS THE{" "}
          <span className="text-red-500  drop-shadow-[0px_0px_5px_rgba(239,68,68,1)]">
            FIRST STEP
          </span>{" "}
          TOWARDS
        </b>
        <span className="cursor-pointer text-9xl font-bold text-primary hover:drop-shadow-[0px_0px_5px_rgba(50,100,255,1)]">
          SUCCESS
        </span>
        <p className="text-lg">
          {" "}
          <span className="text-green-500  drop-shadow-[0px_0px_5px_rgba(34,197,94,1)]">
            Available
          </span>{" "}
          for{" "}
          <span className="text-yellow-500  drop-shadow-[0px_0px_5px_rgba(234,179,8,1)]">
            Online Coaching
          </span>
        </p>

        <div className="flex flex-row items-center justify-center gap-3">
          <Button className="mt-4 text-white">Book Now</Button>
          <span className="mt-3">or</span>
          <Button className="mt-4 text-white">Free Lessions</Button>
        </div>
      </div>
      <ChessBoard />
    </div>
  );
}