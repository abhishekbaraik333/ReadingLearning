'use client';

import { useOnboarding } from "@/context/OnboardingContext";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
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

export default function AgeSelection() {
  const { selectedAge, setSelectedAge, direction, updateDirection } = useOnboarding();
  const router = useRouter();

  const ages = [
    "Under 3", "3", "3 ½",
    "4", "4 ½", "5",
    "6", "7", "8+"
  ];

  const handleAgeSelect = (age) => {
    setSelectedAge(age);
    updateDirection(1); // Moving forward
    router.push("/research");
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
      <header className="w-full max-w-[450px] flex flex-col items-center pt-4 pb-0 px-5">
        <img src="/VlQPe_m3.webp" alt="Reading.com" className="h-7 mb-3 object-contain" />
        <ProgressBar progress={3} />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[450px] px-5 pb-16 flex flex-col items-center"
      >
        <h1 className="text-[26px] font-bold mb-8 text-center text-purple-dark">How old is your child?</h1>

        <div className="grid grid-cols-3 gap-3 w-full mb-6">
          {ages.map((age) => (
            <motion.button
              key={age}
              whileTap={{ scale: 0.98 }}
              className={`h-20 rounded-xl text-lg font-semibold flex items-center justify-center transition-all duration-200 border-2 border-solid ${
                selectedAge === age 
                  ? 'bg-purple-primary text-white border-purple-primary' 
                  : 'bg-blue-unselected text-purple-dark border-[#cbd5e1]'
              }`}
              onClick={() => handleAgeSelect(age)}
            >
              {age}
            </motion.button>
          ))}
        </div>

        <div className="bg-tip-bg px-6 py-2.5 rounded-xl text-[13px] font-medium text-purple-dark mb-12 text-center w-full">
          Tip: You can add more profiles later (up to 3 children)
        </div>

        <div className="flex gap-10 mb-12 items-start justify-center flex-wrap">
          <img src="/TKhB_Tsn.webp" className="object-fit w-[450px]" alt="" />
        </div>

        <div className="flex flex-col items-center text-center w-full border-t border-gray-100 pt-8">
          <div className="text-accent-gold text-[22px] mb-2 tracking-[4px]">★★★★★</div>
          <p className="text-[16px] font-normal text-black opacity-100 tracking-[0.5px]">5-STAR REVIEWS <br /> FROM 20,000+ PARENTS & TEACHERS</p>
        </div>
      </motion.main>
    </div>
  );
}
