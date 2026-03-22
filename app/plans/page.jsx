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

export default function PlansOffer() {
  const router = useRouter();
  const { childName, direction, updateDirection } = useOnboarding();

  const handleContinue = () => {
    updateDirection(1);
    // Final goal or payment redirect
    alert("Proceeding to checkout with 50% discount!");
  };

  return (
    <div className="w-full flex flex-col items-center bg-white overflow-x-hidden min-h-screen">
      <header className="w-full max-w-[450px] flex justify-center pt-8 mb-12">
        <img src="/VlQPe_m3.webp" alt="Reading.com" className="h-7 object-contain" />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[450px] px-8 pb-10 flex flex-col items-center"
      >
        <h1 className="text-[24px] font-bold text-[#221750] text-center mb-8 px-4 leading-tight font-quicksand">
          Take {childName || 'your child'} from struggling to confident reader.
        </h1>

        <img 
          src="/plans.webp" 
          alt="Learning Treasure Chest" 
          className="w-full max-w-[200px] h-auto object-contain mb-8"
        />

        <div className="flex flex-col items-center space-y-2 mb-16 text-[#221750]/80 font-medium font-quicksand">
          <span>99 step-by-step lessons</span>
          <span>Phonics games</span>
          <span>67 interactive books</span>
          <span>And so much more...</span>
        </div>

        <div className="w-full flex flex-col items-center space-y-4">
          <div className="text-center">
            <p className="text-[12px] font-bold text-[#FF5B5B] uppercase tracking-wider mb-1">
              DISCOUNT UNLOCKED! SAVE 50%
            </p>
            <p className="text-[16px] text-slate-700 font-medium">
              <span className="line-through text-slate-400 mr-1.5">$12.49</span>
              <span className="font-medium text-[#221750]">$6.24/month</span> (billed annually)
            </p>
          </div>

          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="w-full h-16 bg-purple-primary text-white rounded-full text-xl font-extrabold shadow-lg shadow-purple-primary/20 hover:scale-[1.01] transition-all"
            onClick={handleContinue}
          >
            Continue with discount
          </motion.button>

          <button 
            className="w-fit px-6 h-12 bg-white text-slate-500 rounded-full text-[14px] font-medium border border-slate-200 hover:bg-slate-50 transition-all font-quicksand flex items-center justify-center"
            onClick={() => {
              updateDirection(1);
              router.push("/all-plans");
            }}
          >
            View all plans
          </button>
        </div>
      </motion.main>
    </div>
  );
}
