import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BadgeDisplay } from "@/components/badge-display";
import { Trophy } from "lucide-react";
import { Link } from "wouter";
import { useCurrentUser } from "@/lib/user-context";
import { useQuery } from "@tanstack/react-query";
import { LeatherCard, KolaNutProgress, HennaDivider } from "@/components/hausa-gamification";
import { 
  TurbanIcon, 
  CalabashIcon, 
  IncenseIcon, 
  TalkingDrumIcon,
  MinaretIcon,
  CamelIcon,
  LeatherScrollIcon,
  HennaIcon,
  CowrieIcon,
  ZamaniPatternIcon,
  KolaNutIcon,
  DesertArrowIcon
} from "@/components/hausa-icons";

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

  // Calculate XP progress correctly using modulo
  const currentLevelProgress = user.xp % 100;
  const xpNeededForNextLevel = 100;
  const xpProgress = (currentLevelProgress / xpNeededForNextLevel) * 100;

  const userName = user.firstName || user.username || "Almajiri";

  return (
    <div className="space-y-8 fulani-diamonds">
      {/* Hero Section - Hausa Cultural Welcome */}
      <LeatherCard embossed className="relative overflow-hidden desert-waves">
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex h-14 w-14 sm:h-16 sm:w-16 shrink-0 items-center justify-center rounded-full bg-primary/20 border-2 border-primary shadow-lg shadow-primary/20 animate-turban-sway">
              <TurbanIcon className="h-7 w-7 sm:h-8 sm:w-8 text-primary" size={32} />
            </div>
            <div className="flex-1 min-w-0">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight">
                Sannu da zuwa, {userName}!
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Shirya don koyo? <span className="text-primary">Ready for your next quest?</span>
              </p>
            </div>
          </div>
        </div>
      </LeatherCard>

      {/* Stats Dashboard - Hausa Cultural Style */}
      <div className="grid gap-4 md:grid-cols-4">
        {/* Level Card - Malam Status */}
        <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent mud-cloth">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <TurbanIcon size={24} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground font-hausa">MALAM (LEVEL)</p>
                <p className="text-2xl font-bold text-primary">{user.level}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* XP Card - Calabash Count */}
        <Card className="relative overflow-hidden border-2 border-success/30 bg-gradient-to-br from-success/5 to-transparent mud-cloth">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-success/20 text-success">
                <CalabashIcon size={24} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground font-hausa">KWALABAR (XP)</p>
                <p className="text-2xl font-bold text-success">{user.xp}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Streak Card - Incense Burner */}
        <Card className="relative overflow-hidden border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-transparent mud-cloth">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/20 text-primary">
                <IncenseIcon size={24} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground font-hausa">RANAKU (STREAK)</p>
                <p className="text-2xl font-bold text-primary">{user.streak}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Badges Card - Achievements */}
        <Card className="relative overflow-hidden border-2 border-warning/30 bg-gradient-to-br from-warning/5 to-transparent mud-cloth">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-warning/20 text-warning animate-talking-drum-bounce">
                <TalkingDrumIcon size={24} />
              </div>
              <div className="flex-1">
                <p className="text-xs font-medium text-muted-foreground font-hausa">LAMBOBI (BADGES)</p>
                <p className="text-2xl font-bold text-warning">
                  {badgesWithEarnedStatus.filter(b => b.earned).length}/{badgesWithEarnedStatus.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Calabash Progress - Filling with Nono */}
      <LeatherCard className="border-2 border-success/30">
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <p className="text-sm font-medium text-muted-foreground">Tafiya zuwa Malam Level {user.level + 1}</p>
              <p className="text-xl sm:text-2xl font-bold">
                <span className="text-success">{currentLevelProgress}</span>
                <span className="text-muted-foreground"> / {xpNeededForNextLevel}</span>
                <span className="text-sm text-muted-foreground ml-2">calabashes</span>
              </p>
            </div>
            <Badge variant="outline" className="bg-success/10 text-success border-success/20 text-lg px-3 py-1">
              {Math.round(xpProgress)}%
            </Badge>
          </div>
          <HennaDivider />
          <KolaNutProgress progress={currentLevelProgress} total={xpNeededForNextLevel} />
        </div>
      </LeatherCard>

      {/* Quick Actions - Hausa Quest Cards */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <CamelIcon className="h-5 w-5 text-primary" size={20} />
          <h2 className="text-xl font-semibold font-hausa">Ayyukan Koyo</h2>
          <span className="text-sm text-muted-foreground">(Available Quests)</span>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <Link href="/learn">
            <LeatherCard embossed className="group cursor-pointer transition-all hover-elevate active-elevate-2 hover:shadow-xl" data-testid="card-quick-learn">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 text-primary group-hover:scale-110 transition-transform">
                      <MinaretIcon className="h-7 w-7" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold font-hausa">Ci Gaba</h3>
                      <p className="text-sm text-muted-foreground">Continue learning journey</p>
                    </div>
                  </div>
                  <DesertArrowIcon className="h-5 w-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" size={20} />
                </div>
                <HennaDivider />
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/20">
                    <CalabashIcon className="h-3 w-3 mr-1" size={12} />
                    +10 calabashes
                  </Badge>
                </div>
              </div>
            </LeatherCard>
          </Link>

          <Link href="/leaderboard">
            <LeatherCard embossed className="group cursor-pointer transition-all hover-elevate active-elevate-2 hover:shadow-xl" data-testid="card-quick-leaderboard">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-warning/20 to-warning/10 text-warning group-hover:scale-110 transition-transform">
                      <Trophy className="h-7 w-7 animate-golden-glow" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold font-hausa">Gwaninta</h3>
                      <p className="text-sm text-muted-foreground">Compete with scholars</p>
                    </div>
                  </div>
                  <DesertArrowIcon className="h-5 w-5 text-muted-foreground group-hover:text-warning group-hover:translate-x-1 transition-all" size={20} />
                </div>
                <HennaDivider />
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
                    <TalkingDrumIcon className="h-3 w-3 mr-1" size={12} />
                    Sarkin Karatu
                  </Badge>
                </div>
              </div>
            </LeatherCard>
          </Link>

          <Link href="/vocabulary">
            <LeatherCard embossed className="group cursor-pointer transition-all hover-elevate active-elevate-2 hover:shadow-xl" data-testid="card-quick-vocabulary">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3 flex-1">
                    <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-success/20 to-success/10 text-success group-hover:scale-110 transition-transform">
                      <LeatherScrollIcon className="h-7 w-7" size={28} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold font-hausa">Kalmomi</h3>
                      <p className="text-sm text-muted-foreground">Review vocabulary</p>
                    </div>
                  </div>
                  <DesertArrowIcon className="h-5 w-5 text-muted-foreground group-hover:text-success group-hover:translate-x-1 transition-all" size={20} />
                </div>
                <HennaDivider />
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    <KolaNutIcon className="h-3 w-3 mr-1" size={12} />
                    Tunawa
                  </Badge>
                </div>
              </div>
            </LeatherCard>
          </Link>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-2xl font-semibold">Lamar Ci Gaba</h2>
            <span className="text-sm text-muted-foreground">(Your Achievements)</span>
          </div>
          <Badge variant="outline" className="bg-warning/10 text-warning border-warning/20">
            {badgesWithEarnedStatus.filter(b => b.earned).length}/{badgesWithEarnedStatus.length} earned
          </Badge>
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
          <LeatherCard>
            <p className="text-center text-muted-foreground">
              Babu lambar ci gaba a yanzu. Kammala darussa don samun kari!
              <span className="block mt-2 text-sm">(No badges yet. Complete lessons to earn achievements!)</span>
            </p>
          </LeatherCard>
        )}
      </div>
    </div>
  );
}
