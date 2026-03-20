'use client';

import { motion } from "framer-motion";

export default function ProgressBar({ progress }) {
  return (
    <div className="w-full h-[3px] bg-[#eeeeee] relative mb-10 overflow-hidden">
      <motion.div 
        className="absolute left-0 top-0 h-full bg-[#999999]"
        initial={false}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
      />
    </div>
  );
}
