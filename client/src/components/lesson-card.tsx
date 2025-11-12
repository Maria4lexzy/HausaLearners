import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, Play, Zap, Sword } from "lucide-react";
import { cn } from "@/lib/utils";

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
      icon: <Zap className="h-3 w-3" />,
    },
    Medium: {
      color: "bg-warning/10 text-warning border-warning/20",
      glow: "shadow-warning/20",
      icon: <Zap className="h-3 w-3" />,
    },
    Hard: {
      color: "bg-destructive/10 text-destructive border-destructive/20",
      glow: "shadow-destructive/20",
      icon: <Sword className="h-3 w-3" />,
    },
  };

  const difficultyInfo = difficultyConfig[difficulty];

  return (
    <Card
      className={cn(
        "group relative transition-all hover-elevate border-2",
        isCompleted && "border-success/30 bg-gradient-to-br from-success/5 to-background",
        isLocked && "opacity-60 grayscale",
        !isCompleted && !isLocked && "hover:border-primary/30"
      )}
      data-testid={`lesson-card-${id}`}
    >
      {isCompleted && (
        <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-success shadow-lg z-10">
          <CheckCircle2 className="h-5 w-5 text-success-foreground" data-testid="icon-completed" />
        </div>
      )}
      {isLocked && (
        <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full bg-muted border-2 z-10">
          <Lock className="h-4 w-4 text-muted-foreground" data-testid="icon-locked" />
        </div>
      )}
      
      <CardHeader className="gap-2 pb-3">
        <CardTitle className="text-lg group-hover:text-primary transition-colors">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      
      <CardContent className="pb-3">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={cn("font-medium", difficultyInfo.color)} data-testid="badge-difficulty">
            {difficultyInfo.icon}
            <span className="ml-1">{difficulty}</span>
          </Badge>
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20 font-medium" data-testid="badge-xp">
            <Zap className="h-3 w-3 mr-1" />
            +{xpReward} XP
          </Badge>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          onClick={onStart}
          disabled={isLocked}
          className="w-full"
          data-testid="button-start-lesson"
        >
          {isCompleted ? (
            <>
              <Play className="mr-2 h-4 w-4" />
              Practice Again
            </>
          ) : (
            <>
              <Play className="mr-2 h-4 w-4" />
              Start Lesson
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
}
