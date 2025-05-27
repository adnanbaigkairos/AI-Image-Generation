// src/components/landing/LandingPage.tsx
'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Logo from '@/components/core/Logo';
import { ArrowRight } from 'lucide-react';

type LandingPageProps = {
  onGetStarted: () => void;
};

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-br from-background to-muted/20 relative overflow-hidden">
      {/* Subtle animated background pattern */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-background">
        <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] opacity-50"></div>
        <div className="absolute inset-0 -z-20 h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/30 via-background/0 to-background/0 opacity-50"></div>
      </div>

      <Card className="w-full max-w-lg shadow-2xl shadow-primary/30 bg-card/90 backdrop-blur-md border-primary/20 rounded-xl">
        <CardHeader className="text-center space-y-6 pt-8">
          <div className="inline-block mx-auto">
            <Logo />
          </div>
          <CardTitle className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
            Welcome to PromptForge
          </CardTitle>
          <CardDescription className="text-lg text-muted-foreground px-4 leading-relaxed">
            Unleash your creativity and generate stunning AI images with intuitive prompt engineering tools.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center pb-8 pt-4">
          <Button
            onClick={onGetStarted}
            size="lg"
            className="btn-glow mt-6 text-lg font-semibold px-10 py-7 w-full max-w-xs rounded-lg shadow-lg hover:shadow-primary/50 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Get Started
            <ArrowRight className="ml-2.5 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
          <p className="mt-8 text-xs text-muted-foreground/70">
            No sign-up required. Dive straight into creation!
          </p>
        </CardContent>
      </Card>
       <footer className="absolute bottom-6 text-center text-xs text-muted-foreground/60 w-full">
        <p>&copy; {new Date().getFullYear()} PromptForge. Crafted with AI.</p>
      </footer>
    </div>
  );
}
