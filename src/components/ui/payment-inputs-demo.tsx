"use client";

import * as React from "react";
import { Input } from "@/components/ui/input";
import { CreditCard as CreditIcon } from "lucide-react";
import { useId } from "react";
import { usePaymentInputs } from "react-payment-inputs";
import images from "react-payment-inputs/images";

export function PaymentInputsDemo() {
  const id = useId();
  const { meta, getCardNumberProps, getExpiryDateProps, getCVCProps, getCardImageProps } =
    usePaymentInputs();

  return (
    <div className="space-y-2 min-w-[300px]">
      <legend className="text-sm font-medium text-foreground">Card Details</legend>
      <div className="rounded-lg shadow-sm shadow-black/5">
        <div className="relative focus-within:z-10">
          <Input
            className="peer rounded-b-none pe-9 shadow-none [direction:inherit]"
            {...getCardNumberProps()}
            id={`number-${id}`}
          />
          <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
            {meta.cardType ? (
              <svg
                className="overflow-hidden rounded-sm"
                {...getCardImageProps({ images })}
                width={20}
              />
            ) : (
              <CreditIcon size={16} strokeWidth={2} aria-hidden="true" />
            )}
          </div>
        </div>
        <div className="-mt-px flex">
          <div className="min-w-0 flex-1 focus-within:z-10">
            <Input
              className="rounded-e-none rounded-t-none shadow-none [direction:inherit]"
              {...getExpiryDateProps()}
              id={`expiry-${id}`}
            />
          </div>
          <div className="-ms-px min-w-0 flex-1 focus-within:z-10">
            <Input
              className="rounded-s-none rounded-t-none shadow-none [direction:inherit]"
              {...getCVCProps()}
              id={`cvc-${id}`}
            />
          </div>
        </div>
      </div>
    </div>
  );
} 