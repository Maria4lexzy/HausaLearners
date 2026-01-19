import { LeaderboardItem } from "@/components/leaderboard-item";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Trophy, Loader2 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/lib/user-context";

interface LeaderboardEntry {
  id: string;
  username: string;
  xp: number;
  level: number;
}

export default function Leaderboard() {
  const { user } = useCurrentUser();
  
  const { data: leaderboard = [], isLoading } = useQuery<LeaderboardEntry[]>({
    queryKey: ["/api/leaderboard"],
  });

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
          <TabsTrigger value="hausa" data-testid="tab-hausa">
            Hausa
          </TabsTrigger>
        </TabsList>

        <TabsContent value="global" className="space-y-4">
          {isLoading ? (
            <Card>
              <CardContent className="flex min-h-64 flex-col items-center justify-center gap-2">
                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                <p className="text-lg text-muted-foreground">Loading leaderboard...</p>
              </CardContent>
            </Card>
          ) : leaderboard.length > 0 ? (
            leaderboard.map((entry, index) => (
              <LeaderboardItem
                key={entry.id}
                rank={index + 1}
                username={entry.username}
                xp={entry.xp}
                isCurrentUser={user?.id === entry.id}
              />
            ))
          ) : (
            <Card>
              <CardContent className="flex min-h-64 flex-col items-center justify-center gap-2">
                <Trophy className="h-12 w-12 text-muted-foreground" />
                <p className="text-lg text-muted-foreground">
                  No users on the leaderboard yet
                </p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="hausa">
          <Card>
            <CardContent className="flex min-h-64 flex-col items-center justify-center gap-2">
              <Trophy className="h-12 w-12 text-muted-foreground" />
              <p className="text-lg text-muted-foreground">
                Complete more Hausa lessons to appear on this leaderboard
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
