"use client";

function Option1({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Clean gift basket with tall handle */}
      <path d="M8 11C8 7 9.5 3.5 12 3.5C14.5 3.5 16 7 16 11" />
      <rect x="3.5" y="11" width="17" height="3" rx="1" />
      <path d="M5.5 14L6.5 21H17.5L18.5 14" />
      {/* Ribbon bow */}
      <path d="M12 11V8" />
      <path d="M12 8C10.5 8 9.5 7 10 6C10.5 5 12 5.5 12 8" />
      <path d="M12 8C13.5 8 14.5 7 14 6C13.5 5 12 5.5 12 8" />
    </svg>
  );
}

function Option2({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Tote/gift bag style */}
      <path d="M6 8H18L17 21H7L6 8Z" />
      <path d="M9 8C9 5 10.3 3 12 3C13.7 3 15 5 15 8" />
      {/* Heart on bag */}
      <path d="M12 18C12 18 9.5 15.5 9.5 14C9.5 13 10.2 12.5 11 12.5C11.5 12.5 12 13 12 13C12 13 12.5 12.5 13 12.5C13.8 12.5 14.5 13 14.5 14C14.5 15.5 12 18 12 18Z" />
    </svg>
  );
}

function Option3({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Round basket with wide handle */}
      <path d="M7 10C7 5.5 9 2.5 12 2.5C15 2.5 17 5.5 17 10" />
      <ellipse cx="12" cy="10" rx="8.5" ry="2.5" />
      <path d="M3.5 10C4 16 5.5 21 12 21C18.5 21 20 16 20.5 10" />
      {/* Flower on top */}
      <circle cx="12" cy="2.5" r="1" fill="currentColor" stroke="none" />
      <path d="M12 2.5C11 1.5 11 0.5 12 0.5C13 0.5 13 1.5 12 2.5" />
      <path d="M12 2.5C11 3 10 2.5 10.5 1.8" />
      <path d="M12 2.5C13 3 14 2.5 13.5 1.8" />
    </svg>
  );
}

function Option4({ size = 64 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      {/* Simple elegant shopping basket */}
      <path d="M5 10L3 10L5 21H19L21 10L19 10" />
      <path d="M5 10H19" />
      <path d="M8 10V6C8 3.8 9.8 2 12 2C14.2 2 16 3.8 16 6V10" />
      {/* Lotus/spa flower accent */}
      <path d="M12 14C11 13 9.5 13.5 9.5 15C9.5 16.5 12 18 12 18C12 18 14.5 16.5 14.5 15C14.5 13.5 13 13 12 14Z" />
      <line x1="12" y1="18" x2="12" y2="19.5" />
    </svg>
  );
}

export default function IconPreview() {
  const options = [
    { name: "Option 1: Gift Basket with Ribbon", component: Option1, desc: "Classic gift basket with a bow — clean and recognizable" },
    { name: "Option 2: Spa Tote with Heart", component: Option2, desc: "Elegant tote bag with a heart — simple and modern" },
    { name: "Option 3: Round Wicker Basket", component: Option3, desc: "Round basket with flower accent — organic spa feel" },
    { name: "Option 4: Shopping Basket with Lotus", component: Option4, desc: "Shopping basket with lotus flower — spa meets shopping" },
  ];

  return (
    <div className="min-h-screen bg-cream py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-display font-bold text-brand-dark text-center mb-2">
          Choose Your Spa Basket Icon
        </h1>
        <p className="text-center text-brand-light mb-10">
          Pick the one you like best — shown at multiple sizes
        </p>

        <div className="space-y-6">
          {options.map(({ name, component: Icon, desc }, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-lg font-display font-bold text-brand-dark mb-1">{name}</h2>
              <p className="text-sm text-brand-light mb-4">{desc}</p>

              <div className="flex items-end gap-8">
                {/* Dark background preview (header) */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] text-brand-light uppercase tracking-wider">Header (dark bg)</span>
                  <div className="bg-brand-dark rounded-xl p-4 flex items-center gap-4">
                    <div className="text-white"><Icon size={22} /></div>
                    <div className="text-white"><Icon size={28} /></div>
                  </div>
                </div>

                {/* Light background preview (card) */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] text-brand-light uppercase tracking-wider">Card (light bg)</span>
                  <div className="bg-cream rounded-xl p-4 flex items-center gap-4 border border-brand-cream">
                    <div className="text-brand-dark"><Icon size={22} /></div>
                    <div className="text-brand-dark"><Icon size={28} /></div>
                  </div>
                </div>

                {/* Large preview */}
                <div className="flex flex-col items-center gap-2">
                  <span className="text-[10px] text-brand-light uppercase tracking-wider">Large</span>
                  <div className="text-brand-dark"><Icon size={56} /></div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-brand-light mt-8">
          Tell me which option number you prefer (1, 2, 3, or 4) and I&apos;ll apply it!
        </p>
      </div>
    </div>
  );
}
