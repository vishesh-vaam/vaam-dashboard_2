"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function InteractiveHoverButton() {
  return (
    <div className="relative group/btn">
      <button className="relative px-8 py-4 text-base md:text-lg rounded-full bg-primary text-primary-foreground font-medium transition-all duration-300 hover:shadow-[0_0_0_3px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_0_0_3px_rgba(255,255,255,0.2)]">
        <span className="relative z-10">Drive with us</span>
        <div className="absolute inset-0 rounded-full transition-all duration-300 group-hover/btn:scale-110" />
      </button>
      <div className="absolute inset-0 rounded-full opacity-25 blur-xl transition-all duration-300 group-hover/btn:scale-110 bg-primary" />
    </div>
  );
}
