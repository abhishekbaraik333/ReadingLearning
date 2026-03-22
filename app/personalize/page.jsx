'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import ProgressBar from "@/components/ProgressBar";

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

export default function Personalize() {
  const router = useRouter();
  const { direction, updateDirection } = useOnboarding();

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleContinue = () => {
    updateDirection(1);
    router.push("/gender");
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
        <ProgressBar progress={35} />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[450px] px-8 pb-20 flex flex-col items-center pt-8"
      >
        <h1 className="text-[26px] font-bold text-[#221750] text-center leading-tight mb-4 px-2">
          Just a few more questions to personalize your child's profile!
        </h1>

        <p className="text-[18px] text-center text-purple-dark/80 font-medium mb-6 px-4 leading-relaxed font-quicksand">
          Reading.com meets your child at their level and makes reading click.
        </p>

        <p className="text-[18px] text-center text-[#221750] font-bold mb-8 font-quicksand">
          Kids love it!
        </p>

        <div className="w-full flex justify-center mb-10">
          <img 
            src="/KidsLoveit.webp" 
            alt="Happy child using Reading.com" 
            className="w-full max-w-[340px] object-contain rounded-2xl shadow-xl shadow-black/5"
          />
        </div>

        <motion.button 
          whileTap={{ scale: 0.98 }}
          className="w-full h-16 bg-purple-primary text-white rounded-full text-xl font-extrabold shadow-lg shadow-purple-primary/20 hover:scale-[1.01] transition-all"
          onClick={handleContinue}
        >
          Continue
        </motion.button>
      </motion.main>
    </div>
  );
}
