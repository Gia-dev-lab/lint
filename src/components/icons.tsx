import type { HTMLAttributes } from "react";
import Image from "next/image";

export function Logo(props: HTMLAttributes<HTMLDivElement>) {
  return (
    <div className="flex items-center gap-2" {...props}>
      <Image src="https://www.lintmicrofibercloths.it/wp-content/uploads/2024/10/lintlogo.png" alt="Lint Logo" width={100} height={32} className="dark:invert" />
    </div>
  );
}
