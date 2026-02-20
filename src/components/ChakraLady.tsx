"use client";

interface ChakraLadyProps {
  mirrored?: boolean;
  className?: string;
}

export default function ChakraLady({ mirrored = false, className = "" }: ChakraLadyProps) {
  return (
    <div
      className={`relative ${className}`}
      style={{ transform: mirrored ? "scaleX(-1)" : "none" }}
    >
      <svg
        width="200"
        height="320"
        viewBox="0 0 200 320"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Silhouette of woman in lotus/meditation pose */}
        <g opacity="0.7">
          {/* Head */}
          <circle cx="100" cy="62" r="18" fill="white" fillOpacity="0.15" />
          {/* Hair bun */}
          <ellipse cx="100" cy="42" rx="10" ry="8" fill="white" fillOpacity="0.12" />
          {/* Neck */}
          <rect x="95" y="80" width="10" height="14" rx="5" fill="white" fillOpacity="0.15" />
          {/* Torso */}
          <path
            d="M75 94 C75 94 80 130 82 155 L118 155 C120 130 125 94 125 94 C125 90 115 86 100 86 C85 86 75 90 75 94Z"
            fill="white"
            fillOpacity="0.15"
          />
          {/* Left arm raised holding energy */}
          <path
            d="M75 100 C65 105 45 95 38 75 C35 67 33 58 38 52"
            stroke="white"
            strokeOpacity="0.2"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Left hand */}
          <circle cx="38" cy="50" r="5" fill="white" fillOpacity="0.15" />
          {/* Right arm raised holding energy */}
          <path
            d="M125 100 C135 105 155 95 162 75 C165 67 167 58 162 52"
            stroke="white"
            strokeOpacity="0.2"
            strokeWidth="6"
            strokeLinecap="round"
            fill="none"
          />
          {/* Right hand */}
          <circle cx="162" cy="50" r="5" fill="white" fillOpacity="0.15" />
          {/* Left leg crossed */}
          <path
            d="M82 155 C75 175 55 195 45 200 C40 202 38 205 42 208 L70 208 C75 208 78 200 82 185"
            fill="white"
            fillOpacity="0.12"
          />
          {/* Right leg crossed */}
          <path
            d="M118 155 C125 175 145 195 155 200 C160 202 162 205 158 208 L130 208 C125 208 122 200 118 185"
            fill="white"
            fillOpacity="0.12"
          />
        </g>

        {/* Energy ball between hands */}
        <circle cx="100" cy="38" r="22" fill="url(#energyGlow)" className="animate-pulse" />
        <circle cx="100" cy="38" r="16" fill="url(#energyCore)" className="animate-pulse" style={{ animationDelay: "200ms" }} />
        <circle cx="100" cy="38" r="8" fill="white" fillOpacity="0.6" className="animate-pulse" style={{ animationDelay: "400ms" }} />

        {/* Electricity bolts — animated */}
        {/* Left bolt set */}
        <g className="animate-electricity-1">
          <path
            d="M42 52 L55 42 L48 40 L65 30 L55 35 L62 33 L78 38"
            stroke="white"
            strokeOpacity="0.8"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <g className="animate-electricity-2">
          <path
            d="M45 55 L52 48 L48 46 L60 36 L54 40 L58 37 L75 40"
            stroke="white"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <g className="animate-electricity-3">
          <path
            d="M40 48 L50 44 L46 42 L58 34 L52 38 L56 35 L72 36"
            stroke="white"
            strokeOpacity="0.6"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Right bolt set */}
        <g className="animate-electricity-2">
          <path
            d="M158 52 L145 42 L152 40 L135 30 L145 35 L138 33 L122 38"
            stroke="white"
            strokeOpacity="0.8"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <g className="animate-electricity-3">
          <path
            d="M155 55 L148 48 L152 46 L140 36 L146 40 L142 37 L125 40"
            stroke="white"
            strokeOpacity="0.5"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
          />
        </g>
        <g className="animate-electricity-1">
          <path
            d="M160 48 L150 44 L154 42 L142 34 L148 38 L144 35 L128 36"
            stroke="white"
            strokeOpacity="0.6"
            strokeWidth="1.2"
            strokeLinecap="round"
            fill="none"
          />
        </g>

        {/* Chakra dots along spine */}
        <circle cx="100" cy="100" r="3" fill="white" fillOpacity="0.2" className="animate-pulse" />
        <circle cx="100" cy="118" r="3" fill="white" fillOpacity="0.15" className="animate-pulse" style={{ animationDelay: "150ms" }} />
        <circle cx="100" cy="136" r="3" fill="white" fillOpacity="0.1" className="animate-pulse" style={{ animationDelay: "300ms" }} />

        {/* Gradient definitions */}
        <defs>
          <radialGradient id="energyGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.3" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="energyCore" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.5" />
            <stop offset="70%" stopColor="white" stopOpacity="0.15" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
        </defs>
      </svg>
    </div>
  );
}
