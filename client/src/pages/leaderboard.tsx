import { LeaderboardItem } from "@/components/leaderboard-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy } from "lucide-react";

export default function Leaderboard() {
  const mockLeaderboard = [
    { rank: 1, username: "LanguageMaster", xp: 2450 },
    { rank: 2, username: "PolyglotPro", xp: 2100 },
    { rank: 3, username: "WordWizard", xp: 1850 },
    { rank: 4, username: "Learner", xp: 350, isCurrentUser: true },
    { rank: 5, username: "SpanishStar", xp: 1200 },
    { rank: 6, username: "LinguaLion", xp: 980 },
    { rank: 7, username: "VocabVault", xp: 875 },
    { rank: 8, username: "GrammarGuru", xp: 750 },
  ];

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Leaderboard</h1>
        <p className="text-lg text-muted-foreground">
          See how you rank against other learners
        </p>
      </div>

      <Tabs defaultValue="global" className="space-y-6">
        <TabsList>
          <TabsTrigger value="global" data-testid="tab-global">
            Global
          </TabsTrigger>
          <TabsTrigger value="spanish" data-testid="tab-spanish">
            Spanish
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-4">
          {mockLeaderboard.map((entry) => (
            <LeaderboardItem
              key={entry.rank}
              rank={entry.rank}
              username={entry.username}
              xp={entry.xp}
              isCurrentUser={entry.isCurrentUser}
            />
          ))}
        </TabsContent>

        <TabsContent value="spanish">
          <Card>
            <CardContent className="flex min-h-64 flex-col items-center justify-center gap-2">
              <Trophy className="h-12 w-12 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                Complete more Spanish lessons to appear on this leaderboard
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
