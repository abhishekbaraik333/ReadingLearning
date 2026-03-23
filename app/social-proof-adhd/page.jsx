'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import ProgressBar from "@/components/ProgressBar";
import { useImagePreload } from "@/hooks/useImagePreload";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';

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

const adhdReviews = [
  {
    title: "Super helpful tool for my ADHD child",
    content: "After spending a year and a half in school, he did not know his alphabet. 9 months and 99 lessons with reading.com later, he can read. He's so confident now- he's reading books, signs and beginning to write. If you have a kid with similar challenges, I highly recommend this app. It is a game changer.",
    author: "Gett"
  },
  {
    title: "Honest review",
    content: "Just so everyone can see an honest review I wanted to share. We have been using this for a while. In addition to other things. It does cost monthly but I was at the point I didn't care and I just paid for it to help my child. She just read her first little simple word book! Before starting she wasn't able to identify all her letters at almost age 7 no matter how much I taught her. This truly works! It helped her connect the letter sounds in a way that works for her way of processing! This app helped it begin to click. And she loves the games she plays after learning for the day! She is combination adhd and dislexic. Highly recommend giving it a try!",
    author: "Brianna Gunnels"
  },
  {
    title: "Super helpful tool for my ADHD child",
    content: "My son has SPED needs (ADHD, Intellectual, mild Autism) he was able to follow easily, and loved the graphics and rewards. He is able to read better than when we started, although I need to continue reading along with him. We didn't do many paperwork activities maybe that may have increased independence. I can see that any other child without SPED needs would easily be reading independently at the end of the course. Thank you.",
    author: "BreyDol"
  },
  {
    title: "This app is great!",
    content: "This app is great! My 7 yr old granddaughter is learning to read! She is level 2 Autistic and ADHD. My 7 yr old granddaughter is learning to read! She is level 2 Autistic and ADHD.",
    author: "Tammy Jones"
  }
];

export default function ADHDSocialProof() {
  const router = useRouter();
  const { direction, updateDirection } = useOnboarding();
  const isReady = useImagePreload("/VlQPe_m3.webp");
  
  const [emblaRef] = useEmblaCarousel(
    { 
      loop: true,
      align: 'center',
      skipSnaps: false
    }, 
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  );

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

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
        <ProgressBar progress={31} />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[450px] flex flex-col items-center pt-8 flex-grow"
      >
        <h1 className="text-[26px] font-bold text-[#221750] text-center leading-tight mb-4 px-8">
          You're in good hands!
        </h1>

        <p className="text-[18px] text-center text-purple-dark/80 font-medium mb-8 px-10 leading-relaxed">
          Hear from parents who have taught their children with ADHD to read with our program.
        </p>

        {/* Carousel Section */}
        <div className="w-full overflow-hidden mb-12" ref={emblaRef}>
          <div className="flex">
            {adhdReviews.map((review, index) => (
              <div key={index} className="flex-[0_0_85%] min-w-0 px-3">
                <div className="bg-[#221750] text-white p-8 rounded-[32px] flex flex-col shadow-xl shadow-purple-900/10 my-4">
                  <h3 className="text-[20px] font-bold mb-3 leading-tight">
                    {review.title}
                  </h3>
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-orange-400 text-lg">★</span>
                    ))}
                  </div>
                  <p className="text-[16px] leading-relaxed text-blue-100/90 mb-6 flex-grow font-medium">
                    {review.content}
                  </p>
                  <p className="text-[16px] font-bold text-white mt-auto">
                    {review.author}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
          onClick={() => router.push("/personalize")}
        >
          Continue
        </motion.button>
      </motion.div>
    </div>
  );
}
