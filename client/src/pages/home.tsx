import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { XPBar } from "@/components/xp-bar";
import { StreakCounter } from "@/components/streak-counter";
import { BadgeDisplay } from "@/components/badge-display";
import { ArrowRight, BookOpen, Trophy, Users } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  const mockUser = {
    username: "Learner",
    xp: 350,
    level: 4,
    streak: 7,
  };

  const mockBadges = [
    { name: "First Step", description: "Complete your first lesson", icon: "Star", earned: true, earnedAt: "2025-01-15" },
    { name: "Week Warrior", description: "Maintain a 7-day streak", icon: "Flame", earned: true, earnedAt: "2025-01-20" },
    { name: "Century Club", description: "Earn 100 XP", icon: "Trophy", earned: true, earnedAt: "2025-01-18" },
    { name: "Contributor", description: "Submit your first lesson", icon: "Award", earned: false },
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Welcome back, {mockUser.username}!</h1>
        <p className="text-lg text-muted-foreground">
          Continue your language learning journey
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <XPBar currentXP={mockUser.xp} level={mockUser.level} />
        <Card className="flex items-center justify-between p-4">
          <div className="space-y-1">
            <h3 className="text-sm font-medium text-muted-foreground">Current Streak</h3>
            <StreakCounter streak={mockUser.streak} className="border-0 bg-transparent p-0" />
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
            {mockBadges.filter(b => b.earned).length}/{mockBadges.length} earned
          </span>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mockBadges.map((badge) => (
            <BadgeDisplay
              key={badge.name}
              name={badge.name}
              description={badge.description}
              icon={badge.icon}
              earned={badge.earned}
              earnedAt={badge.earnedAt}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
