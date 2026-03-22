'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
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

export default function AllPlans() {
  const router = useRouter();
  const { direction, updateDirection } = useOnboarding();
  const [selectedPlan, setSelectedPlan] = useState("Yearly");

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleContinue = () => {
    updateDirection(1);
    alert(`Continuing with ${selectedPlan} plan...`);
  };

  const plans = [
    {
      id: "Yearly",
      label: "Yearly",
      originalTotal: "$149.88",
      discountedTotal: "$74.94",
      originalMonthly: "$12.49",
      discountedMonthly: "6.24",
      tag: "50% OFF",
      billedText: "$74.94 billed every year"
    },
    {
      id: "Monthly",
      label: "Monthly",
      discountedTotal: "$12.49",
      originalMonthly: "",
      discountedMonthly: "12.49",
      tag: null,
      billedText: "$12.49 billed every month"
    }
  ];

  const currentPlan = plans.find(p => p.id === selectedPlan);

  return (
    <div className="w-full flex flex-col items-center bg-white overflow-x-hidden min-h-screen">
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
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        className="w-full max-w-[450px] px-8 pb-10 flex flex-col items-center pt-10"
      >
        <h1 className="text-[24px] font-bold text-[#221750] text-center mb-10 font-quicksand leading-tight">
          Choose your plan
        </h1>

        <div className="w-full space-y-4 mb-20">
          {plans.map((plan) => (
            <div 
              key={plan.id}
              onClick={() => setSelectedPlan(plan.id)}
              className={`relative cursor-pointer w-full rounded-[20px] p-4 border-[2px] transition-all duration-300 flex items-center justify-between min-h-[96px] ${
                selectedPlan === plan.id 
                  ? "border-[#FF5B5B] bg-[#FFF8F8]" 
                  : "border-[#EAEAEA] bg-white"
              }`}
            >
              {plan.tag && (
                <div 
                  className="absolute top-[-15px] right-[-2px] bg-[#FF5B5B] text-white text-[12px] font-bold px-4 py-2 shadow-sm tracking-wide z-20 flex items-center justify-center leading-none overflow-hidden"
                  style={{ 
                    borderTopLeftRadius: '20px',
                    borderTopRightRadius: '20px',
                    borderBottomLeftRadius: '20px',
                    borderBottomRightRadius: '0px'
                  }}
                >
                  {plan.tag}
                </div>
              )}

              <div className="flex flex-col justify-center">
                <span className="text-[18px] font-bold text-[#221750] mb-0.5 font-quicksand">{plan.label}</span>
                <div className="flex items-center gap-2">
                  {plan.originalTotal && (
                    <span className="text-[15px] text-[#A1A1AA] line-through font-medium font-quicksand">
                      {plan.originalTotal}
                    </span>
                  )}
                  <span className="text-[16px] text-[#221750] font-bold font-quicksand">
                    {plan.discountedTotal}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 ml-auto">
                {plan.originalMonthly && (
                  <span className="text-[16px] text-[#A1A1AA] line-through font-medium font-quicksand">
                    {plan.originalMonthly}
                  </span>
                )}
                
                <div className={`relative flex items-center justify-center h-[54px] ${
                  plan.id === "Monthly" ? "min-w-[130px]" : "min-w-[124px]"
                }`}>
                  {/* Custom SVG Background */}
                  <div className={`absolute inset-0 ${
                    selectedPlan === plan.id ? "text-[#FFBDBD]" : "text-[#E5E7EB]"
                  }`}>
                    <svg className="w-full h-full" viewBox="0 0 104 46" fill="none" preserveAspectRatio="none">
                      <path fill="currentColor" d="M13.5715 3.25036C15.0796 1.20634 17.4688 0 20.009 0H96C100.418 0 104 3.58172 104 8V38C104 42.4183 100.418 46 96 46H20.009C17.4689 46 15.0796 44.7937 13.5715 42.7496L2.50435 27.7496C0.420961 24.9259 0.420962 21.0741 2.50435 18.2504L13.5715 3.25036Z" />
                    </svg>
                  </div>
                  
                  {/* Price Content */}
                  <div className="relative z-10 flex flex-row items-center ml-4">
                    <span className="text-[15px] font-bold text-[#221750] self-start mt-1.5">$</span>
                    <span className="text-[32px] font-bold text-[#221750] leading-none">{plan.discountedMonthly.split('.')[0]}</span>
                    <div className="flex flex-col items-start ml-0.5 mt-1 leading-none">
                       <span className="text-[15px] font-bold text-[#221750] mb-0.5">{plan.discountedMonthly.split('.')[1] || '00'}</span>
                       <span className="text-[10px] font-medium text-[#221750] opacity-90 leading-none">per month</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="w-full flex flex-col items-center space-y-6 mt-auto">
          <img 
            src="/moneyback.webp" 
            alt="Money Back Guarantee" 
            className="h-14 object-contain"
          />

          <div className="w-full flex flex-col items-center space-y-4">
            <motion.button 
              whileTap={{ scale: 0.98 }}
              className="w-full h-16 bg-purple-primary text-white rounded-full text-xl font-extrabold shadow-lg shadow-purple-primary/20 hover:scale-[1.01] transition-all"
              onClick={handleContinue}
            >
              Continue
            </motion.button>
            <span className="text-[14px] text-[#221750]/60 font-medium font-quicksand">
              {currentPlan.billedText}
            </span>
          </div>
        </div>
      </motion.main>
    </div>
  );
}
