// src/app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import VisionForgeClient from '@/components/vision-forge/VisionForgeClient';
import LandingPage from '@/components/landing/LandingPage';

export default function HomePage() {
  const [showApp, setShowApp] = useState(false);
  // Add a loading state to prevent flash of landing page if app was already "started" (e.g. via localStorage)
  // For now, we'll keep it simple. If persistence was added, this would be useful.
  // const [isLoading, setIsLoading] = useState(true); 


  // useEffect(() => {
  //   // Example: Check if user has "started" before, could use localStorage
  //   // const hasStarted = localStorage.getItem('visionForgeStarted');
  //   // if (hasStarted) {
  //   //   setShowApp(true);
  //   // }
  //   // setIsLoading(false);
  // }, []);

  const handleGetStarted = () => {
    // Optionally, persist this choice: localStorage.setItem('visionForgeStarted', 'true');
    setShowApp(true);
  };

  // if (isLoading) {
  //   return (
  //     <div className="flex min-h-screen items-center justify-center bg-background">
  //       {/* Replace with a proper full-page spinner or skeleton */}
  //       <p>Loading...</p> 
  //     </div>
  //   );
  // }

  if (showApp) {
    return <VisionForgeClient />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
}
