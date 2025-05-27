
"use client";

import * as React from 'react';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  // SidebarFooter, // Optional, can be re-added if needed
} from '@/components/ui/sidebar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog';
// import { Button } from '@/components/ui/button'; // Not used directly here now
import { Info, HelpCircle, Settings, LogOut, X } from 'lucide-react'; // Added HelpCircle
import { AboutContent } from './about-content';
import { HowToUseContent } from './how-to-use-content'; // Import the new content
import { APP_NAME } from '@/lib/constants';

export function AppSidebar() {
  const [isAboutDialogOpen, setIsAboutDialogOpen] = React.useState(false);
  const [isHowToUseDialogOpen, setIsHowToUseDialogOpen] = React.useState(false); // State for HowToUse dialog

  return (
    <>
      <Sidebar collapsible="icon" className="border-r border-primary/20">
        <SidebarHeader className="p-4">
           <div className="flex items-center gap-2 group-data-[collapsible=icon]:hidden">
            <span className="font-semibold text-lg text-primary">{APP_NAME}</span>
          </div>
        </SidebarHeader>
        <SidebarContent className="p-2">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setIsAboutDialogOpen(true)}
                tooltip={{ children: 'About ' + APP_NAME, side: 'right' }}
                className="text-foreground hover:bg-accent/20 hover:text-accent-foreground data-[active=true]:bg-accent/30"
              >
                <Info />
                <span>About</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={() => setIsHowToUseDialogOpen(true)}
                tooltip={{ children: 'How to use ' + APP_NAME, side: 'right' }}
                className="text-foreground hover:bg-accent/20 hover:text-accent-foreground data-[active=true]:bg-accent/30"
              >
                <HelpCircle />
                <span>How to use</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            {/* Future menu items can be added here */}
            {/* Example:
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={{ children: 'Settings', side: 'right' }} className="text-foreground hover:bg-accent/20 hover:text-accent-foreground data-[active=true]:bg-accent/30">
                <Settings />
                <span>Settings</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            */}
          </SidebarMenu>
        </SidebarContent>
        {/* Optional Footer
        <SidebarFooter className="p-2 mt-auto">
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={{ children: 'Logout', side: 'right' }} className="text-foreground hover:bg-destructive/20 hover:text-destructive-foreground data-[active=true]:bg-destructive/30">
                <LogOut />
                <span>Logout</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        */}
      </Sidebar>

      <Dialog open={isAboutDialogOpen} onOpenChange={setIsAboutDialogOpen}>
        <DialogContent className="sm:max-w-lg bg-card border-primary/50">
          <DialogHeader>
            <DialogTitle className="text-primary">About {APP_NAME}</DialogTitle>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <div className="mt-4">
            <AboutContent />
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={isHowToUseDialogOpen} onOpenChange={setIsHowToUseDialogOpen}>
        <DialogContent className="sm:max-w-xl bg-card border-primary/50"> {/* Adjusted max-width for potentially more content */}
          <DialogHeader>
            <DialogTitle className="text-primary">How to use {APP_NAME}</DialogTitle>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <div className="mt-4 prose prose-sm dark:prose-invert max-h-[70vh] overflow-y-auto pr-2"> {/* Added prose styling and scroll for long content */}
            <HowToUseContent />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
