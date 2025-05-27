// src/components/core/LoadingSpinner.tsx
import { Loader2 } from 'lucide-react';

type LoadingSpinnerProps = {
  size?: number;
  text?: string;
};

export default function LoadingSpinner({ size = 24, text }: LoadingSpinnerProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-2">
      <Loader2 className="animate-spin text-primary" style={{ width: size, height: size }} />
      {text && <p className="text-sm text-muted-foreground">{text}</p>}
    </div>
  );
}
