'use client';

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useOnboarding } from "@/context/OnboardingContext";
import ProgressBar from "@/components/ProgressBar";
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

const autismReviews = [
  {
    title: "Perfect for my Autistic children",
    content: "Keeps my Autistic children engaged, while teaching them necessary reading concepts in a way that's fun, easy for them to comprehend, and that they actually retain! The frequent acknowledgement of mastery, ability to go back and reinforce/review, and games that keep are fun and engaging are great for my girls that need the constant reinforcement!",
    author: "Jamye Danser"
  },
  {
    title: "A breath of fresh air",
    content: "You work through the levels WITH your child, and the app guides you on how to teach your child to read. Encourages you to work one level per day so as not to push past overloading the kids. Really well thought out",
    author: "Lauren Michelle"
  },
  {
    title: "We bought this and he can finally read",
    content: "Best reading app! My son has moderate autism. Repetition and writing down letters and saying each sound did very little. He was uninterested. Anyways, we bought this and he can finally read.",
    author: "Sarah Osinovsky"
  },
  {
    title: "GET IT!!!",
    content: "My autistic son is five and learning to read more with this app than at school. Parents just buy it! Its tax season. GET IT!!!",
    author: "Keosha Roache"
  }
];

export default function AutismSocialProof() {
  const router = useRouter();
  const { direction, updateDirection } = useOnboarding();
  
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
    <div className="w-full flex flex-col items-center overflow-x-hidden">
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
        className="w-full max-w-[450px] pb-20 flex flex-col items-center pt-8"
      >
        <h1 className="text-[26px] font-bold text-[#221750] text-center leading-tight mb-4 px-8">
          You're in good hands!
        </h1>

        <p className="text-[17px] text-center text-purple-dark/80 font-medium mb-8 px-10 leading-relaxed">
          Hear from parents who have taught their children with autism to read with our program.
        </p>

        {/* Carousel Section */}
        <div className="w-full overflow-hidden mb-12" ref={emblaRef}>
          <div className="flex">
            {autismReviews.map((review, index) => (
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

        <div className="w-full px-8">
          <motion.button 
            whileTap={{ scale: 0.98 }}
            className="w-full h-16 bg-purple-primary text-white rounded-full text-xl font-extrabold shadow-lg shadow-purple-primary/20 hover:scale-[1.01] transition-all"
            onClick={() => router.push("/personalize")}
          >
            Continue
          </motion.button>
        </div>
      </motion.main>
    </div>
  );
}
