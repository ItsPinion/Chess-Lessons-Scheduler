"use client";
import { Chess } from "chess.js";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import { Chessboard } from "react-chessboard";

export function ChessBoard() {
  const [auto, setAuto] = useState(false);
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

  const onDrop = (sourceSquare: string, targetSquare: string) => {
    if (auto) return false; // Prevent moves if auto mode is on

    const move = game.move({
      from: sourceSquare,
      to: targetSquare,
      promotion: 'q', // Always promote to a queen for simplicity
    });

    if (move === null) return false; // Illegal move

    setPosition(game.fen());

    // Make a random move for the computer after a short delay
    setTimeout(() => {
      makeRandomMove();
    }, 500);

    return true;
  };

  const resetGame = () => {
    const newGame = new Chess();
    setGame(newGame);
    setPosition(newGame.fen());
  };

  useEffect(() => {
    if (auto) {
      const interval = setInterval(() => {
        makeRandomMove();
      }, 1000); // Make a random move every second

      return () => clearInterval(interval); // Clear interval on component unmount
    }
  }, [auto, game]);

  return (
    <motion.div
      className="flex w-[50%] flex-col items-center justify-center px-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      <span className="flex w-full flex-row items-center justify-between">
        <span className="flex flex-row items-center justify-center text-xl font-extrabold text-primary">
          <b>Auto play</b>
          <Toggle setAuto={setAuto} auto={auto} />
        </span>
        <Button
          className="text-white"
          onClick={resetGame}
        >
          Restart
        </Button>
      </span>
      <Chessboard
        position={position}
        onPieceDrop={onDrop}
        customDarkSquareStyle={{ backgroundColor: "#3b82f6" }}
        customLightSquareStyle={{ backgroundColor: "#ffffff" }}
        arePiecesDraggable={!auto} // Disable dragging if in auto mode
      />
    </motion.div>
  );
}

function Toggle({
  auto,
  setAuto,
}: {
  auto: boolean;
  setAuto: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <label
      className="rocker rocker-small
     relative right-5 scale-50"
    >
      <input type="checkbox" checked={auto} onChange={() => setAuto(!auto)} />
      <span className="switch-left">Yes</span>
      <span className="switch-right">No</span>
    </label>
  );
}
