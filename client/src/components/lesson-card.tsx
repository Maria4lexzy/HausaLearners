import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, Play, Droplet, Sword } from "lucide-react";
import { cn } from "@/lib/utils";
import { LeatherCard, HennaDivider } from "@/components/hausa-gamification";

interface LessonCardProps {
  id: string;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  xpReward: number;
  isLocked: boolean;
  isCompleted: boolean;
  onStart: () => void;
}

export function LessonCard({
  id,
  title,
  description,
  difficulty,
  xpReward,
  isLocked,
  isCompleted,
  onStart,
}: LessonCardProps) {
  const difficultyConfig = {
    Easy: {
      color: "bg-success/10 text-success border-success/20",
      glow: "shadow-success/20",
      icon: <Droplet className="h-3 w-3" />,
      label: "Sauki (Easy)",
    },
    Medium: {
      color: "bg-warning/10 text-warning border-warning/20",
      glow: "shadow-warning/20",
      icon: <Droplet className="h-3 w-3" />,
      label: "Matsakaici (Medium)",
    },
    Hard: {
      color: "bg-destructive/10 text-destructive border-destructive/20",
      glow: "shadow-destructive/20",
      icon: <Sword className="h-3 w-3" />,
      label: "Wuya (Hard)",
    },
  };

  const difficultyInfo = difficultyConfig[difficulty];

  return (
    <div className="relative">
      <LeatherCard
        embossed
        className={cn(
          "group transition-all hover-elevate hover:shadow-xl",
          isCompleted && "border-success/40",
          isLocked && "opacity-60 grayscale",
          !isCompleted && !isLocked && "border-primary/30"
        )}
        data-testid={`lesson-card-${id}`}
      >
        <div className="space-y-4">
          <div>
            <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">{title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          
          <HennaDivider />
          
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline" className={cn("font-medium", difficultyInfo.color)} data-testid="badge-difficulty">
              {difficultyInfo.icon}
              <span className="ml-1">{difficultyInfo.label}</span>
            </Badge>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20 font-medium" data-testid="badge-xp">
              <Droplet className="h-3 w-3 mr-1" />
              +{xpReward}
            </Badge>
          </div>
          
          <Button
            onClick={onStart}
            disabled={isLocked}
            className="w-full"
            data-testid="button-start-lesson"
          >
            {isCompleted ? (
              <>
                <Play className="mr-2 h-4 w-4" />
                Sake Gwadawa (Practice Again)
              </>
            ) : (
              <>
                <Play className="mr-2 h-4 w-4" />
                Fara Darasi (Start Lesson)
              </>
            )}
          </Button>
        </div>
      </LeatherCard>
      
      {isCompleted && (
        <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-success shadow-lg z-10 animate-golden-glow">
          <CheckCircle2 className="h-5 w-5 text-success-foreground" data-testid="icon-completed" />
        </div>
      )}
      {isLocked && (
        <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted border-2 z-10">
          <Lock className="h-4 w-4 text-muted-foreground" data-testid="icon-locked" />
        </div>
      )}
    </div>
  );
}
