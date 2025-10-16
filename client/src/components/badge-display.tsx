import { Award, Lock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface BadgeDisplayProps {
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedAt?: string;
}

export function BadgeDisplay({ name, description, earned, earnedAt }: BadgeDisplayProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Card
          className={cn(
            "cursor-pointer transition-all hover-elevate",
            !earned && "opacity-50 grayscale"
          )}
          data-testid={`badge-${name.toLowerCase().replace(/\s+/g, "-")}`}
        >
          <CardContent className="flex flex-col items-center gap-2 p-4">
            <div
              className={cn(
                "flex h-16 w-16 items-center justify-center rounded-full",
                earned
                  ? "bg-gradient-to-br from-warning to-success shadow-lg"
                  : "bg-muted"
              )}
            >
              {earned ? (
                <Award className="h-8 w-8 text-white" />
              ) : (
                <Lock className="h-8 w-8 text-muted-foreground" />
              )}
            </div>
            <span className="text-center text-sm font-semibold">{name}</span>
          </CardContent>
        </Card>
      </TooltipTrigger>
      <TooltipContent>
        <div className="max-w-xs">
          <p className="font-semibold">{name}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
          {earned && earnedAt && (
            <p className="mt-1 text-xs text-muted-foreground">
              Earned {new Date(earnedAt).toLocaleDateString()}
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  );
}
