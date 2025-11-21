import { Badge } from "@/components/ui/badge";
import { Lock, Map, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";
import { LeatherCard, HennaDivider, KolaNutProgress } from "@/components/hausa-gamification";

interface TrackCardProps {
  id: string;
  name: string;
  description: string;
  isLocked: boolean;
  unlockLevel: number;
  lessonsCompleted: number;
  totalLessons: number;
  onClick: () => void;
}

export function TrackCard({
  id,
  name,
  description,
  isLocked,
  unlockLevel,
  lessonsCompleted,
  totalLessons,
  onClick,
}: TrackCardProps) {
  const completionPercentage = totalLessons > 0 ? (lessonsCompleted / totalLessons) * 100 : 0;
  const isComplete = lessonsCompleted === totalLessons && totalLessons > 0;

  return (
    <div onClick={onClick} data-testid={`track-card-${id}`}>
      <LeatherCard
        embossed
        className={cn(
          "group cursor-pointer transition-all hover-elevate active-elevate-2 hover:shadow-xl",
          isComplete && "border-success/40",
          isLocked && "opacity-60 grayscale",
          !isComplete && !isLocked && "border-primary/30"
        )}
      >
      <div className="space-y-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 flex-1 min-w-0">
            <div className={cn(
              "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border-2 transition-all",
              isComplete && "bg-success/20 border-success/40 text-success animate-golden-glow",
              isLocked && "bg-muted border-muted-foreground/20 text-muted-foreground",
              !isComplete && !isLocked && "bg-primary/20 border-primary/40 text-primary group-hover:scale-110"
            )}>
              {isComplete ? <Trophy className="h-6 w-6" /> : <Map className="h-6 w-6" />}
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold group-hover:text-primary transition-colors truncate">{name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">{description}</p>
            </div>
          </div>
          {isLocked && (
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-muted border-2">
              <Lock className="h-4 w-4 text-muted-foreground" data-testid="icon-track-locked" />
            </div>
          )}
        </div>
        
        <HennaDivider />
        
        <div className="space-y-3">
          {isLocked ? (
            <Badge variant="outline" className="bg-muted text-muted-foreground border-muted-foreground/20" data-testid="badge-unlock-level">
              <Lock className="h-3 w-3 mr-1" />
              Level {unlockLevel} Required
            </Badge>
          ) : totalLessons === 0 ? (
            <Badge variant="outline" className="bg-muted/50 text-muted-foreground border-muted-foreground/20">
              Babu darussa tukuna (No lessons yet)
            </Badge>
          ) : (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Ci Gaba (Progress)</span>
                <span className="font-medium" data-testid="text-progress">
                  {lessonsCompleted}/{totalLessons}
                </span>
              </div>
              <div className="h-3 overflow-hidden rounded-full bg-secondary border border-primary/20">
                <div
                  className={cn(
                    "h-full transition-all duration-500",
                    isComplete 
                      ? "bg-gradient-to-r from-success to-success/80" 
                      : "bg-gradient-to-r from-primary via-primary/80 to-success"
                  )}
                  style={{ width: `${Math.min(completionPercentage, 100)}%` }}
                  data-testid="progress-track"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </LeatherCard>
    </div>
  );
}
