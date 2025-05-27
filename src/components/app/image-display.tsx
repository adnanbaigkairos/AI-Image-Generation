import Image from 'next/image';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Lightbulb, Image as ImageIcon } from 'lucide-react';
import { LoadingSpinner } from './loading-spinner';

interface ImageDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  error: string | null;
  suggestions: string[] | null;
}

export function ImageDisplay({ imageUrl, isLoading, error, suggestions }: ImageDisplayProps) {
  if (isLoading) {
    return (
      <Card className="w-full aspect-video flex flex-col items-center justify-center shadow-lg bg-card/80 backdrop-blur-sm border-accent/30">
        <CardHeader>
          <CardTitle className="text-xl text-accent">Generating Your Masterpiece...</CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <LoadingSpinner size={64} />
          <p className="mt-4 text-muted-foreground">Please wait, the AI is hard at work.</p>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full shadow-lg border-destructive/50">
        <CardHeader>
          <CardTitle className="flex items-center text-destructive">
            <AlertTriangle className="mr-2 h-6 w-6" />
            Generation Failed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-destructive-foreground/80">{error}</p>
          {suggestions && suggestions.length > 0 && (
            <div className="mt-4">
              <h4 className="font-semibold flex items-center text-primary">
                <Lightbulb className="mr-2 h-5 w-5" />
                Prompting Tips:
              </h4>
              <ul className="list-disc list-inside mt-2 space-y-1 text-sm text-muted-foreground">
                {suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    );
  }

  if (imageUrl) {
    return (
      <Card className="w-full shadow-2xl shadow-primary/20 overflow-hidden border-primary/50">
        <CardHeader>
            <CardTitle className="text-2xl text-center text-primary">Your Neon Dream</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="aspect-video relative w-full bg-muted/50">
            <Image
              src={imageUrl}
              alt="Generated AI image"
              fill
              className="object-contain"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority
              data-ai-hint="abstract digital art"
            />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full aspect-video flex flex-col items-center justify-center bg-card/50 border-dashed border-muted-foreground/50">
      <CardContent className="text-center">
        <ImageIcon className="h-16 w-16 text-muted-foreground/70 mx-auto mb-4" />
        <p className="text-muted-foreground">Your generated image will appear here.</p>
        <p className="text-sm text-muted-foreground/80">Enter a prompt and let the magic happen!</p>
      </CardContent>
    </Card>
  );
}
