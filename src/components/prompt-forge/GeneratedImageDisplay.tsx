// src/components/prompt-forge/GeneratedImageDisplay.tsx
import ImageCard from './ImageCard';

type GeneratedImageDisplayProps = {
  imageUrls: string[];
  prompt?: string;
};

export default function GeneratedImageDisplay({ imageUrls, prompt }: GeneratedImageDisplayProps) {
  if (!imageUrls || imageUrls.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-semibold mb-6 text-center text-primary">Generated Images</h2>
      <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 ${imageUrls.length > 2 ? 'lg:grid-cols-' + Math.min(imageUrls.length, 4) : ''}`}>
        {imageUrls.map((url, index) => (
          <ImageCard key={url} imageUrl={url} prompt={prompt} index={index} />
        ))}
      </div>
    </div>
  );
}
