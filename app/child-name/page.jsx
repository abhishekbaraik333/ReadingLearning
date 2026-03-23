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

export default function ChildName() {
  const router = useRouter();
  const { direction, updateDirection, childName, setChildName } = useOnboarding();

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleContinue = () => {
    if (childName.trim().length > 0) {
      updateDirection(1);
      router.push("/personalizing");
    }
  };

  return (
    <div className="w-full flex flex-col items-center min-h-screen relative overflow-x-clip">
      <header className="w-full max-w-[450px] flex flex-col items-center pt-4 pb-0 px-5 relative shrink-0">
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
        <ProgressBar progress={43} />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[450px] px-8 flex flex-col items-center pt-8 flex-grow"
      >
        <h1 className="text-[24px] font-bold mb-10 text-center text-[#221750] leading-tight px-4 font-quicksand">
          What is your child's first name or nickname?
        </h1>

        <div className="w-full flex flex-col items-center gap-6">
          <input
            type="text"
            value={childName}
            onChange={(e) => setChildName(e.target.value)}
            placeholder="Enter your child's first name or nickname"
            className="w-full h-[50px] px-6 rounded-2xl border-2 border-slate-200 outline-none focus:border-black transition-all text-base font-medium text-purple-dark placeholder:text-slate-500 font-quicksand shadow-sm"
          />

          <div className="w-full bg-[#E8E6FF] rounded-full px-4 py-3 flex items-center justify-center">
            <p className="text-black text-[12px] font-medium text-center font-quicksand">
              Tip: You can add more profiles later (up to 3 children)
            </p>
          </div>

          <div className="flex flex-col items-center mt-4">
            <img 
              src="/kidSafe.webp" 
              alt="kidSAFE Certified" 
              className="h-14 object-contain mb-4"
            />
            <p className="text-[12px] text-center text-slate-600 font-medium leading-relaxed max-w-[280px] font-quicksand">
              We never share or sell any information!<br />
              Your child name is only used to personalize the experience.
            </p>
          </div>
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
          whileTap={childName.trim().length > 0 ? { scale: 0.98 } : {}}
          disabled={childName.trim().length === 0}
          className={`w-full h-16 rounded-full text-lg font-extrabold transition-all duration-300 ${
            childName.trim().length > 0
              ? 'bg-purple-primary text-white hover:scale-[1.01]'
              : 'bg-purple-primary/40 text-white cursor-not-allowed'
          }`}
          onClick={handleContinue}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
