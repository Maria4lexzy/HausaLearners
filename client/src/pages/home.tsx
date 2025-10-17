import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XPBar } from "@/components/xp-bar";
import { StreakCounter } from "@/components/streak-counter";
import { BadgeDisplay } from "@/components/badge-display";
import { ArrowRight, BookOpen, Trophy, Users } from "lucide-react";
import { Link } from "wouter";
import { useCurrentUser } from "@/lib/user-context";
import { useQuery } from "@tanstack/react-query";

interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  xpRequired: number;
  createdAt: string;
}

interface UserBadge {
  badgeId: number;
  earnedAt: string;
  badge: Badge;
}

export default function Home() {
  const { user } = useCurrentUser();

  const { data: userBadges = [] } = useQuery<UserBadge[]>({
    queryKey: ["/api/badges/user", user?.id],
    enabled: !!user,
  });

  const { data: allBadges = [] } = useQuery<Badge[]>({
    queryKey: ["/api/badges"],
    enabled: !!user,
  });

  if (!user) return null;

  const badgesWithEarnedStatus = allBadges.map(badge => {
    const userBadge = userBadges.find(ub => ub.badgeId === badge.id);
    return {
      ...badge,
      earned: !!userBadge,
      earnedAt: userBadge?.earnedAt,
    };
  });

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Welcome back, {user.username}!</h1>
        <p className="text-lg text-muted-foreground">
          Continue your language learning journey
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <XPBar currentXP={user.xp} level={user.level} />
        <Card className="flex items-center justify-between p-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">Current Streak</h3>
            <StreakCounter streak={user.streak} className="border-0 bg-transparent p-0" />
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Link href="/learn">
          <Card className="cursor-pointer transition-all hover-elevate active-elevate-2" data-testid="card-quick-learn">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>Start Learning</CardTitle>
                  <CardDescription>Continue where you left off</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/leaderboard">
          <Card className="cursor-pointer transition-all hover-elevate active-elevate-2" data-testid="card-quick-leaderboard">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/10 text-warning">
                  <Trophy className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>Leaderboard</CardTitle>
                  <CardDescription>See your ranking</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>

        <Link href="/contribute">
          <Card className="cursor-pointer transition-all hover-elevate active-elevate-2" data-testid="card-quick-contribute">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/10 text-success">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <CardTitle>Contribute</CardTitle>
                  <CardDescription>Share your knowledge</CardDescription>
                </div>
              </div>
            </CardHeader>
          </Card>
        </Link>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold">Your Achievements</h2>
          <span className="text-sm text-muted-foreground">
            {badgesWithEarnedStatus.filter(b => b.earned).length}/{badgesWithEarnedStatus.length} earned
          </span>
        </div>
        {badgesWithEarnedStatus.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {badgesWithEarnedStatus.map((badge) => (
              <BadgeDisplay
                key={badge.id}
                name={badge.name}
                description={badge.description}
                icon={badge.icon}
                earned={badge.earned}
                earnedAt={badge.earnedAt}
              />
            ))}
          </div>
        ) : (
          <Card className="p-8 text-center">
            <p className="text-muted-foreground">No badges available yet. Complete lessons to earn achievements!</p>
          </Card>
        )}
      </div>
    </div>
  );
}
