"use client";
import { Chess } from "chess.js";
import { type Dispatch, type SetStateAction, useEffect, useState } from "react";
import { Button } from "~/components/ui/button";
import { motion } from "framer-motion";
import { Chessboard } from "react-chessboard";
import stockfish from "stockfish";

export function ChessBoard() {
  const [auto, setAuto] = useState(false);
  const [game, setGame] = useState(new Chess());
  const [position, setPosition] = useState(game.fen());
  const [engine, setEngine] = useState<any | null>(null);

  useEffect(() => {
    const newEngine = stockfish();
    newEngine.onmessage = (event: string) => {
      if (event.startsWith("bestmove")) {
        const bestMove = event.split(" ")[1];
        game.move(bestMove);
        setPosition(game.fen());
      }
    };
    setEngine(newEngine);
  }, [game]);

  const makeEngineMove = () => {
    if (engine) {
      engine.postMessage("position fen " + game.fen());
      engine.postMessage("go depth 15"); // Adjust depth for stronger/weaker moves
    }
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

    // Make the engine move after a short delay
    setTimeout(() => {
      makeEngineMove();
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
        makeEngineMove();
      }, 1000); // Make an engine move every second

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
