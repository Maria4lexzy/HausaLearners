import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { Upload, FileJson, CheckCircle, AlertCircle } from "lucide-react";

interface ImportResult {
  success: boolean;
  tracksCreated: number;
  lessonsCreated: number;
  errors?: string[];
}

export function ImportCurriculumDialog() {
  const [open, setOpen] = useState(false);
  const [jsonInput, setJsonInput] = useState("");
  const [validationError, setValidationError] = useState<string | null>(null);
  const { toast } = useToast();

  const importMutation = useMutation({
    mutationFn: async (curriculumJson: string) => {
      const parsed = JSON.parse(curriculumJson);
      const response = await apiRequest("POST", "/api/admin/import-curriculum", parsed);
      return response.json() as Promise<ImportResult>;
    },
    onSuccess: (data) => {
      if (data.success) {
        toast({
          title: "Curriculum Imported!",
          description: `Created ${data.tracksCreated} track(s) and ${data.lessonsCreated} lesson(s).`,
        });
        queryClient.invalidateQueries({ queryKey: ["/api/tracks"] });
        queryClient.invalidateQueries({ queryKey: ["/api/lessons"] });
        setOpen(false);
        setJsonInput("");
        setValidationError(null);
      } else {
        toast({
          title: "Import Failed",
          description: data.errors?.join(", ") || "Unknown error",
          variant: "destructive",
        });
      }
    },
    onError: (error: Error) => {
      toast({
        title: "Import Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const validateJson = (input: string): boolean => {
    if (!input.trim()) {
      setValidationError("Please paste your curriculum JSON");
      return false;
    }

    try {
      const parsed = JSON.parse(input);
      
      if (!parsed.track && !parsed.tracks) {
        setValidationError("JSON must contain a 'track' or 'tracks' property");
        return false;
      }

      const tracks = parsed.tracks || [parsed.track];
      
      for (const track of tracks) {
        if (!track.name) {
          setValidationError("Each track must have a 'name'");
          return false;
        }
        if (!track.lessons || !Array.isArray(track.lessons)) {
          setValidationError(`Track "${track.name}" must have a 'lessons' array`);
          return false;
        }
        for (const lesson of track.lessons) {
          if (!lesson.title) {
            setValidationError("Each lesson must have a 'title'");
            return false;
          }
        }
      }

      setValidationError(null);
      return true;
    } catch (e) {
      setValidationError("Invalid JSON format. Please check your syntax.");
      return false;
    }
  };

  const handleImport = () => {
    if (validateJson(jsonInput)) {
      importMutation.mutate(jsonInput);
    }
  };

  const handleJsonChange = (value: string) => {
    setJsonInput(value);
    if (value.trim()) {
      validateJson(value);
    } else {
      setValidationError(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2" data-testid="button-import-curriculum">
          <Upload className="h-4 w-4" />
          Import Curriculum
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileJson className="h-5 w-5" />
            Import Curriculum JSON
          </DialogTitle>
          <DialogDescription>
            Paste curriculum JSON generated from the master prompt. This will create tracks and lessons automatically.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="curriculum-json">Curriculum JSON</Label>
            <Textarea
              id="curriculum-json"
              placeholder={`{
  "track": {
    "name": "Greetings & Social Etiquette",
    "description": "Learn essential Hausa greetings...",
    "language": "Hausa",
    "lessons": [
      {
        "title": "Informal Greetings",
        "description": "Learn everyday greetings...",
        "difficulty": "Easy",
        "xpReward": 100,
        "content": {
          "introduction": "...",
          "vocabulary": [...],
          "quiz": [...]
        }
      }
    ]
  }
}`}
              value={jsonInput}
              onChange={(e) => handleJsonChange(e.target.value)}
              className="min-h-[300px] font-mono text-sm"
              data-testid="textarea-curriculum-json"
            />
          </div>

          {validationError && (
            <div className="flex items-center gap-2 text-destructive text-sm" data-testid="text-validation-error">
              <AlertCircle className="h-4 w-4" />
              {validationError}
            </div>
          )}

          {jsonInput && !validationError && (
            <div className="flex items-center gap-2 text-green-600 dark:text-green-400 text-sm" data-testid="text-validation-success">
              <CheckCircle className="h-4 w-4" />
              JSON is valid and ready to import
            </div>
          )}

          <div className="bg-muted/50 rounded-md p-4 text-sm space-y-2">
            <p className="font-medium">Supported JSON formats:</p>
            <ul className="list-disc list-inside space-y-1 text-muted-foreground">
              <li>Single track: <code className="bg-muted px-1 rounded">{`{ "track": {...} }`}</code></li>
              <li>Multiple tracks: <code className="bg-muted px-1 rounded">{`{ "tracks": [...] }`}</code></li>
            </ul>
            <p className="text-muted-foreground mt-2">
              Each lesson's quiz questions will be converted to app questions automatically.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)} data-testid="button-cancel-import">
            Cancel
          </Button>
          <Button 
            onClick={handleImport} 
            disabled={importMutation.isPending || !!validationError || !jsonInput.trim()}
            className="gap-2"
            data-testid="button-confirm-import"
          >
            {importMutation.isPending ? (
              "Importing..."
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Import Curriculum
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
