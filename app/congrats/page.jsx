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
    transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
  },
  exit: (direction) => ({
    opacity: 0,
    x: direction > 0 ? -50 : 50,
    transition: { duration: 0.4, ease: [0.43, 0.13, 0.23, 0.96] },
  }),
};

export default function Congrats() {
  const router = useRouter();
  const { direction, updateDirection } = useOnboarding();
  const isReady = useImagePreload([
    "/congrats1.webp",
    "/congrat2.webp",
    "/congrats3.webp",
    "/congrats4.webp",
    "/congrats5.webp",
    "/congrats6.webp"
  ]);

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleContinue = () => {
    updateDirection(1);
    router.push("/why-it-works");
  };

  // The user mentioned congrats1 -> congrats2 and so on.
  // Noticed in file system that congrats2 is named congrat2.webp
  const reviewImages = [
    "/congrats1.webp",
    "/congrat2.webp",
    "/congrats3.webp",
    "/congrats4.webp",
    "/congrats5.webp",
    "/congrats6.webp"
  ];

  return (
    <div className="w-full flex flex-col items-center bg-white min-h-screen relative overflow-x-clip">
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
        <ProgressBar progress={60} />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[450px] px-6 flex flex-col items-center pt-8 flex-grow"
      >
        <h1 className="text-[24px] font-bold text-[#221750] text-center mb-8 px-2 leading-tight font-quicksand">
          Congratulations on joining the millions of parents prioritizing reading fluency!
        </h1>

        {/* Stacked Review Images */}
        <div className="w-full flex flex-col items-center gap-4 mb-10">
          {reviewImages.map((src, idx) => (
            <img 
              key={idx} 
              src={src} 
              alt={`Social proof ${idx + 1}`} 
              className="w-full h-auto object-contain rounded-xl"
            />
          ))}
        </div>

        <p className="text-[14px] font-medium text-black text-center mb-6 px-4 uppercase font-quicksand leading-tight">
          THERE ARE THOUSANDS OF OTHER COMMENTS LIKE THIS ON SOCIAL MEDIA!
        </p>

        <div className="flex flex-col items-center mb-6">
          <span className="text-[16px] font-medium text-[#070707] mb-4">&</span>
          <div className="flex items-center gap-1 mb-2">
            {[1, 2, 3, 4, 5].map(s => (
              <span key={s} className="text-[#F19A2C] text-xl">★</span>
            ))}
          </div>
          <span className="text-[14px] font-medium text-[#000000] font-quicksand tracking-tight">5-STAR REVIEWS</span>
          <span className="text-[14px] font-medium text-black font-quicksand mt-1">FROM 20,000+ PARENTS & TEACHERS</span>
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
