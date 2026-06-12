"use client";

import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import InvestorContactGate from "@/components/InvestorContactGate";
import MobileStickyCTA from "@/components/MobileStickyCTA";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {children}
      <InvestorContactGate />
      <MobileStickyCTA />
    </TooltipProvider>
  );
}
