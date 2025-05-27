
"use client";

import { useState, useTransition } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Sparkles, AlertCircle, Info } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

interface PromptFormProps {
  onSubmit: (prompt: string) => Promise<void>;
  isLoading: boolean;
}

export function PromptForm({ onSubmit, isLoading }: PromptFormProps) {
  const [prompt, setPrompt] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const currentIsLoading = isLoading || isPending;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!prompt.trim()) {
      setError('Prompt cannot be empty. Let your imagination flow!');
      return;
    }
    setError(null);
    startTransition(async () => {
      await onSubmit(prompt);
    });
  };

  return (
    <Card className="w-full shadow-xl shadow-primary/10 border-primary/30">
      <CardHeader>
        <CardTitle className="flex items-center text-2xl">
          <Sparkles className="mr-2 h-6 w-6 text-accent" />
          Enter Your Vision
        </CardTitle>
        <CardDescription className="flex items-start text-sm text-muted-foreground pt-1">
          <Info className="mr-2 h-4 w-4 shrink-0 mt-1 text-accent/80" />
          Describe the image you want to create. Be specific for best results (e.g., style, colors, objects, mood).
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="e.g., A neon-lit cyberpunk city skyline at dusk, with flying cars and holographic advertisements..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            rows={4}
            className="text-base border-2 border-input focus:border-primary focus:ring-primary resize-none"
            disabled={currentIsLoading}
            aria-label="Image generation prompt"
          />
          {error && (
            <p className="text-sm text-destructive flex items-center">
              <AlertCircle className="h-4 w-4 mr-1" />
              {error}
            </p>
          )}
        </form>
      </CardContent>
      <CardFooter>
        <Button
          type="submit"
          onClick={() => handleSubmit(new Event('submit', { cancelable: true }) as any)} // Trigger form submission
          disabled={currentIsLoading || !prompt.trim()}
          className="w-full text-lg py-6 bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity duration-300"
        >
          {currentIsLoading ? (
            <>
              <Sparkles className="mr-2 h-5 w-5 animate-ping" />
              Conjuring...
            </>
          ) : (
            <>
              <Sparkles className="mr-2 h-5 w-5" />
              Generate Neon Dream
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
