'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0 }
};

export default function FinalizingPlan() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    const duration = 4000; // 4 seconds
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress(prev => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          setComplete(true);
          return 100;
        }
        return next;
      });
    }, interval);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (complete) {
      setTimeout(() => {
        router.push("/congrats");
      }, 800);
    }
  }, [complete, router]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white overflow-x-hidden pt-6 px-6">
      <header className="w-full max-w-[450px] flex justify-center mb-8">
        <img src="/VlQPe_m3.webp" alt="Reading.com" className="h-7 object-contain" />
      </header>

      <motion.div
        variants={pageVariants}
        initial="initial"
        animate="animate"
        className="w-full max-w-[450px] flex flex-col items-center"
      >
        <h1 className="text-[24px] font-bold text-[#221750] mb-6 font-quicksand text-center">
          Finalizing your plan...
        </h1>

        <div className="w-full h-[28px] bg-[#EEEEEE] rounded-md overflow-hidden relative mb-12">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
            className="h-full bg-gradient-to-r from-[#82E9FF] via-[#A594F9] to-[#D55CFF]"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[12px] font-bold text-black font-quicksand">
              {Math.floor(progress)}%
            </span>
          </div>
        </div>

        <div className="w-full rounded-[24px] overflow-hidden shadow-2xl">
          <img 
            src="/processing.webp" 
            alt="Finalizing plan preview" 
            className="w-full h-auto object-cover"
          />
        </div>
      </motion.div>
    </div>
  );
}
