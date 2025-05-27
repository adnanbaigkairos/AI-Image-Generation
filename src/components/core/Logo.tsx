// src/components/core/Logo.tsx
import { Sparkles } from 'lucide-react';

export default function Logo() {
  return (
    <div className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
      <Sparkles className="h-7 w-7 text-accent animate-pulse" />
      <span>VisionForge</span>
    </div>
  );
}
