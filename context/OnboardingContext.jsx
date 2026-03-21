'use client';

import { createContext, useContext, useState } from 'react';

const OnboardingContext = createContext();

export function OnboardingProvider({ children }) {
  const [selectedAge, setSelectedAge] = useState(null);
  const [selectedReason, setSelectedReason] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [schoolMethod, setSchoolMethod] = useState(null);
  const [learningDifference, setLearningDifference] = useState(null);
  const [homeChallenge, setHomeChallenge] = useState(null);
  const [childGender, setChildGender] = useState(null);
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [childName, setChildName] = useState("");
  const [teacherRecommended, setTeacherRecommended] = useState(null);
  const [parentEmail, setParentEmail] = useState("");
  const [referralSource, setReferralSource] = useState(null);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = backward

  const updateDirection = (newDirection) => setDirection(newDirection);

  return (
    <OnboardingContext.Provider value={{ 
      selectedAge, 
      setSelectedAge,
      selectedReason,
      setSelectedReason,
      selectedStatus,
      setSelectedStatus,
      schoolMethod,
      setSchoolMethod,
      learningDifference,
      setLearningDifference,
      homeChallenge,
      setHomeChallenge,
      childGender,
      setChildGender,
      selectedAvatar,
      setSelectedAvatar,
      childName,
      setChildName,
      teacherRecommended,
      setTeacherRecommended,
      parentEmail,
      setParentEmail,
      referralSource,
      setReferralSource,
      direction, 
      updateDirection 
    }}>
      {children}
    </OnboardingContext.Provider>
  );
}

export const useOnboarding = () => useContext(OnboardingContext);
