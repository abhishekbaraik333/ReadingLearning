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

// 12 avatars as shown in the grid image
const avatars = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  src: `/avatar${i + 1}.webp`
}));

export default function AvatarSelection() {
  const router = useRouter();
  const { direction, updateDirection, selectedAvatar, setSelectedAvatar } = useOnboarding();
  
  // Preload all 12 avatar thumbnails
  const avatarSources = avatars.map(a => a.src);
  const isReady = useImagePreload(avatarSources);

  const handleBack = () => {
    updateDirection(-1);
    router.back();
  };

  const handleAvatarSelect = (avatarId) => {
    setSelectedAvatar(avatarId);
    updateDirection(1);
    router.push("/child-name");
  };

  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden">
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
        <ProgressBar progress={41} />
      </header>

      <motion.main
        custom={direction}
        variants={pageVariants}
        initial="initial"
        animate={isReady ? "animate" : "initial"}
        exit="exit"
        className="w-full max-w-[450px] px-8 pb-10 flex flex-col items-center pt-8"
      >
        <h1 className="text-[24px] font-bold mb-10 text-center text-[#221750] leading-tight font-quicksand">
          Select an avatar for your child
        </h1>

        <div className="grid grid-cols-3 gap-6 w-full max-w-[360px]">
          {avatars.map((avatar) => (
            <motion.button
              key={avatar.id}
              whileTap={{ scale: 0.95 }}
              onClick={() => handleAvatarSelect(avatar.id)}
              className={`relative rounded-full aspect-square transition-all duration-200 ${
                selectedAvatar === avatar.id 
                  ? 'ring-4 ring-purple-600 ring-offset-2' 
                  : 'hover:opacity-90'
              }`}
            >
              <img 
                src={avatar.src} 
                alt={`Avatar ${avatar.id}`} 
                className="w-full h-full object-cover rounded-full"
              />
            </motion.button>
          ))}
        </div>
      </motion.main>
    </div>
  );
}
