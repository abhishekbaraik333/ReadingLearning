'use client';

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import { useImagePreload } from "@/hooks/useImagePreload";

const pageVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.6 } },
  exit: { opacity: 0 }
};

export default function Personalizing() {
  const router = useRouter();
  const { childName, selectedReason, homeChallenge, selectedStatus, setTeacherRecommended } = useOnboarding();
  const isReady = useImagePreload("/didyouknow.webp");
  const [percentages, setPercentages] = useState([0, 0, 0, 0]);
  const [complete, setComplete] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const popupHandledRef = useRef(false);
  const [currentStepInfo, setCurrentStepInfo] = useState({ step: 0, startPercent: 0 });

  const durations = [3000, 2000, 4000, 2500]; // ms
  const goalText = homeChallenge || selectedReason || selectedStatus?.replace("Yes, ", "") || "your goal";

  const progressSteps = [
    { label: `Analyzing your goal (${goalText})`, id: 0 },
    { label: `Analyzing ${childName || 'your child'}'s experience`, id: 1 },
    { label: "Analyzing other answers", id: 2 },
    { label: `Personalizing ${childName || 'your child'}'s profile`, id: 3 },
  ];

  const startStep = (s, startP = 0) => {
    const duration = durations[s];
    const startTime = Date.now() - (duration * (startP / 100));
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const rawProgress = Math.min((elapsed / duration) * 100, 100);
      
      const jitter = Math.random() * 5 - 2.5; 
      const displayProgress = Math.min(Math.max(rawProgress + (rawProgress < 100 ? jitter : 0), 0), 100);

      // Trigger popup at step 1 (second bar) and 64%
      if (s === 1 && displayProgress >= 64 && !popupHandledRef.current) {
        clearInterval(interval);
        setPercentages(prev => {
          const next = [...prev];
          next[1] = 64;
          return next;
        });
        setCurrentStepInfo({ step: 1, startPercent: 64 });
        setShowPopup(true);
        return;
      }

      setPercentages(prev => {
        const next = [...prev];
        next[s] = Math.floor(displayProgress);
        return next;
      });

      if (elapsed >= duration) {
        clearInterval(interval);
        setPercentages(prev => {
          const next = [...prev];
          next[s] = 100;
          return next;
        });
        
        if (s < 3) {
          setTimeout(() => startStep(s + 1), 200);
        } else {
          setComplete(true);
        }
      }
    }, 50);

    return interval;
  };

  useEffect(() => {
    const interval = startStep(0);
    return () => clearInterval(interval);
  }, []);

  const handlePopupResponse = (response) => {
    if (response !== null) setTeacherRecommended(response);
    popupHandledRef.current = true;
    setShowPopup(false);
    // Resume progress
    startStep(1, 64);
  };

  useEffect(() => {
    if (complete) {
      setTimeout(() => {
        router.push("/woohoo");
      }, 800);
    }
  }, [complete, router]);

  return (
    <div className="w-full min-h-screen flex flex-col items-center bg-white overflow-x-hidden pt-12 px-6 relative">
      <motion.div
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        className={`w-full max-w-[450px] flex flex-col items-center transition-all duration-300 ${showPopup ? 'blur-sm brightness-90 grayscale-[0.2]' : ''}`}
      >
        <h1 className="text-[26px] font-bold text-[#221750] mb-10 font-quicksand text-center">
          Personalizing...
        </h1>

        <div className="w-full flex flex-col gap-2 mb-12">
          {progressSteps.map((step, index) => {
            const isActive = percentages[index] > 0 && percentages[index] < 100;
            return (
              <div key={step.id} className="w-full flex flex-col gap-2">
                <div className="flex justify-between items-center w-full px-1">
                  <span className="text-[14px] font-bold text-black font-quicksand leading-tight max-w-[85%]">
                    {step.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[16px] font-bold text-black font-quicksand">
                      {percentages[index]}%
                    </span>
                    {isActive && (
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-slate-200 border-t-slate-500 rounded-full"
                      />
                    )}
                  </div>
                </div>
                <div className="w-full h-[10px] bg-[#EEEEEE] rounded-full overflow-hidden shadow-inner">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${percentages[index]}%` }}
                    transition={{ duration: 0.1 }}
                    className="h-full bg-gradient-to-r from-[#82E9FF] via-[#A594F9] to-[#D55CFF]"
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="w-full flex flex-col items-center">
          <img 
            src="/didyouknow.webp" 
            alt="Did you know" 
            className="w-full max-w-[160px] object-contain mb-6"
          />

          <div className="bg-[#221750] text-white px-6 py-2 rounded-xl flex items-center gap-2 mb-6">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd" />
            </svg>
            <span className="font-bold text-[16px] font-quicksand tracking-tight">Did You Know?</span>
          </div>

          <p className="text-[20px] font-bold text-[#221750] text-center mb-4 leading-tight font-quicksand px-4">
            Children are 19x more likely to learn from an app when using it with a parent
          </p>

          <p className="text-[14px] text-slate-400 font-medium font-quicksand">
            Source: Psychology Today
          </p>
        </div>
      </motion.div>

      <AnimatePresence>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/40 backdrop-blur-[2px]">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white w-full max-w-[400px] rounded-[16px] p-4 pb-4 relative shadow-2xl"
            >
              <button 
                onClick={() => handlePopupResponse(null)}
                className="absolute right-1 top-2 text-black hover:opacity-70 transition-opacity"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              <h2 className="text-[17px] font-medium text-[#000000] text-center mb-4 mt-2 font-quicksand">
                Did a teacher recommend Reading.com?
              </h2>

              <div className="flex gap-4 px-2">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePopupResponse(true)}
                  className="flex-1 h-[52px] bg-[#583DFF] text-white rounded-full font-bold text-base shadow-lg shadow-purple-900/10"
                >
                  Yes
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={() => handlePopupResponse(false)}
                  className="flex-1 h-[52px] bg-[#F5F9FF] text-[#583DFF] rounded-full font-bold text-base border border-[#d1e1f7]"
                >
                  No
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
