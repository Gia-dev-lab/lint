import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Logo(props: HTMLAttributes<HTMLImageElement>) {
  return (
    <img
      src="https://www.lintmicrofibercloths.it/puliziaprofessionale/logo.svg"
      alt="Lint Professional Cleaning Logo"
      className={cn("h-8 w-auto", props.className)}
      {...props}
    />
  );
}
