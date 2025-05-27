
import { Zap } from 'lucide-react';
import { APP_NAME } from '@/lib/constants';
import { SidebarTrigger } from '@/components/ui/sidebar';

export function Header() {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-primary/20 shadow-lg shadow-primary/10">
      <div className="container mx-auto flex items-center justify-between">
        <div className="w-7 md:w-10"> {/* Spacer for trigger */}
           <SidebarTrigger className="h-7 w-7 text-primary hover:text-accent transition-colors" />
        </div>
        <div className="flex items-center">
          <Zap className="h-8 w-8 mr-3 text-primary animate-pulse" />
          <h1 className="text-4xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-primary">
            {APP_NAME}
          </h1>
        </div>
        <div className="w-7 md:w-10" /> {/* Spacer to balance the trigger and keep title centered */}
      </div>
      <p className="text-center text-muted-foreground mt-2 text-sm">
        Craft your digital visions with AI.
      </p>
    </header>
  );
}
