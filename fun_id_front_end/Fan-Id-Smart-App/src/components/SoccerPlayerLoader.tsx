export function SoccerPlayerLoader() {
  return (
    <div className="flex items-center justify-center">
      <div className="relative w-24 h-24">
        {/* Spinning soccer ball */}
        <div className="absolute inset-0 animate-spin">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <circle cx="50" cy="50" r="45" fill="white" stroke="#C1272D" strokeWidth="2"/>
            <path d="M50 10 L50 30 M50 70 L50 90 M10 50 L30 50 M70 50 L90 50" stroke="#C1272D" strokeWidth="2"/>
            <path d="M25 25 L35 35 M65 35 L75 25 M25 75 L35 65 M65 65 L75 75" stroke="#006233" strokeWidth="2"/>
          </svg>
        </div>
        
        {/* Animated soccer player */}
        <div className="absolute inset-0 flex items-center justify-center animate-pulse">
          <svg viewBox="0 0 64 64" className="w-16 h-16">
            {/* Player body in red (Morocco colors) */}
            <circle cx="32" cy="16" r="6" fill="#C1272D"/> {/* Head */}
            <rect x="28" y="22" width="8" height="16" rx="2" fill="#C1272D"/> {/* Body */}
            <rect x="20" y="24" width="8" height="3" rx="1.5" fill="#C1272D"/> {/* Left arm */}
            <rect x="36" y="24" width="8" height="3" rx="1.5" fill="#C1272D"/> {/* Right arm */}
            
            {/* Legs in green */}
            <rect x="28" y="38" width="4" height="14" rx="2" fill="#006233"/> {/* Left leg */}
            <rect x="32" y="38" width="4" height="14" rx="2" fill="#006233"/> {/* Right leg */}
            
            {/* Soccer ball at feet */}
            <circle cx="26" cy="54" r="4" fill="white" stroke="#000" strokeWidth="0.5"/>
            <path d="M24 54 L28 54 M26 52 L26 56" stroke="#000" strokeWidth="0.5"/>
          </svg>
        </div>
      </div>
    </div>
  );
}
