import { Flame, Droplet } from "lucide-react";

interface CalabashXPBarProps {
  currentXP: number;
  maxXP: number;
  level: number;
}

export function CalabashXPBar({ currentXP, maxXP, level }: CalabashXPBarProps) {
  const progress = Math.min(Math.max((currentXP / maxXP) * 100, 0), 100);
  
  return (
    <div className="flex items-center gap-3" data-testid="calabash-xp-bar">
      <div className="flex items-center gap-2">
        <Droplet className="w-5 h-5 text-success" data-testid="icon-calabash" />
        <span className="text-sm font-semibold whitespace-nowrap" data-testid="text-level">
          Malam {level}
        </span>
      </div>
      
      <div className="relative flex-1 h-8 bg-card border border-border rounded-full overflow-hidden min-w-[120px] max-w-[200px]">
        <div className="absolute inset-0 flex items-center justify-center">
          <svg viewBox="0 0 100 30" className="w-full h-full opacity-20">
            <ellipse cx="20" cy="15" rx="12" ry="10" fill="currentColor" className="text-border" />
            <ellipse cx="50" cy="15" rx="15" ry="12" fill="currentColor" className="text-border" />
            <ellipse cx="80" cy="15" rx="12" ry="10" fill="currentColor" className="text-border" />
          </svg>
        </div>
        
        <div
          className="h-full bg-gradient-to-r from-success via-success to-gold transition-all duration-700 ease-out relative animate-calabash-fill"
          style={{ width: `${progress}%` }}
          data-testid="progress-calabash-fill"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent" />
        </div>
      </div>
      
      <span className="text-xs text-muted-foreground whitespace-nowrap" data-testid="text-xp-count">
        {currentXP}/{maxXP}
      </span>
    </div>
  );
}

interface IncenseStreakCounterProps {
  streak: number;
  isActive?: boolean;
}

export function IncenseStreakCounter({ streak, isActive = true }: IncenseStreakCounterProps) {
  return (
    <div className="flex items-center gap-2" data-testid="incense-streak-counter">
      <div className="relative" data-testid="container-incense">
        <Flame 
          className={`w-5 h-5 transition-colors ${
            isActive && streak > 0
              ? 'text-primary animate-pulse' 
              : 'text-muted-foreground'
          }`}
          data-testid="icon-incense-flame"
        />
        
        {isActive && streak > 0 && (
          <>
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-1 h-4 bg-gradient-to-t from-primary/60 to-transparent animate-incense-smoke" 
                 style={{ animationDelay: '0ms' }}
                 data-testid="smoke-wisp-1" />
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-1 h-3 bg-gradient-to-t from-primary/40 to-transparent animate-incense-smoke" 
                 style={{ animationDelay: '400ms' }}
                 data-testid="smoke-wisp-2" />
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-1 h-5 bg-gradient-to-t from-primary/50 to-transparent animate-incense-smoke" 
                 style={{ animationDelay: '800ms' }}
                 data-testid="smoke-wisp-3" />
          </>
        )}
      </div>
      
      <span className="text-sm font-semibold" data-testid="text-streak-count">
        {streak} {streak === 1 ? 'rana' : 'ranaku'}
      </span>
    </div>
  );
}

interface KolaNutProgressProps {
  progress: number;
  total?: number;
}

export function KolaNutProgress({ progress, total = 100 }: KolaNutProgressProps) {
  const percentage = Math.min(Math.max((progress / total) * 100, 0), 100);
  const nutsCount = Math.floor(percentage / 10);
  
  return (
    <div className="flex flex-col gap-2" data-testid="kola-nut-progress">
      <div className="flex items-center justify-center gap-1 flex-wrap">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              i < nutsCount
                ? 'bg-gradient-to-br from-amber-600 to-amber-800 shadow-md'
                : 'bg-muted border border-border'
            }`}
            data-testid={`kola-nut-${i}`}
          />
        ))}
      </div>
      <div className="text-xs text-center text-muted-foreground" data-testid="text-progress-percentage">
        {Math.round(percentage)}% cikakke
      </div>
    </div>
  );
}

interface HennaDividerProps {
  className?: string;
}

export function HennaDivider({ className = "" }: HennaDividerProps) {
  return (
    <div className={`w-full h-px relative overflow-hidden ${className}`} data-testid="henna-divider">
      <svg className="w-full h-full" viewBox="0 0 200 2" preserveAspectRatio="none">
        <path
          d="M0,1 Q10,0 20,1 T40,1 T60,1 T80,1 T100,1 T120,1 T140,1 T160,1 T180,1 Q190,2 200,1"
          stroke="hsl(var(--henna))"
          strokeWidth="0.5"
          fill="none"
          className="animate-henna-draw"
          strokeDasharray="1000"
          strokeDashoffset="1000"
        />
      </svg>
    </div>
  );
}

interface LeatherCardProps {
  children: React.ReactNode;
  className?: string;
  embossed?: boolean;
}

export function LeatherCard({ children, className = "", embossed = false }: LeatherCardProps) {
  return (
    <div 
      className={`relative rounded-lg border-2 transition-all ${
        embossed ? 'border-amber-700/50' : 'border-border'
      } ${className}`}
      data-testid="leather-card"
    >
      <div className={`absolute inset-0 rounded-lg ${embossed ? 'leather-texture opacity-30' : ''}`} />
      <div className="relative bg-card/95 rounded-lg p-6">
        {children}
      </div>
      
      {embossed && (
        <>
          <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-amber-600/30 rounded-tl-lg" />
          <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-amber-600/30 rounded-tr-lg" />
          <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-amber-600/30 rounded-bl-lg" />
          <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-amber-600/30 rounded-br-lg" />
        </>
      )}
    </div>
  );
}

interface CowrieRewardProps {
  amount: number;
  onAnimationComplete?: () => void;
}

export function CowrieReward({ amount, onAnimationComplete }: CowrieRewardProps) {
  return (
    <div className="fixed inset-0 pointer-events-none z-50" data-testid="cowrie-reward-container">
      {Array.from({ length: Math.min(amount, 20) }).map((_, i) => {
        const randomX = Math.random() * 200 - 100;
        const randomY = Math.random() * 200 - 100;
        const delay = i * 50;
        
        return (
          <div
            key={i}
            className="absolute top-1/2 left-1/2 text-2xl animate-cowrie-scatter"
            style={{
              '--cowrie-x': `${randomX}px`,
              '--cowrie-y': `${randomY}px`,
              animationDelay: `${delay}ms`,
            } as React.CSSProperties}
            onAnimationEnd={i === Math.min(amount, 20) - 1 ? onAnimationComplete : undefined}
            data-testid={`cowrie-shell-${i}`}
          >
            🐚
          </div>
        );
      })}
    </div>
  );
}
