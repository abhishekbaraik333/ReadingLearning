'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";

const pageVariants = {
  initial: (direction) => ({
    opacity: 0,
    x: direction > 0 ? 50 : -50,
  }),
  animate: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  }),
};

export default function Woohoo() {
  const router = useRouter();
  const { childName, childGender, selectedAvatar, direction, updateDirection } = useOnboarding();

  // Helper to get correct pronoun based on gender
  const getPronoun = () => {
    if (childGender === "Boy") return "his";
    if (childGender === "Girl") return "her";
    return "their";
  };

  const handleContinue = () => {
    updateDirection(1);
    router.push("/save-progress");
  };

  return (
    <div className="w-full flex flex-col items-center bg-white min-h-screen relative overflow-x-clip pt-12">
      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[450px] px-8 flex flex-col items-center flex-grow"
      >
        <h1 className="text-[28px] font-bold text-[#221750] mb-8 font-quicksand text-center">
          Woohoo!
        </h1>

        {/* Profile Avatar with Checkmark */}
        <div className="relative mb-8">
          <div className="">
            <img 
              src={`/avatar${selectedAvatar || 1}first.webp`} 
              alt="Child Avatar" 
              className="w-[115px] h-full object-cover"
            />
          </div>
          
        </div>

        <div className="text-center space-y-4 mb-4">
          <p className="text-[18px] text-[#221750] font-medium font-quicksand leading-snug px-4">
            Based on your answers, Reading.com is a perfect fit for <span className="font-medium">{childName || 'your child'}</span>.
          </p>
          <p className="text-[18px] text-[#221750] font-medium font-quicksand leading-snug px-4">
            Get ready for {getPronoun()} learn-to-read journey!
          </p>
        </div>

        {/* Game Preview Image */}
        <div className="w-full rounded-[24px] overflow-hidden shadow-xl mb-12 border border-slate-100">
          <img 
            src={`/avatar${selectedAvatar || 1}second.webp`} 
            alt="Learning Journey Preview" 
            className="w-full h-auto object-cover"
          />
        </div>
      </motion.main>

      <motion.div
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[450px] px-8 sticky bottom-2 z-50 mt-auto"
      >
        <motion.button 
          whileTap={{ scale: 0.98 }}
          className="w-full h-16 bg-purple-primary text-white rounded-full text-lg font-extrabold transition-all"
          onClick={handleContinue}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
