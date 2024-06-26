"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { NavigationMenuDemo } from "./header-nav";

export function Header() {
  const [isHovered, setIsHovered] = useState(false);
  return (
    <motion.header
      className={`static z-50 m-2 flex flex-row items-center justify-between rounded-lg bg-primary px-4  ${isHovered ? "shadow-[0px_0px_20px_rgba(50,100,255,1)]" : ""}`}
      initial={{ opacity: 0.5, y: -100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <div className=" flex flex-col items-center justify-center p-1">
        <h3 className="text-2xl font-semibold tracking-tight">
          Jonathan Peterson
        </h3>
        <p className="text-xs leading-7">Chess Coach</p>
      </div>
      <div className="flex flex-row items-center justify-center">
        <NavigationMenuDemo setIsHovered={setIsHovered} />
      </div>
      <div>
        <Button>
          <motion.span whileHover={{ size: 20 }} transition={{ duration: 0.5 }}>
            Sign in
          </motion.span>
        </Button>
      </div>
    </motion.header>
  );
}
