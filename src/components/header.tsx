"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { NavigationMenuDemo } from "./header-nav";
import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

export function Header() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.header
      className={`static z-50 m-2 flex flex-row items-center justify-between rounded-lg bg-primary px-6  ${isHovered ? "shadow-[0px_0px_20px_rgba(50,100,255,1)]" : ""}`}
      initial={{ opacity: 0.5, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className=" flex flex-col items-center justify-center">
        <h3 className="text-2xl font-semibold tracking-tight">
          Jonathan Peterson
        </h3>
        <p className="text-xs leading-7">Chess Coach</p>
      </div>
      <NavigationMenuDemo setIsHovered={setIsHovered} />
      <motion.div
        className="flex flex-row items-center justify-center gap-3"
        initial={{ scale: 1.25 }}
        whileHover={{ scale: 1.5 }}
        transition={{ duration: 0.2 }}
      >
        <SignedOut>
          <SignInButton />
          <SignUpButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </motion.div>
    </motion.header>
  );
}
