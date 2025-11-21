/**
 * Hausa Cultural Icon System
 * Traditional Northern Nigerian symbols and patterns
 */

interface IconProps {
  className?: string;
  size?: number;
  'aria-hidden'?: boolean;
}

// Talking Drum (Kalangu) - for achievements and celebrations
export function TalkingDrumIcon({ className = "", size = 24, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      role="img"
    >
      <title>Talking Drum (Achievement)</title>
      {/* Drum body */}
      <path d="M7 4 L17 4 L19 12 L17 20 L7 20 L5 12 Z" />
      {/* Lacing */}
      <line x1="7" y1="6" x2="5" y2="12" />
      <line x1="17" y1="6" x2="19" y2="12" />
      <line x1="7" y1="18" x2="5" y2="12" />
      <line x1="17" y1="18" x2="19" y2="12" />
      {/* Decorative patterns */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

// Calabash (Kwalabar) - for XP and rewards
export function CalabashIcon({ className = "", size = 24, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      role="img"
    >
      <title>Calabash (XP Reward)</title>
      {/* Calabash bowl */}
      <path d="M4 14 Q4 20 12 20 Q20 20 20 14 L20 10 Q20 8 18 8 L6 8 Q4 8 4 10 Z" />
      {/* Decorative rim */}
      <ellipse cx="12" cy="9" rx="8" ry="2" />
      {/* Traditional patterns */}
      <path d="M8 12 L10 16" strokeWidth="1" />
      <path d="M16 12 L14 16" strokeWidth="1" />
      <circle cx="12" cy="14" r="1" fill="currentColor" />
    </svg>
  );
}

// Turban (Rawani) - for user profile and level
export function TurbanIcon({ className = "", size = 24, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      role="img"
    >
      <title>Turban (Level)</title>
      {/* Turban wrap */}
      <path d="M4 12 Q4 8 8 6 Q12 5 16 6 Q20 8 20 12" />
      <path d="M4 12 Q4 10 6 9 L18 9 Q20 10 20 12" />
      <ellipse cx="12" cy="12" rx="8" ry="3" />
      {/* Decorative end piece */}
      <path d="M18 10 L20 8 L21 10" strokeWidth="1.5" />
    </svg>
  );
}

// Mosque Minaret - for learning/tracks
export function MinaretIcon({ className = "", size = 24, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      role="img"
    >
      <title>Minaret (Learning)</title>
      {/* Minaret base */}
      <rect x="8" y="14" width="8" height="7" />
      {/* Middle section */}
      <path d="M9 14 L9 10 L15 10 L15 14" />
      {/* Top section */}
      <path d="M10 10 L10 7 L14 7 L14 10" />
      {/* Dome */}
      <path d="M10 7 Q12 4 14 7" fill="currentColor" />
      {/* Crescent */}
      <path d="M11 4 Q11.5 3 12 4 Q11.5 3.5 11 4" strokeWidth="1.5" />
      {/* Windows */}
      <circle cx="12" cy="12" r="0.8" fill="currentColor" />
      <rect x="10.5" y="16" width="1" height="2" fill="currentColor" />
      <rect x="12.5" y="16" width="1" height="2" fill="currentColor" />
    </svg>
  );
}

// Cowrie Shell (Wuri) - for currency/rewards
export function CowrieIcon({ className = "", size = 24, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      role="img"
    >
      <title>Cowrie Shell (Reward)</title>
      {/* Shell body */}
      <ellipse cx="12" cy="12" rx="6" ry="8" />
      {/* Opening/teeth */}
      <path d="M9 12 Q12 14 15 12" strokeWidth="1" />
      <line x1="10" y1="11" x2="10" y2="13" strokeWidth="1" />
      <line x1="12" y1="11" x2="12" y2="13" strokeWidth="1" />
      <line x1="14" y1="11" x2="14" y2="13" strokeWidth="1" />
      {/* Shine */}
      <circle cx="10" cy="8" r="1" fill="currentColor" opacity="0.6" />
    </svg>
  );
}

// Henna Pattern - for decorative elements
export function HennaIcon({ className = "", size = 24, 'aria-hidden': ariaHidden = true }: IconProps) {
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
      aria-hidden={ariaHidden}
      role="img"
    >
      <title>Henna Pattern</title>
      {/* Central flower */}
      <circle cx="12" cy="12" r="3" />
      <circle cx="12" cy="12" r="1.5" fill="currentColor" />
      {/* Petals */}
      <path d="M12 8 Q10 6 12 4 Q14 6 12 8" />
      <path d="M12 16 Q10 18 12 20 Q14 18 12 16" />
      <path d="M8 12 Q6 10 4 12 Q6 14 8 12" />
      <path d="M16 12 Q18 10 20 12 Q18 14 16 12" />
      {/* Dots */}
      <circle cx="12" cy="6" r="0.5" fill="currentColor" />
      <circle cx="12" cy="18" r="0.5" fill="currentColor" />
      <circle cx="6" cy="12" r="0.5" fill="currentColor" />
      <circle cx="18" cy="12" r="0.5" fill="currentColor" />
    </svg>
  );
}

// Kola Nut (Goro) - for progress and milestones
export function KolaNutIcon({ className = "", size = 24, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      role="img"
    >
      <title>Kola Nut (Progress)</title>
      {/* Nut segments */}
      <circle cx="12" cy="12" r="7" />
      <path d="M12 5 L12 19" />
      <path d="M5 12 L19 12" />
      <path d="M8 8 L16 16" />
      <path d="M16 8 L8 16" />
      {/* Center */}
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
}

// Incense Burner (Turare) - for streaks
export function IncenseIcon({ className = "", size = 24, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      role="img"
    >
      <title>Incense (Streak)</title>
      {/* Smoke wisps */}
      <path d="M12 4 Q10 6 12 8" strokeWidth="1.5" opacity="0.6" />
      <path d="M10 5 Q8 7 10 9" strokeWidth="1.5" opacity="0.4" />
      <path d="M14 5 Q16 7 14 9" strokeWidth="1.5" opacity="0.4" />
      {/* Burner bowl */}
      <path d="M8 14 Q8 12 10 12 L14 12 Q16 12 16 14 L16 16 Q16 18 14 18 L10 18 Q8 18 8 16 Z" />
      {/* Stand */}
      <line x1="10" y1="18" x2="10" y2="20" />
      <line x1="14" y1="18" x2="14" y2="20" />
      <line x1="9" y1="20" x2="15" y2="20" />
    </svg>
  );
}

// Camel - for journey/learning path
export function CamelIcon({ className = "", size = 24, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      role="img"
    >
      <title>Camel (Journey)</title>
      {/* Body */}
      <path d="M6 12 L18 12 Q20 12 20 14 L20 16" />
      {/* Humps */}
      <path d="M10 12 Q10 8 12 10 Q14 8 14 12" />
      {/* Head and neck */}
      <path d="M6 12 L6 8 Q6 6 8 6" />
      {/* Legs */}
      <line x1="8" y1="16" x2="8" y2="20" />
      <line x1="12" y1="16" x2="12" y2="20" />
      <line x1="16" y1="16" x2="16" y2="20" />
      <line x1="19" y1="16" x2="19" y2="20" />
      {/* Tail */}
      <path d="M20 14 Q22 14 22 16" strokeWidth="1.5" />
    </svg>
  );
}

// Zamanen Zamani Pattern - traditional geometric
export function ZamaniPatternIcon({ className = "", size = 24, 'aria-hidden': ariaHidden = true }: IconProps) {
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
      aria-hidden={ariaHidden}
      role="img"
    >
      <title>Traditional Pattern</title>
      {/* Diamond pattern */}
      <path d="M12 4 L16 12 L12 20 L8 12 Z" />
      <path d="M12 4 L20 12 L12 20 L4 12 Z" opacity="0.6" />
      {/* Inner details */}
      <path d="M12 8 L14 12 L12 16 L10 12 Z" />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </svg>
  );
}

// Leather Book/Scroll - for lessons/learning
export function LeatherScrollIcon({ className = "", size = 24, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      role="img"
    >
      <title>Leather Scroll (Vocabulary)</title>
      {/* Scroll */}
      <rect x="6" y="4" width="12" height="16" rx="1" />
      {/* Rolled edges */}
      <path d="M6 4 Q4 4 4 6 L4 18 Q4 20 6 20" />
      <path d="M18 4 Q20 4 20 6 L20 18 Q20 20 18 20" />
      {/* Text lines */}
      <line x1="9" y1="8" x2="15" y2="8" strokeWidth="1" opacity="0.6" />
      <line x1="9" y1="12" x2="15" y2="12" strokeWidth="1" opacity="0.6" />
      <line x1="9" y1="16" x2="13" y2="16" strokeWidth="1" opacity="0.6" />
    </svg>
  );
}

// Desert Arrow - for navigation/direction
export function DesertArrowIcon({ className = "", size = 24, 'aria-hidden': ariaHidden = true }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden={ariaHidden}
      role="img"
    >
      <title>Desert Arrow</title>
      {/* Arrow shaft with desert texture */}
      <line x1="5" y1="12" x2="19" y2="12" />
      {/* Arrowhead */}
      <path d="M12 5 L19 12 L12 19" />
      {/* Decorative desert pattern dots */}
      <circle cx="8" cy="12" r="0.5" fill="currentColor" opacity="0.6" />
      <circle cx="11" cy="12" r="0.5" fill="currentColor" opacity="0.6" />
    </svg>
  );
}
