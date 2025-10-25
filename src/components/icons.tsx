import type { HTMLAttributes } from "react";
import Image from "next/image";

export function Logo(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex items-center gap-2" {...props}>
      <Image src="/images/logo.svg" alt="Lint Logo" width={80} height={32} />
      <span className="text-xl font-bold text-foreground">Lint <span className="font-normal">Professional Cleaning</span></span>
    </div>
  );
}
