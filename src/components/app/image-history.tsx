"use client";

import Image from 'next/image';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { History } from 'lucide-react';

interface ImageHistoryProps {
  images: string[];
  onImageSelect?: (imageUrl: string) => void; // Optional: if we want to re-use an image
}

export function ImageHistory({ images, onImageSelect }: ImageHistoryProps) {
  if (images.length === 0) {
    return null; // Don't render if there's no history
  }

  return (
    <Card className="w-full mt-8 shadow-lg border-accent/30">
      <CardHeader>
        <CardTitle className="flex items-center text-xl">
          <History className="mr-2 h-5 w-5 text-accent" />
          Your Recent Creations
        </CardTitle>
      </CardHeader>
      <CardContent>
        {images.length > 0 ? (
          <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex w-max space-x-4 p-4">
              {images.map((imageUrl, index) => (
                <div
                  key={index}
                  className="relative w-40 h-40 rounded-md overflow-hidden shadow-md hover:shadow-primary/50 transition-shadow cursor-pointer group border-2 border-transparent hover:border-primary"
                  onClick={() => onImageSelect?.(imageUrl)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onImageSelect?.(imageUrl)}
                  aria-label={`Previously generated image ${index + 1}`}
                >
                  <Image
                    src={imageUrl}
                    alt={`Generated image ${index + 1}`}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="160px"
                    data-ai-hint="cyberpunk art"
                  />
                   <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white text-xs text-center">View</p>
                  </div>
                </div>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        ) : (
          <p className="text-muted-foreground text-sm text-center py-4">
            No images generated yet. Start creating!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
