"use client";

import React, { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

const PlayerVsRandomChessboard: React.FC = () => {
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());

  const makeRandomMove = () => {
    const possibleMoves = game.moves();

    if (game.isGameOver() || possibleMoves.length === 0) return;

    const randomIndex = Math.floor(Math.random() * possibleMoves.length);

    const move = possibleMoves[randomIndex];

    if (move === undefined) return; // Check if move is undefined

    game.move(move);
    setPosition(game.fen());
  };

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: "q", // Always promote to a queen for simplicity
    });

    if (move === null) return false; // Illegal move

    setPosition(game.fen());

    // Make a random move for the computer after a short delay
    setTimeout(() => {
      makeRandomMove();
    }, 500);

    return true;
  };

  return (
    <Chessboard
      position={position}
      onPieceDrop={onDrop}
      customDarkSquareStyle={{ backgroundColor: "#3b82f6" }}
      customLightSquareStyle={{ backgroundColor: "#ffffff" }}
    />
  );
};

export default PlayerVsRandomChessboard;
