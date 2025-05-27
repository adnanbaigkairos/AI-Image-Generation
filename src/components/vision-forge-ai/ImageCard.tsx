// src/components/vision-forge-ai/ImageCard.tsx
'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Download, Eye } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"


type ImageCardProps = {
  imageUrl: string;
  prompt?: string; // Optional: if you want to display the prompt used
  index?: number; // Optional: for batch images
};

export default function ImageCard({ imageUrl, prompt, index }: ImageCardProps) {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = imageUrl;
    const filename = `visionforge_ai_image${index !== undefined ? `_${index + 1}` : ''}.png`;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="overflow-hidden shadow-lg hover:shadow-primary/30 transition-shadow duration-300 w-full">
      <CardContent className="p-0 aspect-square relative">
        <Image
          src={imageUrl}
          alt={prompt || `Generated Image ${index !== undefined ? index + 1 : ''}`}
          layout="fill"
          objectFit="cover"
          data-ai-hint="abstract digital art"
          className="transition-transform duration-300 group-hover:scale-105"
        />
      </CardContent>
      <CardFooter className="p-4 flex justify-between items-center bg-card/80 backdrop-blur-sm">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm" aria-label="View Image">
              <Eye className="h-4 w-4 mr-2" /> View
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-3xl p-0">
            <DialogHeader className="p-4 sr-only"> {/* Screen reader only title for dialog */}
              <DialogTitle>Generated Image</DialogTitle>
            </DialogHeader>
            <div className="relative aspect-video w-full">
               <Image src={imageUrl} alt={prompt || `Generated Image ${index !== undefined ? index + 1 : ''}`} layout="fill" objectFit="contain" />
            </div>
          </DialogContent>
        </Dialog>
        <Button variant="outline" size="sm" onClick={handleDownload} className="btn-glow">
          <Download className="h-4 w-4 mr-2" /> Download
        </Button>
      </CardFooter>
    </Card>
  );
}
