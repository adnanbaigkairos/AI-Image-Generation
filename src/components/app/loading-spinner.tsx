import { LoaderCircle } from 'lucide-react';

interface LoadingSpinnerProps {
  size?: number;
  className?: string;
}

export function LoadingSpinner({ size = 24, className }: LoadingSpinnerProps) {
  return (
    <LoaderCircle
      style={{ width: size, height: size }}
      className={`animate-spin text-primary ${className}`}
    />
  );
}
