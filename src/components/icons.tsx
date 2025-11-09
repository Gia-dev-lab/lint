import type { HTMLAttributes, SVGProps } from "react";

export function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      width="100"
      height="32"
      viewBox="0 0 174 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="text-primary"
      {...props}
    >
      <path
        d="M6.39201 32.28L0.512011 37.12V0.840001H6.39201V32.28Z"
        fill="currentColor"
      ></path>
      <path
        d="M20.2472 26.04L13.7512 37.12H5.91118L15.6312 21.4V11.28H5.81518V0.840001H26.0552V11.28H15.6312L25.3192 26.92L20.2472 26.04Z"
        fill="currentColor"
      ></path>
      <path
        d="M34.3381 37.12V0.840001H40.2181V37.12H34.3381Z"
        fill="currentColor"
      ></path>
      <path
        d="M59.4313 37.12V11.28H49.5193V0.840001H69.7593V11.28H59.4313V37.12Z"
        fill="currentColor"
      ></path>
      <path
        d="M103.74 37.12L94.62 26.4V37.12H88.74V0.840001H94.62V25.32L103.26 15.6V0.840001H109.14V37.12H103.74Z"
        fill="currentColor"
      ></path>
      <path
        d="M152.023 26.04L145.527 37.12H137.687L147.407 21.4V11.28H137.591V0.840001H157.831V11.28H147.407L157.095 26.92L152.023 26.04Z"
        fill="currentColor"
      ></path>
      <path
        d="M165.753 37.12V0.840001H171.633V37.12H165.753Z"
        fill="currentColor"
      ></path>
    </svg>
  );
}
