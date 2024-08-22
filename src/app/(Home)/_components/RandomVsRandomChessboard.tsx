"use client";
import { useEffect, useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export function PlayRandomMoveEngine() {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());

  const makeRandomMove = () => {
    const possibleMoves = game.moves();

    if (game.isGameOver() || possibleMoves.length === 0) return; // Check if game is over

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);
    const move = possibleMoves[randomIndex];

    if (move === undefined) return; // Check if move is undefined

    game.move(move);
    setPosition(game.fen());
  };

  useEffect(() => {
    const interval = setInterval(() => {
      makeRandomMove();
    }, 1000); // Make a random move every second

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [game]);

  return (
    <Chessboard
      position={position}
      customDarkSquareStyle={{ backgroundColor: "#3b82f6" }}
      customLightSquareStyle={{ backgroundColor: "#ffffff" }}
    />
  );
}
