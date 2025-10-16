import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CheckCircle2, Lock, Play } from "lucide-react";
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
  const difficultyColors = {
    Easy: "bg-success/10 text-success-foreground border-success/20",
    Medium: "bg-warning/10 text-warning-foreground border-warning/20",
    Hard: "bg-destructive/10 text-destructive-foreground border-destructive/20",
  };

  return (
    <Card
      className={cn(
        "transition-all hover-elevate",
        isLocked && "opacity-60"
      )}
      data-testid={`lesson-card-${id}`}
    >
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-xl">{title}</CardTitle>
          {isCompleted && (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-success" data-testid="icon-completed" />
          )}
          {isLocked && (
            <Lock className="h-5 w-5 shrink-0 text-muted-foreground" data-testid="icon-locked" />
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline" className={difficultyColors[difficulty]} data-testid="badge-difficulty">
            {difficulty}
          </Badge>
          <Badge variant="outline" data-testid="badge-xp">
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
