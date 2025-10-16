import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";
import { Trophy } from "lucide-react";

interface XPBarProps {
  currentXP: number;
  level: number;
}

export function XPBar({ currentXP, level }: XPBarProps) {
  const xpForNextLevel = level * 100;
  const xpInCurrentLevel = currentXP % 100;
  const progress = (xpInCurrentLevel / xpForNextLevel) * 100;

  return (
    <Card className="p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Trophy className="h-5 w-5" />
        </div>
        <div className="flex-1">
          <div className="mb-1 flex items-center justify-between text-sm">
            <span className="font-semibold" data-testid="text-level">
              Level {level}
            </span>
            <span className="text-muted-foreground" data-testid="text-xp">
              {xpInCurrentLevel}/{xpForNextLevel} XP
            </span>
          </div>
          <Progress value={progress} className="h-2" data-testid="progress-xp" />
        </div>
      </div>
    </Card>
  );
}
