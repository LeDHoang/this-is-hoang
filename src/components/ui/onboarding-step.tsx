"use client";

import * as React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { X, ArrowRight } from "lucide-react";

interface OnboardingStepProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  imageSrc: string;
  title: string;
  description: string;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onSkip?: () => void; // Optional skip handler
}

export function OnboardingStep({
  isOpen,
  onOpenChange,
  imageSrc,
  title,
  description,
  currentStep,
  totalSteps,
  onNext,
}: OnboardingStepProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[480px] p-0 overflow-hidden">
        <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground">
          <X className="h-5 w-5" />
          <span className="sr-only">Close</span>
        </DialogClose>

        {/* Placeholder for image */}
        <div className="bg-muted aspect-video w-full flex items-center justify-center overflow-hidden">
          {imageSrc ? (
            <img 
              src={imageSrc} 
              alt={title} 
              className="w-full h-full object-cover"
            />
          ) : (
            <svg
              className="w-24 h-24 text-muted-foreground"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
          )}
        </div>

        <div className="p-6 space-y-4">
          <DialogHeader className="text-left">
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            <DialogDescription className="text-muted-foreground text-sm">
              {description}
            </DialogDescription>
          </DialogHeader>

          <div className="flex items-center justify-between mt-6">
            {/* Pagination Dots */}
            <div className="flex space-x-1.5">
              {Array.from({ length: totalSteps }).map((_, index) => (
                <div
                  key={index}
                  className={`h-2 w-2 rounded-full ${
                    index === currentStep - 1
                      ? "bg-primary"
                      : "bg-muted-foreground/30"
                  }`}
                />
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              {/* Skip button is omitted as per request */}
              <Button onClick={onNext}>
                Take
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 