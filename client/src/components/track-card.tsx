import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Book, Lock, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

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
    <Card
      className={cn(
        "cursor-pointer transition-all hover-elevate active-elevate-2",
        isLocked && "opacity-60"
      )}
      onClick={onClick}
      data-testid={`track-card-${id}`}
    >
      <CardHeader className="gap-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Book className="h-5 w-5" />
            </div>
            <CardTitle className="text-xl">{name}</CardTitle>
          </div>
          {isComplete && (
            <CheckCircle2 className="h-5 w-5 shrink-0 text-success" data-testid="icon-track-completed" />
          )}
          {isLocked && (
            <Lock className="h-5 w-5 shrink-0 text-muted-foreground" data-testid="icon-track-locked" />
          )}
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {isLocked ? (
          <Badge variant="outline" data-testid="badge-unlock-level">
            Unlocks at Level {unlockLevel}
          </Badge>
        ) : (
          <>
            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Progress</span>
                <span className="font-medium" data-testid="text-progress">
                  {lessonsCompleted}/{totalLessons} lessons
                </span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full bg-gradient-to-r from-primary to-success transition-all"
                  style={{ width: `${completionPercentage}%` }}
                  data-testid="progress-track"
                />
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
