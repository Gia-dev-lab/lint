import type { HTMLAttributes, SVGProps } from "react";
import Image from "next/image";

export function Logo(props: React.ImgHTMLAttributes<HTMLImageElement>) {
  return (
    <Image
      src="https://www.lintmicrofibercloths.it/puliziaprofessionale/logo.svg"
      alt="Lint Professional Cleaning Logo"
      width={100}
      height={32}
      className="dark:invert"
      priority
      {...props}
    />
  );
}
