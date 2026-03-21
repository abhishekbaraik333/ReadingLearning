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

export default function SaveProgress() {
  const router = useRouter();
  const { childName, childGender, parentEmail, setParentEmail, direction, updateDirection } = useOnboarding();

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const getPronoun = () => {
    if (childGender === "Boy") return "his";
    if (childGender === "Girl") return "her";
    return "their";
  };

  const handleContinue = () => {
    if (parentEmail.includes('@')) {
      updateDirection(1);
      router.push("/referral");
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-white overflow-x-hidden min-h-screen pt-12">

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[450px] px-8 pb-10 flex flex-col items-center pt-6"
      >
        <img 
          src="/kidSafe.webp" 
          alt="kidSAFE Certified" 
          className="h-10 object-contain mb-4"
        />

        <h1 className="text-[24px] font-bold text-[#221750] text-center mb-6 leading-tight font-quicksand">
          Save {childName || 'your child'}'s plan and learning progress
        </h1>

        {/* Dynamic Social Proof */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-1.5 mb-2">
            <span className="text-[#F19A2C] text-lg">★★★★★</span>
            <span className="text-[16px] font-normal text-[#F19A2C]">4.75 stars</span>
          </div>
          <p className="text-[16px] italic font-medium text-[#221750] text-center mb-0.5">
            "Best app to teach your kids to read!"
          </p>
          <p className="text-[14px] text-[#221750] font-medium">
            EmiPete (mom of 4yo)
          </p>
        </div>

        {/* Email Input */}
        <div className="w-full mb-4">
          <input
            type="email"
            value={parentEmail}
            onChange={(e) => setParentEmail(e.target.value)}
            placeholder="Enter your best email"
            className="w-full h-[50px] px-6 rounded-2xl border-2 border-slate-200 outline-none focus:border-black transition-all text-base font-medium text-purple-dark placeholder:text-slate-400 font-quicksand shadow-sm"
          />
          <p className="text-[11px] text-center text-slate-500 font-medium mt-3">
            We <span className="font-bold">never</span> share or sell any information!
          </p>
        </div>

        {/* Join Parents Section */}
        <div className="w-full flex flex-col items-center mb-8">
          <img 
            src="/join.webp" 
            alt="Parents joining" 
            className="h-14 object-contain mb-2"
          />
          <p className="text-[14px] text-center text-[#221750] font-medium leading-tight px-4 italic">
            Join <span className="font-bold">more than 1.5 million parents</span> teaching their kids to read!
          </p>
        </div>

        {/* Features List */}
        <div className="w-full flex flex-col gap-3.5 mb-10 px-4">
          <div className="flex items-start gap-3">
            <span className="text-purple-primary text-lg leading-none">✨</span>
            <p className="text-[14px] text-slate-600 font-semibold font-quicksand">Find the right lesson to start</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-primary text-lg leading-none">✨</span>
            <p className="text-[14px] text-slate-600 font-semibold font-quicksand">{childName || 'Child'} learns at {getPronoun()} own pace</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-primary text-lg leading-none">✨</span>
            <p className="text-[14px] text-slate-600 font-semibold font-quicksand">Progress tracking and insights</p>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-purple-primary text-lg leading-none">✨</span>
            <p className="text-[14px] text-slate-600 font-semibold font-quicksand">Access to exclusive printables</p>
          </div>
        </div>

        <div className="w-full mt-auto">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            disabled={!parentEmail.includes('@')}
            className={`w-full h-16 rounded-full text-xl font-extrabold transition-all duration-300 ${
              parentEmail.includes('@')
                ? 'bg-purple-primary text-white shadow-lg shadow-purple-primary/20 hover:scale-[1.01]'
                : 'bg-purple-primary/40 text-white cursor-not-allowed'
            }`}
            onClick={handleContinue}
          >
            Save and Continue
          </motion.button>
        </div>
      </motion.main>
    </div>
  );
}
