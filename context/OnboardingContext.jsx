'use client';

import { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const updateDirection = (newDirection) => setDirection(newDirection);

  return (
    <OnboardingContext.Provider value={{ 
      selectedAge, 
      setSelectedAge,
      selectedReason,
      setSelectedReason,
      direction, 
      updateDirection 
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext);
