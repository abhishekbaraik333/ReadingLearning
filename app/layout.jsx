import { Quicksand } from "next/font/google";
import { OnboardingProvider } from "@/context/OnboardingContext";
import "./globals.css";

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata = {
  title: "Reading.com Onboarding",
  description: "Children's learning-to-read app onboarding flow",
};

import { AnimatePresence } from "framer-motion";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${quicksand.variable} font-quicksand antialiased bg-white overflow-x-hidden`}>
        <OnboardingProvider>
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
        </OnboardingProvider>
      </body>
    </html>
  );
}
