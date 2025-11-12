import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { XPBar } from "@/components/xp-bar";
import { StreakCounter } from "@/components/streak-counter";
import { BadgeDisplay } from "@/components/badge-display";
import { ArrowRight, BookOpen, Trophy, Users, Flame, Zap, Target, Award, Map, Sparkles } from "lucide-react";
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

  // Calculate XP progress correctly
  const currentLevelProgress = user.xp - (user.level * 100);
  const xpNeededForNextLevel = 100;
  const xpProgress = (currentLevelProgress / xpNeededForNextLevel) * 100;

  return (
    <div className="space-y-8">
      {/* Hero Section - RPG Style */}
      <div className="relative overflow-hidden rounded-lg border bg-gradient-to-br from-primary/10 via-background to-background p-4 sm:p-6">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 19px, hsl(var(--primary) / 0.1) 19px, hsl(var(--primary) / 0.1) 20px), repeating-linear-gradient(90deg, transparent, transparent 19px, hsl(var(--primary) / 0.1) 19px, hsl(var(--primary) / 0.1) 20px)',
          }}></div>
        </div>
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-primary/20 border-2 border-primary/40 shadow-lg shadow-primary/20">
              <Sparkles className="h-7 w-7 sm:h-8 sm:w-8 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">Welcome back, {user.username}!</h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Ready for your next quest?
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Dashboard - Gaming Style */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Level Card */}
        <Card className="relative overflow-hidden border-2 border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <Target className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground">LEVEL</p>
                <p className="text-2xl font-bold text-primary">{user.level}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* XP Card */}
        <Card className="relative overflow-hidden border-2 border-warning/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/20 text-warning">
                <Zap className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground">TOTAL XP</p>
                <p className="text-2xl font-bold text-warning">{user.xp}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streak Card */}
        <Card className="relative overflow-hidden border-2 border-destructive/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-destructive/20 text-destructive">
                <Flame className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground">STREAK</p>
                <p className="text-2xl font-bold text-destructive">{user.streak} days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges Card */}
        <Card className="relative overflow-hidden border-2 border-success/20">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/20 text-success">
                <Award className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground">BADGES</p>
                <p className="text-2xl font-bold text-success">
                  {badgesWithEarnedStatus.filter(b => b.earned).length}/{badgesWithEarnedStatus.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* XP Progress Bar - Energy Blue/Green */}
      <Card className="border-2 border-success/20 bg-gradient-to-r from-success/5 to-primary/5">
        <CardContent className="p-6 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Progress to Level {user.level + 1}</p>
              <p className="text-2xl font-bold">
                <span className="text-success">{currentLevelProgress}</span>
                <span className="text-muted-foreground"> / {xpNeededForNextLevel} XP</span>
              </p>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-lg px-3 py-1">
              {Math.round(xpProgress)}%
            </Badge>
          </div>
          <div className="relative h-4 w-full overflow-hidden rounded-full bg-secondary border border-success/20">
            <div
              className="h-full bg-gradient-to-r from-success/80 via-primary to-success/80 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(var(--success),0.5)]"
              style={{ width: `${Math.max(0, Math.min(100, xpProgress))}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions - Quest Cards */}
      <div className="space-y-3">
        <h2 className="text-xl font-semibold flex items-center gap-2">
          <Map className="h-5 w-5 text-primary" />
          Available Quests
        </h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/learn">
            <Card className="group cursor-pointer transition-all hover-elevate active-elevate-2 border-2 border-primary/20 hover:border-primary/40" data-testid="card-quick-learn">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary group-hover:scale-110 transition-transform">
                      <BookOpen className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">Continue Quest</CardTitle>
                      <CardDescription>Resume your learning</CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <Zap className="h-3 w-3 mr-1" />
                    +10 XP per lesson
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/leaderboard">
            <Card className="group cursor-pointer transition-all hover-elevate active-elevate-2 border-2 border-warning/20 hover:border-warning/40" data-testid="card-quick-leaderboard">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-warning/20 to-warning/10 text-warning group-hover:scale-110 transition-transform">
                      <Trophy className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">Leaderboard</CardTitle>
                      <CardDescription>Compete with others</CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-warning group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                    <Trophy className="h-3 w-3 mr-1" />
                    Global Rankings
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>

          <Link href="/vocabulary">
            <Card className="group cursor-pointer transition-all hover-elevate active-elevate-2 border-2 border-success/20 hover:border-success/40" data-testid="card-quick-vocabulary">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-success/20 to-success/10 text-success group-hover:scale-110 transition-transform">
                      <BookOpen className="h-7 w-7" />
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-lg">Review Words</CardTitle>
                      <CardDescription>Practice vocabulary</CardDescription>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-muted-foreground group-hover:text-success group-hover:translate-x-1 transition-all" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    <Target className="h-3 w-3 mr-1" />
                    Memory Training
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
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
