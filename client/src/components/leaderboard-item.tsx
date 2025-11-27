import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Trophy, Medal, Award } from "lucide-react";
import { cn } from "@/lib/utils";

interface LeaderboardItemProps {
  rank: number;
  username: string;
  xp: number;
  isCurrentUser?: boolean;
}

export function LeaderboardItem({ rank, username, xp, isCurrentUser }: LeaderboardItemProps) {
  const rankIcons = {
    1: <Trophy className="h-5 w-5 text-yellow-500" />,
    2: <Medal className="h-5 w-5 text-gray-400" />,
    3: <Award className="h-5 w-5 text-amber-700" />,
  };

  const topThreeGradients = {
    1: "from-yellow-500/10 to-yellow-500/5",
    2: "from-gray-400/10 to-gray-400/5",
    3: "from-amber-700/10 to-amber-700/5",
  };

  return (
    <div
      className={cn(
        "flex items-center gap-4 rounded-lg border p-4 transition-all hover-elevate",
        isCurrentUser && "border-primary bg-primary/5",
        rank <= 3 && `bg-gradient-to-r ${topThreeGradients[rank as 1 | 2 | 3]}`
      )}
      data-testid={`leaderboard-item-${rank}`}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-muted font-bold">
        {rank <= 3 ? rankIcons[rank as 1 | 2 | 3] : <span data-testid="text-rank">{rank}</span>}
      </div>

      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-primary/10 text-primary">
          {username ? username.slice(0, 2).toUpperCase() : "??"}
        </AvatarFallback>
      </Avatar>

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <span className="font-semibold" data-testid="text-username">
            {username}
          </span>
          {isCurrentUser && (
            <Badge variant="outline" className="text-xs">
              You
            </Badge>
          )}
        </div>
      </div>

      <Badge variant="secondary" data-testid="badge-xp">
        {xp.toLocaleString()} XP
      </Badge>
    </div>
  );
}
