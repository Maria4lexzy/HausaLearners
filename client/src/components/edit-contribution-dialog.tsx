import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Music, ChevronDown, ChevronUp, Loader2, Edit, CheckCircle2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Contribution, Question, LessonContribution } from "@shared/schema";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const vocabularySchema = z.object({
  word: z.string(),
  translation: z.string(),
  pronunciation: z.string().optional(),
  tone: z.string().optional(),
  examplePhrase: z.string().optional(),
});

const questionSchema = z.object({
  type: z.enum(["multiple_choice", "fill_in_blank", "flashcard", "speak", "match"]),
  question: z.string().min(1, "Question is required"),
  audioUrl: z.string().optional(),
  tonePattern: z.string().optional(),
  gender: z.enum(["male", "female", "group"]).optional(),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  vocabulary: z.array(vocabularySchema).optional(),
});

const lessonContributionSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  difficulty: z.string(),
  xpReward: z.number().min(1),
  questions: z.array(questionSchema).min(1),
});

type LessonContributionData = z.infer<typeof lessonContributionSchema>;

interface QuestionEditorProps {
  question: Question;
  index: number;
  onUpdate: (question: Question) => void;
  onRemove: () => void;
}

function QuestionEditor({ question, index, onUpdate, onRemove }: QuestionEditorProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const updateField = <K extends keyof Question>(field: K, value: Question[K]) => {
    onUpdate({ ...question, [field]: value });
  };

  const updateOption = (optionIndex: number, value: string) => {
    const newOptions = [...(question.options || [])];
    newOptions[optionIndex] = value;
    onUpdate({ ...question, options: newOptions });
  };

  return (
    <Card className="border-border/50">
      <CardHeader className="cursor-pointer py-2" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">Q{index + 1}</Badge>
            <span className="text-sm font-medium truncate max-w-xs">
              {question.question || "Untitled Question"}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Badge variant="secondary" className="text-xs capitalize">
              {question.type?.replace("_", " ")}
            </Badge>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => { e.stopPropagation(); onRemove(); }}
            >
              <Trash2 className="h-3 w-3 text-destructive" />
            </Button>
            {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
          </div>
        </div>
      </CardHeader>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <CardContent className="space-y-3 pt-0">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs">Type</Label>
                  <Select
                    value={question.type}
                    onValueChange={(v) => updateField("type", v as Question["type"])}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                      <SelectItem value="fill_in_blank">Fill in Blank</SelectItem>
                      <SelectItem value="flashcard">Flashcard</SelectItem>
                      <SelectItem value="speak">Speak</SelectItem>
                      <SelectItem value="match">Match</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Gender</Label>
                  <Select
                    value={question.gender || ""}
                    onValueChange={(v) => updateField("gender", v as Question["gender"])}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue placeholder="Select..." />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male (ka)</SelectItem>
                      <SelectItem value="female">Female (ki)</SelectItem>
                      <SelectItem value="group">Group (ku)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Question</Label>
                <Textarea
                  value={question.question}
                  onChange={(e) => updateField("question", e.target.value)}
                  className="min-h-[60px]"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs">Correct Answer</Label>
                <Input
                  value={question.correctAnswer}
                  onChange={(e) => updateField("correctAnswer", e.target.value)}
                  className="h-8"
                />
              </div>

              {(question.type === "multiple_choice" || question.type === "match") && (
                <div className="space-y-2">
                  <Label className="text-xs">Options</Label>
                  {(question.options || []).map((opt, i) => (
                    <Input
                      key={i}
                      value={opt}
                      onChange={(e) => updateOption(i, e.target.value)}
                      placeholder={`Option ${i + 1}`}
                      className="h-8"
                    />
                  ))}
                </div>
              )}

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="space-y-1">
                  <Label className="text-xs flex items-center gap-1">
                    <Music className="h-3 w-3" /> Audio URL
                  </Label>
                  <Input
                    value={question.audioUrl || ""}
                    onChange={(e) => updateField("audioUrl", e.target.value)}
                    placeholder="https://..."
                    className="h-8"
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-xs">Tone Pattern</Label>
                  <Input
                    value={question.tonePattern || ""}
                    onChange={(e) => updateField("tonePattern", e.target.value)}
                    placeholder="high, low-high..."
                    className="h-8"
                  />
                </div>
              </div>
            </CardContent>
          </motion.div>
        )}
      </AnimatePresence>
    </Card>
  );
}

interface EditContributionDialogProps {
  contribution: Contribution;
  onSuccess?: () => void;
}

export function EditContributionDialog({ contribution, onSuccess }: EditContributionDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const [editedData, setEditedData] = useState<LessonContribution | null>(null);

  useEffect(() => {
    if (contribution.type === "lesson") {
      setEditedData(contribution.data as LessonContribution);
    }
  }, [contribution]);

  const updateMutation = useMutation({
    mutationFn: async (action: "save" | "approve") => {
      const payload: any = {
        data: editedData,
      };
      if (action === "approve") {
        payload.status = "approved";
        payload.reviewerComment = "Approved after editing";
      }
      const response = await apiRequest("PATCH", `/api/admin/contributions/${contribution.id}`, payload);
      return response;
    },
    onSuccess: (_, action) => {
      queryClient.invalidateQueries({ queryKey: ["/api/contributions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tracks"] });
      toast({
        title: action === "approve" ? "Contribution Approved" : "Changes Saved",
        description: action === "approve" 
          ? "The contribution has been approved with your edits."
          : "Your edits have been saved.",
      });
      setOpen(false);
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to update contribution",
        variant: "destructive",
      });
    },
  });

  if (contribution.type !== "lesson" || !editedData) {
    return null;
  }

  const updateQuestion = (index: number, question: Question) => {
    const newQuestions = [...editedData.questions];
    newQuestions[index] = question;
    setEditedData({ ...editedData, questions: newQuestions });
  };

  const removeQuestion = (index: number) => {
    if (editedData.questions.length > 1) {
      const newQuestions = editedData.questions.filter((_, i) => i !== index);
      setEditedData({ ...editedData, questions: newQuestions });
    }
  };

  const addQuestion = () => {
    const newQuestion: Question = {
      type: "multiple_choice",
      question: "",
      correctAnswer: "",
      options: ["", "", "", ""],
    };
    setEditedData({ ...editedData, questions: [...editedData.questions, newQuestion] });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" data-testid="button-edit-contribution">
          <Edit className="mr-2 h-4 w-4" />
          Edit Before Approve
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>Edit Contribution</DialogTitle>
          <DialogDescription>
            Review and edit Hausa-specific details before approving
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[55vh] pr-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4 pb-4"
          >
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input
                  value={editedData.title}
                  onChange={(e) => setEditedData({ ...editedData, title: e.target.value })}
                  data-testid="input-edit-title"
                />
              </div>

              <div className="space-y-2">
                <Label>Difficulty</Label>
                <Select
                  value={editedData.difficulty}
                  onValueChange={(v) => setEditedData({ ...editedData, difficulty: v })}
                >
                  <SelectTrigger data-testid="select-edit-difficulty">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Easy">Easy</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Hard">Hard</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Description</Label>
              <Textarea
                value={editedData.description}
                onChange={(e) => setEditedData({ ...editedData, description: e.target.value })}
                data-testid="input-edit-description"
              />
            </div>

            <div className="space-y-2">
              <Label>XP Reward</Label>
              <Input
                type="number"
                value={editedData.xpReward}
                onChange={(e) => setEditedData({ ...editedData, xpReward: parseInt(e.target.value) || 0 })}
                data-testid="input-edit-xp"
              />
            </div>

            <Separator />

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold">Questions ({editedData.questions.length})</h3>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addQuestion}
                  data-testid="button-add-edit-question"
                >
                  <Plus className="mr-1 h-3 w-3" /> Add
                </Button>
              </div>

              <AnimatePresence mode="popLayout">
                {editedData.questions.map((question, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <QuestionEditor
                      question={question}
                      index={index}
                      onUpdate={(q) => updateQuestion(index, q)}
                      onRemove={() => removeQuestion(index)}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        </ScrollArea>

        <DialogFooter className="gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={() => setOpen(false)}
            data-testid="button-cancel-edit"
          >
            Cancel
          </Button>
          <Button
            type="button"
            variant="secondary"
            onClick={() => updateMutation.mutate("save")}
            disabled={updateMutation.isPending}
            data-testid="button-save-changes"
          >
            {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Save Changes
          </Button>
          <Button
            type="button"
            onClick={() => updateMutation.mutate("approve")}
            disabled={updateMutation.isPending}
            data-testid="button-approve-edited"
          >
            {updateMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            <CheckCircle2 className="mr-2 h-4 w-4" />
            Approve with Edits
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
