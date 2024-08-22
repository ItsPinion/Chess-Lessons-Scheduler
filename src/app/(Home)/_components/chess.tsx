"use client";

import { Chessboard } from "react-chessboard";

export function PlayRandomMoveEngine() {
  return (
    <Chessboard
      id="BasicBoard"
      customDarkSquareStyle={{ backgroundColor: "#3b82f6" }}
      customLightSquareStyle={{ backgroundColor: "#ffffff" }}
      arePremovesAllowed={true}
    />
  );
}
