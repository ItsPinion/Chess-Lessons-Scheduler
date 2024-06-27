"use client";

import { motion } from "framer-motion";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="m-20 flex flex-col items-center justify-center">
      <motion.span className="rounded-sm hover:shadow-[0px_0px_15px_rgba(50,100,255,1)]"
      initial={{ scale: 0.5 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.2 }}
      >
        <SignIn />
      </motion.span>
    </div>
  );
}
