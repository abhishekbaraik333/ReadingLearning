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
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  }),
};

const referralOptions = [
  "Friends & family",
  "App store",
  "Facebook",
  "TikTok",
  "Instagram",
  "TV / Streaming TV",
  "Google",
  "YouTube",
  "Radio",
  "News / Article /Blog",
  "Podcast",
  "Other"
];

export default function Referral() {
  const router = useRouter();
  const { referralSource, setReferralSource, direction, updateDirection } = useOnboarding();

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleOptionSelect = (option) => {
    setReferralSource(option);
    updateDirection(1);
    router.push("/finalizing");
  };

  return (
    <div className="w-full flex flex-col items-center bg-white overflow-x-hidden min-h-screen">
      <header className="w-full max-w-[450px] flex flex-col items-center pt-4 pb-0 px-5 relative border-b border-gray-100">
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
        <ProgressBar progress={100} />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[450px] px-8 pb-10 flex flex-col items-center pt-10"
      >
        <h1 className="text-[24px] font-bold text-[#221750] text-center mb-4 font-quicksand leading-tight">
          How did you hear about us?
        </h1>

        <div className="grid grid-cols-2 gap-2 w-full">
          {referralOptions.map((option) => (
            <motion.button
              key={option}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleOptionSelect(option)}
              className={`w-full py-6 px-2 rounded-full text-[16px] font-semibold transition-all duration-200 border-2 text-center flex items-center justify-center min-h-[64px] font-quicksand ${
                referralSource === option
                  ? "bg-purple-primary text-white border-purple-primary shadow-lg shadow-purple-primary/20"
                  : "bg-blue-unselected text-purple-dark border-[#cbd5e1]"
              }`}
            >
              {option}
            </motion.button>
          ))}
        </div>
      </motion.main>
    </div>
  );
}
