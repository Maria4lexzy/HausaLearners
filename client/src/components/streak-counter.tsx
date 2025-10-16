import { Flame } from "lucide-react";
import { cn } from "@/lib/utils";

interface StreakCounterProps {
  streak: number;
  className?: string;
}

export function StreakCounter({ streak, className }: StreakCounterProps) {
  const isActive = streak > 0;

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-full border px-3 py-1.5",
        isActive
          ? "border-warning/20 bg-warning/10 text-warning-foreground"
          : "border-border bg-muted text-muted-foreground",
        className
      )}
      data-testid="streak-counter"
    >
      <Flame
        className={cn(
          "h-4 w-4",
          isActive && "animate-pulse"
        )}
      />
      <span className="text-sm font-semibold" data-testid="text-streak">
        {streak} day{streak !== 1 ? "s" : ""}
      </span>
    </div>
  );
}
