import { useState } from "react";
import { VocabularyCard } from "@/components/vocabulary-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Search, BookOpen, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useCurrentUser } from "@/lib/user-context";
import type { Vocabulary } from "@shared/schema";

export default function Vocabulary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "known" | "fuzzy" | "forgotten">("all");
  const { toast } = useToast();
  const { user } = useCurrentUser();

  const { data: vocabulary = [], isLoading } = useQuery<Vocabulary[]>({
    queryKey: ["/api/users", user?.id, "vocabulary"],
    enabled: !!user,
  });

  const filteredVocabulary = vocabulary.filter(vocab => {
    const matchesSearch = vocab.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vocab.translation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || vocab.memoryStrength.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: vocabulary.length,
    known: vocabulary.filter(v => v.memoryStrength === "Known").length,
    fuzzy: vocabulary.filter(v => v.memoryStrength === "Fuzzy").length,
    forgotten: vocabulary.filter(v => v.memoryStrength === "Forgotten").length,
  };

  const handlePractice = (vocab: any) => {
    toast({
      title: "Practice Mode",
      description: `Reviewing: ${vocab.word}`,
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Vocabulary Book</h1>
        <p className="text-lg text-muted-foreground">
          Track and review all the words you've learned
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Total Words</p>
              <p className="text-2xl font-bold" data-testid="stat-total">{stats.total}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-success">
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Known</p>
              <p className="text-2xl font-bold text-success" data-testid="stat-known">{stats.known}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-warning">
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Fuzzy</p>
              <p className="text-2xl font-bold text-warning" data-testid="stat-fuzzy">{stats.fuzzy}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="border-l-4 border-l-destructive">
          <CardContent className="p-4">
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Forgotten</p>
              <p className="text-2xl font-bold text-destructive" data-testid="stat-forgotten">{stats.forgotten}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search vocabulary..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
            data-testid="input-search-vocabulary"
          />
        </div>
        <Tabs value={filter} onValueChange={(v) => setFilter(v as any)} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
            <TabsTrigger value="known" data-testid="tab-known">Known</TabsTrigger>
            <TabsTrigger value="fuzzy" data-testid="tab-fuzzy">Fuzzy</TabsTrigger>
            <TabsTrigger value="forgotten" data-testid="tab-forgotten">Forgotten</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {isLoading ? (
        <Card>
          <CardContent className="flex min-h-64 flex-col items-center justify-center gap-2">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-lg text-muted-foreground">Loading vocabulary...</p>
          </CardContent>
        </Card>
      ) : filteredVocabulary.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredVocabulary.map((vocab) => (
            <VocabularyCard
              key={vocab.id}
              id={vocab.id.toString()}
              word={vocab.word}
              translation={vocab.translation}
              examplePhrase={vocab.examplePhrase || undefined}
              memoryStrength={vocab.memoryStrength as "Known" | "Fuzzy" | "Forgotten"}
              lastReviewedAt={vocab.lastReviewedAt ? (typeof vocab.lastReviewedAt === 'string' ? vocab.lastReviewedAt : vocab.lastReviewedAt.toISOString()) : undefined}
              onPractice={() => handlePractice(vocab)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex min-h-64 flex-col items-center justify-center gap-2">
            <BookOpen className="h-12 w-12 text-muted-foreground" />
            <p className="text-lg text-muted-foreground">
              {searchQuery ? "No vocabulary matches your search" : "Start learning to build your vocabulary!"}
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
