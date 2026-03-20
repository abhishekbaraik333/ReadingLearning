'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import ProgressBar from "@/components/ProgressBar";
import { useState } from "react";

const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    transition: { duration: 0.3, ease: [0.43, 0.13, 0.23, 0.96] },
  }),
};

export default function TeachingReason() {
  const router = useRouter();
  const { direction, updateDirection, selectedReason, setSelectedReason } = useOnboarding();

  const reasons = [
    "I'm preparing my child for school",
    "My child is a struggling reader",
    "I'm homeschooling my child",
    "I want to bond with my child",
    "Something else"
  ];

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleReasonSelect = (reason) => {
    setSelectedReason(reason);
    updateDirection(1);
    
    if (reason === "I'm preparing my child for school" || 
        reason === "My child is a struggling reader" ||
        reason === "I'm homeschooling my child" ||
        reason === "I want to bond with my child" ||
        reason === "Something else") {
      router.push("/social-proof");
    } else {
      // Future navigation could go here
      alert(`Reason selected: ${reason}`);
    }
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <header className="w-full max-w-[450px] flex flex-col items-center pt-4 pb-0 px-5 relative">
        <button 
          className="absolute left-2 top-4 text-purple-dark flex items-center justify-center w-10 h-10 rounded-full hover:bg-black/5 transition-colors" 
          onClick={handleBack}
          aria-label="Back"
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" className="w-8 h-8">
            <g>
              <path d="M6.99219 12.3594C6.99219 12.625 7.09375 12.8516 7.30469 13.0547L13.3984 19.0156C13.5625 19.1875 13.7812 19.2734 14.0312 19.2734C14.5391 19.2734 14.9375 18.8828 14.9375 18.3672C14.9375 18.1172 14.8359 17.8906 14.6641 17.7188L9.17188 12.3594L14.6641 7C14.8359 6.82031 14.9375 6.59375 14.9375 6.34375C14.9375 5.83594 14.5391 5.44531 14.0312 5.44531C13.7812 5.44531 13.5625 5.53125 13.3984 5.70312L7.30469 11.6641C7.09375 11.8672 7 12.0938 6.99219 12.3594Z" fill="currentColor"></path>
            </g>
          </svg>
        </button>
        <img src="/VlQPe_m3.webp" alt="Reading.com" className="h-7 mb-3 object-contain" />
        <ProgressBar progress={80} />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[450px] px-5 pb-20 flex flex-col items-center"
      >
        <h1 className="text-[24px] font-bold mb-10 text-center text-purple-dark leading-snug">
          What's the main reason you want<br /> to teach your child to read?
        </h1>

        <div className="flex flex-col gap-3 w-full">
          {reasons.map((reason) => (
            <motion.button
              key={reason}
              whileTap={{ scale: 0.98 }}
              className={`min-h-[64px] py-6 px-8 rounded-full text-lg font-medium flex items-center justify-center transition-all duration-200 border-2 border-solid ${
                selectedReason === reason 
                  ? 'bg-purple-primary text-white border-purple-primary shadow-lg shadow-purple-primary/20' 
                  : 'bg-blue-unselected text-purple-dark border-[#cbd5e1]'
              }`}
              onClick={() => handleReasonSelect(reason)}
            >
              {reason}
            </motion.button>
          ))}
        </div>
      </motion.main>
    </div>
  );
}
