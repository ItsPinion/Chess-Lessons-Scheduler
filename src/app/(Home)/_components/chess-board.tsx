"use client";
import { motion } from "framer-motion";
import { useRef } from "react";

const chessPieces = {
  white: [
    {
      name: "LightBishop",
      src: "https://static.wikia.nocookie.net/chess/images/d/d7/LightBishop.png",
      count: 2,
      x: 63 * 3,
      y: 454,
      adj: 188,
    },
    {
      name: "LightKing",
      src: "https://static.wikia.nocookie.net/chess/images/7/78/LightKing.png",
      count: 1,
      x: 63 * 5,
      y: 391,
      adj: 0,
    },
    {
      name: "LightKnight",
      src: "https://static.wikia.nocookie.net/chess/images/3/32/LightKnight.png",
      count: 2,
      x: 63 * 2,
      y: 360,
      adj: 315,
    },
    {
      name: "LightPawn",
      src: "https://static.wikia.nocookie.net/chess/images/3/32/LightPawn.png",
      count: 8,
      x: 63 * 1,
      y: 235,
      adj: 63,
    },
    {
      name: "LightQueen",
      src: "https://static.wikia.nocookie.net/chess/images/4/42/LightQueen.png",
      count: 1,
      x: 63 * 4,
      y: 48,
      adj: 0,
    },
    {
      name: "LightRook",
      src: "https://static.wikia.nocookie.net/chess/images/9/97/LightRook.png",
      count: 2,
      x: 63,
      y: 17,
      adj: 440,
    },
  ],
  dark: [
    {
      name: "DarkBishop",
      src: "https://static.wikia.nocookie.net/chess/images/c/c3/DarkBishop.png",
      count: 2,
      x: 63.5 * 3,
      y: -15,
      adj: 189,
    },
    {
      name: "DarkKing",
      src: "https://static.wikia.nocookie.net/chess/images/d/d7/DarkKing.png",
      count: 1,
      x: 63.25 * 4,
      y: 48,
      adj: 0,
    },
    {
      name: "DarkKnight",
      src: "https://static.wikia.nocookie.net/chess/images/7/7d/DarkKnight.png",
      count: 2,
      x: 63.5 * 2,
      y: 79,
      adj: 315,
    },
    {
      name: "DarkPawn",
      src: "https://static.wikia.nocookie.net/chess/images/1/8c/DarkPawn.png",
      count: 8,
      x: 64 * 1,
      y: 79,
      adj: 63,
    },
    {
      name: "DarkQueen",
      src: "https://static.wikia.nocookie.net/chess/images/9/90/DarkQueen.png",
      count: 1,
      x: 63.4 * 5,
      y: 392.5,
      adj: 0,
    },
    {
      name: "DarkRook",
      src: "https://static.wikia.nocookie.net/chess/images/b/b9/DarkRook.png",
      count: 2,
      x: 64,
      y: 424,
      adj: 440,
    },
  ],
};
import { ChessBoardSVG } from "~/app/(Home)/_components/BlueChessboard";

export function ChessBoard() {
  const constraintsRef = useRef(null);
  return (
    <div className="flex w-[50%] flex-col items-center justify-center p-6">
      <motion.div
        ref={constraintsRef}
        className="flex flex-row items-center justify-start"
      >
        <div className="flex flex-col items-center justify-start">
          {chessPieces.white.map((piece) =>
            Array.from({ length: piece.count }).map((_, i) => {
              const adjustedHoverPosition = {
                x: piece.x + i * piece.adj,
                y: piece.y - i * 31.5,
                scale: 2,
              };

              return (
                <motion.img
                  key={`${piece.name}-${i}`}
                  src={piece.src}
                  alt="chess"
                  width={35}
                  height={35}
                  whileInView={adjustedHoverPosition}
                  transition={{ duration: 1 }}
                  drag
                  dragConstraints={constraintsRef}
                  whileDrag={{ scale: 2.5 }}
                  whileTap={{ scale: 2.5 }}
                />
              );
            }),
          )}
        </div>
        <ChessBoardSVG />
        <div className="flex flex-col items-center justify-start">
          {chessPieces.dark.map((piece) =>
            Array.from({ length: piece.count }).map((_, i) => {
              const adjustedHoverPosition = {
                x: -piece.x - i * piece.adj,
                y: -piece.y - i * 31.5,
                scale: 2,
              };

              return (
                <motion.img
                  key={`${piece.name}-${i}`}
                  src={piece.src}
                  alt="chess"
                  width={35}
                  height={35}
                  whileInView={adjustedHoverPosition}
                  transition={{ duration: 1 }}
                  drag
                  dragConstraints={constraintsRef}
                />
              );
            }),
          )}
        </div>
      </motion.div>
    </div>
  );
}
