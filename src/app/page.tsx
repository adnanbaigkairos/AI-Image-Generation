
"use client";

import { useState, useEffect, useCallback } from 'react';
import { Header } from '@/components/app/header';
import { PromptForm } from '@/components/app/prompt-form';
import { ImageDisplay } from '@/components/app/image-display';
import { ImageHistory } from '@/components/app/image-history';
import { handleGenerateImageAction } from './actions';
import { useToast } from "@/hooks/use-toast";
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { IMAGE_HISTORY_STORAGE_KEY, MAX_HISTORY_ITEMS, APP_NAME } from '@/lib/constants';
import type { GenerateImageResult } from '@/lib/types';
import { Trash2 } from 'lucide-react';

export default function HomePage() {
  const [generatedImageUrl, setGeneratedImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [history, setHistory] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    // Load history from localStorage on initial mount
    try {
      const storedHistory = localStorage.getItem(IMAGE_HISTORY_STORAGE_KEY);
      if (storedHistory) {
        setHistory(JSON.parse(storedHistory));
      }
    } catch (e: unknown) {
      console.error("Failed to load image history from localStorage:", e);
      let description = "Could not load your previous creations. Your browser's local storage might be disabled or full.";
      if (e instanceof Error) {
        description = e.message;
      }
      toast({
        title: "History Hiccup",
        description: description,
        variant: "destructive",
      });
    }
  }, [toast]); // Depends only on toast, runs once on mount

  useEffect(() => {
    // Save history to localStorage when it changes
    if (history.length > 0) {
      try {
        localStorage.setItem(IMAGE_HISTORY_STORAGE_KEY, JSON.stringify(history));
      } catch (e: unknown) {
        console.error("Failed to save image history to localStorage:", e);
        let toastTitle = "History Save Error";
        let toastDescription = "Could not save your latest creation to history. Please check browser settings.";

        if (e instanceof DOMException && e.name === 'QuotaExceededError') {
          toastTitle = "Storage Full";
          toastDescription = "Browser storage is full. Latest images may not be saved to history. Try clearing history or freeing up browser storage.";
        } else if (e instanceof Error) {
          toastDescription = `Could not save to history: ${e.message}. Check browser settings.`;
        }
        
        toast({
          title: toastTitle,
          description: toastDescription,
          variant: "destructive",
        });
      }
    } else {
      // History is empty, ensure localStorage is also cleared
      try {
        // Only remove if it exists, to avoid unnecessary localStorage access
        if (localStorage.getItem(IMAGE_HISTORY_STORAGE_KEY)) {
          localStorage.removeItem(IMAGE_HISTORY_STORAGE_KEY);
        }
      } catch (e: unknown) {
        console.error("Failed to clear image history from localStorage:", e);
        let description = "Could not clear outdated history from storage. Browser settings might be restrictive.";
        if (e instanceof Error) {
          description = e.message;
        }
        toast({
          title: "History Clear Error",
          description: description,
          variant: "warning", // Warning as it's less critical than save failure
        });
      }
    }
  }, [history, toast]); // Depends on history and toast

  const handleSubmitPrompt = useCallback(async (prompt: string) => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    // setGeneratedImageUrl(null); // Option: Clear current image while loading

    toast({
      title: "🚀 Beam Me Up, Scotty!",
      description: "AI is warming up its engines for your masterpiece...",
    });

    const result: GenerateImageResult = await handleGenerateImageAction(prompt);

    setIsLoading(false);
    if (result.error) {
      setError(result.error);
      if (result.suggestions) {
        setSuggestions(result.suggestions);
      }
      toast({
        title: "🚧 Glitch in the Matrix!",
        description: result.error || "Failed to generate image.",
        variant: "destructive",
      });
    } else if (result.imageUrl) {
      setGeneratedImageUrl(result.imageUrl);
      setHistory(prev => [result.imageUrl!, ...prev].slice(0, MAX_HISTORY_ITEMS));
      toast({
        title: "✨ Dream Materialized!",
        description: "Your neon vision is now a reality.",
      });
    }
  }, [toast]);

  const handleSelectFromHistory = (imageUrl: string) => {
    setGeneratedImageUrl(imageUrl);
    setError(null);
    setSuggestions(null);
     toast({
        title: "💾 Loaded from Archives",
        description: "Displaying a previous creation.",
      });
  };

  const handleClearHistory = () => {
    try {
      localStorage.removeItem(IMAGE_HISTORY_STORAGE_KEY);
      setHistory([]); // Clear the React state as well
      toast({
        title: "🧹 History Cleared",
        description: "Your recent creations have been wiped.",
      });
    } catch (e: unknown) {
      console.error("Failed to clear image history from localStorage:", e);
      let description = "Could not clear history. Local storage might be inaccessible.";
       if (e instanceof Error) {
          description = e.message;
        }
      toast({
        title: "Clearing Error",
        description: description,
        variant: "destructive",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background to-purple-950/30">
      <Header />
      <main className="container mx-auto flex-grow p-4 md:p-8 flex flex-col items-center gap-8">
        <div className="w-full max-w-2xl">
          <PromptForm onSubmit={handleSubmitPrompt} isLoading={isLoading} />
        </div>
        
        <div className="w-full max-w-3xl">
          <ImageDisplay
            imageUrl={generatedImageUrl}
            isLoading={isLoading}
            error={error}
            suggestions={suggestions}
          />
        </div>

        {history.length > 0 && (
          <>
            <Separator className="my-4 md:my-8 bg-primary/30" />
            <div className="w-full">
              <ImageHistory images={history} onImageSelect={handleSelectFromHistory} />
              <div className="mt-6 flex justify-center">
                <Button variant="outline" onClick={handleClearHistory} className="border-accent text-accent hover:bg-accent/10 hover:text-accent">
                  <Trash2 className="mr-2 h-4 w-4" />
                  Clear History
                </Button>
              </div>
            </div>
          </>
        )}
      </main>
      <footer className="py-8 text-center text-sm text-muted-foreground border-t border-primary/10">
        <div className="space-y-1">
          <p>&copy; {new Date().getFullYear()} {APP_NAME}. All rights reserved.</p>
          <p>Powered by AI and Cyberpunk Aesthetics.</p>
          <div className="flex justify-center gap-4 mt-2">
            <a href="/terms-of-service" className="hover:text-primary transition-colors">Terms of Service</a>
            <span className="text-muted-foreground/50">|</span>
            <a href="/privacy-policy" className="hover:text-primary transition-colors">Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
