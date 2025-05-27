// src/app/page.tsx
'use client';

import { useState } from 'react';
import VisionForgeAIClient from '@/components/vision-forge-ai/VisionForgeAIClient';
import LandingPage from '@/components/landing/LandingPage';

export default function HomePage() {
  const [showApp, setShowApp] = useState(false);

  const handleGetStarted = () => {
    setShowApp(true);
  };

  if (showApp) {
    return <VisionForgeAIClient />;
  }

  return <LandingPage onGetStarted={handleGetStarted} />;
}
