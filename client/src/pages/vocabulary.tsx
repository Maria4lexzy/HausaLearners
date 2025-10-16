import { useState } from "react";
import { VocabularyCard } from "@/components/vocabulary-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Search, BookOpen } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Vocabulary() {
  const [searchQuery, setSearchQuery] = useState("");
  const [filter, setFilter] = useState<"all" | "known" | "fuzzy" | "forgotten">("all");
  const { toast } = useToast();

  const mockVocabulary = [
    {
      id: "1",
      word: "Hola",
      translation: "Hello",
      examplePhrase: "Hola, ¿cómo estás?",
      memoryStrength: "Known" as const,
      lastReviewedAt: "2025-01-20T10:00:00Z",
    },
    {
      id: "2",
      word: "Buenos días",
      translation: "Good day",
      examplePhrase: "Buenos días, señora.",
      memoryStrength: "Known" as const,
      lastReviewedAt: "2025-01-20T09:30:00Z",
    },
    {
      id: "3",
      word: "Gracias",
      translation: "Thank you",
      examplePhrase: "Muchas gracias por tu ayuda.",
      memoryStrength: "Fuzzy" as const,
      lastReviewedAt: "2025-01-18T14:20:00Z",
    },
    {
      id: "4",
      word: "Adiós",
      translation: "Goodbye",
      examplePhrase: "Adiós, hasta luego.",
      memoryStrength: "Known" as const,
      lastReviewedAt: "2025-01-19T16:45:00Z",
    },
    {
      id: "5",
      word: "Por favor",
      translation: "Please",
      examplePhrase: "¿Puedes ayudarme, por favor?",
      memoryStrength: "Forgotten" as const,
      lastReviewedAt: "2025-01-15T11:10:00Z",
    },
    {
      id: "6",
      word: "Rojo",
      translation: "Red",
      memoryStrength: "Fuzzy" as const,
      lastReviewedAt: "2025-01-17T13:30:00Z",
    },
  ];

  const filteredVocabulary = mockVocabulary.filter(vocab => {
    const matchesSearch = vocab.word.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         vocab.translation.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === "all" || vocab.memoryStrength.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  const stats = {
    total: mockVocabulary.length,
    known: mockVocabulary.filter(v => v.memoryStrength === "Known").length,
    fuzzy: mockVocabulary.filter(v => v.memoryStrength === "Fuzzy").length,
    forgotten: mockVocabulary.filter(v => v.memoryStrength === "Forgotten").length,
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

      {filteredVocabulary.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredVocabulary.map((vocab) => (
            <VocabularyCard
              key={vocab.id}
              id={vocab.id}
              word={vocab.word}
              translation={vocab.translation}
              examplePhrase={vocab.examplePhrase}
              memoryStrength={vocab.memoryStrength}
              lastReviewedAt={vocab.lastReviewedAt}
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
