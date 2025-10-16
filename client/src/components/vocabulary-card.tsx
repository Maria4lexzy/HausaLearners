import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain } from "lucide-react";
import { cn } from "@/lib/utils";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useState } from "react";

interface VocabularyCardProps {
  id: string;
  word: string;
  translation: string;
  examplePhrase?: string;
  memoryStrength: "Known" | "Fuzzy" | "Forgotten";
  lastReviewedAt: string;
  onPractice: () => void;
}

export function VocabularyCard({
  id,
  word,
  translation,
  examplePhrase,
  memoryStrength,
  lastReviewedAt,
  onPractice,
}: VocabularyCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  const strengthConfig = {
    Known: {
      color: "border-l-success bg-success/5",
      textColor: "text-success",
      label: "Known",
    },
    Fuzzy: {
      color: "border-l-warning bg-warning/5",
      textColor: "text-warning",
      label: "Fuzzy",
    },
    Forgotten: {
      color: "border-l-destructive bg-destructive/5",
      textColor: "text-destructive",
      label: "Forgotten",
    },
  };

  const config = strengthConfig[memoryStrength];

  return (
    <Card
      className={cn("border-l-4", config.color)}
      data-testid={`vocabulary-card-${id}`}
    >
      <CardContent className="p-4">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-1">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold" data-testid="text-word">
                  {word}
                </h3>
                <Badge
                  variant="outline"
                  className={cn("text-xs", config.textColor)}
                  data-testid="badge-memory-strength"
                >
                  {config.label}
                </Badge>
              </div>
              <p className="text-base text-muted-foreground" data-testid="text-translation">
                {translation}
              </p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={onPractice}
              data-testid="button-practice"
            >
              <Brain className="mr-2 h-4 w-4" />
              Practice
            </Button>
          </div>

          {examplePhrase && (
            <Collapsible open={isOpen} onOpenChange={setIsOpen}>
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="w-full justify-start text-xs text-muted-foreground"
                  data-testid="button-toggle-example"
                >
                  {isOpen ? "Hide" : "Show"} example phrase
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="pt-2">
                <p className="text-sm italic text-muted-foreground" data-testid="text-example">
                  "{examplePhrase}"
                </p>
              </CollapsibleContent>
            </Collapsible>
          )}

          <p className="text-xs text-muted-foreground">
            Last reviewed: {new Date(lastReviewedAt).toLocaleDateString()}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
