"use client";

interface SpaBasketIconProps {
  size?: number;
  className?: string;
}

export default function SpaBasketIcon({ size = 24, className = "" }: SpaBasketIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      {/* Basket body */}
      <path d="M5 10L3 10L5 21H19L21 10L19 10" />
      <path d="M5 10H19" />
      {/* Handle */}
      <path d="M8 10V6C8 3.8 9.8 2 12 2C14.2 2 16 3.8 16 6V10" />
      {/* Lotus flower accent */}
      <path d="M12 14C11 13 9.5 13.5 9.5 15C9.5 16.5 12 18 12 18C12 18 14.5 16.5 14.5 15C14.5 13.5 13 13 12 14Z" />
      <line x1="12" y1="18" x2="12" y2="19.5" />
    </svg>
  );
}
