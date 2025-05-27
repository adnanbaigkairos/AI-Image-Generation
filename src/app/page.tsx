// src/app/page.tsx
'use client';

import { useAuth } from '@/hooks/useAuth';
import PromptForgeClient from '@/components/prompt-forge/PromptForgeClient';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Sparkles, LogIn } from 'lucide-react';
import Image from 'next/image';

export default function HomePage() {
  const { currentUser, loading } = useAuth();

  if (loading) {
    // This is already handled by AuthProvider's loading state,
    // but can be a placeholder if needed here before context resolves.
    // For now, AuthProvider handles the main loading screen.
    return null; 
  }

  if (!currentUser) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center p-4 md:p-8">
        <div className="absolute inset-0 overflow-hidden z-0">
            <Image 
                src="https://placehold.co/1200x800/24123F/9D4EDD.png?text=+" // Placeholder background
                alt="Abstract background"
                layout="fill"
                objectFit="cover"
                quality={50}
                className="opacity-20"
                data-ai-hint="abstract space"
            />
        </div>
        <div className="relative z-10 max-w-3xl">
            <Sparkles className="h-20 w-20 md:h-28 md:w-28 text-primary mx-auto mb-6 animate-pulse" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-6">
                Welcome to <span className="text-primary">PromptForge</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 mb-10 leading-relaxed">
                Transform your simple ideas into stunning, AI-generated visuals. 
                Our advanced prompt enhancer and image generator bring your imagination to life.
            </p>
            <div className="space-x-4">
                <Button asChild size="lg" className="btn-glow px-8 py-6 text-lg">
                    <Link href="/signup">
                        <Sparkles className="mr-2 h-5 w-5" /> Get Started
                    </Link>
                </Button>
                <Button variant="outline" asChild size="lg" className="px-8 py-6 text-lg border-accent text-accent hover:bg-accent hover:text-accent-foreground">
                     <Link href="/login">
                        <LogIn className="mr-2 h-5 w-5" /> Login
                    </Link>
                </Button>
            </div>
            <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div className="p-6 bg-card/50 backdrop-blur-md rounded-lg border border-border shadow-lg">
                    <h3 className="text-xl font-semibold text-primary mb-2">Enhance Prompts</h3>
                    <p className="text-sm text-foreground/70">Turn vague thoughts into detailed, AI-ready instructions.</p>
                </div>
                <div className="p-6 bg-card/50 backdrop-blur-md rounded-lg border border-border shadow-lg">
                    <h3 className="text-xl font-semibold text-primary mb-2">Generate Images</h3>
                    <p className="text-sm text-foreground/70">Create unique visuals from your enhanced prompts in various styles.</p>
                </div>
                <div className="p-6 bg-card/50 backdrop-blur-md rounded-lg border border-border shadow-lg">
                    <h3 className="text-xl font-semibold text-primary mb-2">Batch Mode</h3>
                    <p className="text-sm text-foreground/70">Explore multiple variations of your idea simultaneously.</p>
                </div>
            </div>
        </div>
      </div>
    );
  }

  return <PromptForgeClient />;
}
