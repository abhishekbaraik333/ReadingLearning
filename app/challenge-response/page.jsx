'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import ProgressBar from "@/components/ProgressBar";
import { useImagePreload } from "@/hooks/useImagePreload";

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

const challengeContent = {
  "Lack of time": {
    title: "We get it: life gets busy!",
    content: "That's why we've created short 15-minute lessons that you can fit into your schedule a few times a week.\n\nDon't try to do too much. Consistency is key, and slow and steady wins the race!"
  },
  "Too expensive": {
    title: "Less expensive than a tutor!",
    content: "While the Reading.com program requires a paid subscription, we do our best to keep it affordable.\n\nIt's a fraction of the cost of a private tutor!"
  },
  "Ineffective program(s)": {
    title: "Reading.com is research-backed and proven to work!",
    content: "Not to throw shade on other \"educational\" apps, but a lot of them provide entertainment without real learning.\n\nOur co-learning method is based on the Science of Reading and proven to work!"
  },
  "Lack of motivation from them": {
    title: "Quick progress + fun = motivation",
    content: "Our lessons are fun and built so that your child progresses quickly, feels accomplished, and comes back for more!"
  },
  "Something else": {
    title: "Reading.com is research-backed and proven to work!",
    content: "Most methods for teaching how to read are challenging.\n\nWe're confident we've built the best learn-to-read program on earth, so you never have to look anywhere else!"
  }
};

export default function ChallengeResponse() {
  const router = useRouter();
  const { direction, updateDirection, homeChallenge } = useOnboarding();
  const isReady = useImagePreload("/lackoftime.webp");

  // Fallback if no challenge was selected
  const currentContent = challengeContent[homeChallenge] || challengeContent["Something else"];

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleContinue = () => {
    updateDirection(1);
    router.push("/learning-differences");
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
        <ProgressBar progress={27} />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[450px] px-8 flex flex-col items-center pt-8 flex-grow"
      >
        <div className="w-full flex justify-center mb-10">
          <img 
            src="/lackoftime.webp" 
            alt="Teaching challenge" 
            className="w-full max-w-[340px] object-contain rounded-3xl"
          />
        </div>

        <h1 className="text-[26px] font-bold text-[#221750] text-center leading-tight mb-6 px-4 font-quicksand">
          {currentContent.title}
        </h1>

        <div className="text-[18px] text-center text-purple-dark/90 font-medium mb-12 px-2 leading-relaxed whitespace-pre-line font-quicksand">
          {currentContent.content}
        </div>
      </motion.main>

      <motion.div
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
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
