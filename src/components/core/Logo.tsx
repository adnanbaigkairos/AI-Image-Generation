// src/components/core/Logo.tsx
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

export default function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 text-2xl font-bold text-primary hover:text-primary/90 transition-colors">
      <Sparkles className="h-7 w-7 text-accent" />
      <span>PromptForge</span>
    </Link>
  );
}
