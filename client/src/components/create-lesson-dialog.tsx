import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash2, Music, ChevronDown, ChevronUp, Loader2 } from "lucide-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import type { Track, Question } from "@shared/schema";

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
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const questionSchema = z.object({
  type: z.enum(["multiple_choice", "fill_in_blank", "flashcard", "speak", "match"]),
  question: z.string().min(1, "Question is required"),
  audioUrl: z.string().optional(),
  tonePattern: z.string().optional(),
  gender: z.enum(["male", "female", "group"]).optional(),
  options: z.array(z.string()).optional(),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  vocabulary: z.array(z.object({
    word: z.string(),
    translation: z.string(),
    pronunciation: z.string().optional(),
    tone: z.string().optional(),
    examplePhrase: z.string().optional(),
  })).optional(),
});

const lessonFormSchema = z.object({
  trackId: z.string().min(1, "Track is required"),
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
  language: z.string().default("Hausa"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  xpReward: z.coerce.number().min(1).max(500).default(100),
  order: z.coerce.number().min(0).default(0),
  questions: z.array(questionSchema).min(1, "At least one question is required"),
});

type LessonFormData = z.infer<typeof lessonFormSchema>;

const emptyQuestion: Question = {
  type: "multiple_choice",
  question: "",
  correctAnswer: "",
  options: ["", "", "", ""],
  vocabulary: [],
};

interface QuestionBuilderProps {
  question: Question;
  index: number;
  onUpdate: (question: Question) => void;
  onRemove: () => void;
}

function QuestionBuilder({ question, index, onUpdate, onRemove }: QuestionBuilderProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [showVocabulary, setShowVocabulary] = useState(false);

  const updateField = <K extends keyof Question>(field: K, value: Question[K]) => {
    onUpdate({ ...question, [field]: value });
  };

  const updateOption = (optionIndex: number, value: string) => {
    const newOptions = [...(question.options || [])];
    newOptions[optionIndex] = value;
    onUpdate({ ...question, options: newOptions });
  };

  const addOption = () => {
    const newOptions = [...(question.options || []), ""];
    onUpdate({ ...question, options: newOptions });
  };

  const removeOption = (optionIndex: number) => {
    const newOptions = (question.options || []).filter((_, i) => i !== optionIndex);
    onUpdate({ ...question, options: newOptions });
  };

  const addVocabulary = () => {
    const newVocab = [...(question.vocabulary || []), { word: "", translation: "" }];
    onUpdate({ ...question, vocabulary: newVocab });
  };

  const updateVocabulary = (vocabIndex: number, field: string, value: string) => {
    const newVocab = [...(question.vocabulary || [])];
    newVocab[vocabIndex] = { ...newVocab[vocabIndex], [field]: value };
    onUpdate({ ...question, vocabulary: newVocab });
  };

  const removeVocabulary = (vocabIndex: number) => {
    const newVocab = (question.vocabulary || []).filter((_, i) => i !== vocabIndex);
    onUpdate({ ...question, vocabulary: newVocab });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="border-border/50">
        <CardHeader className="cursor-pointer py-3" onClick={() => setIsExpanded(!isExpanded)}>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">Q{index + 1}</Badge>
              <CardTitle className="text-sm font-medium">
                {question.question || "New Question"}
              </CardTitle>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="text-xs capitalize">
                {question.type.replace("_", " ")}
              </Badge>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => { e.stopPropagation(); onRemove(); }}
                data-testid={`button-remove-question-${index}`}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
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
              transition={{ duration: 0.2 }}
            >
              <CardContent className="space-y-4 pt-0">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label>Question Type</Label>
                    <Select
                      value={question.type}
                      onValueChange={(v) => updateField("type", v as Question["type"])}
                    >
                      <SelectTrigger data-testid={`select-question-type-${index}`}>
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

                  <div className="space-y-2">
                    <Label>Gender (Hausa-specific)</Label>
                    <Select
                      value={question.gender || ""}
                      onValueChange={(v) => updateField("gender", v as Question["gender"])}
                    >
                      <SelectTrigger data-testid={`select-gender-${index}`}>
                        <SelectValue placeholder="Select gender..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="male">Male (ka)</SelectItem>
                        <SelectItem value="female">Female (ki)</SelectItem>
                        <SelectItem value="group">Group (ku)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Question Text</Label>
                  <Textarea
                    value={question.question}
                    onChange={(e) => updateField("question", e.target.value)}
                    placeholder="Enter the question (supports Hausa text with tone marks)"
                    data-testid={`input-question-text-${index}`}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Correct Answer</Label>
                  <Input
                    value={question.correctAnswer}
                    onChange={(e) => updateField("correctAnswer", e.target.value)}
                    placeholder="Enter correct answer"
                    data-testid={`input-correct-answer-${index}`}
                  />
                </div>

                {(question.type === "multiple_choice" || question.type === "match") && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label>Options</Label>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={addOption}
                        data-testid={`button-add-option-${index}`}
                      >
                        <Plus className="mr-1 h-3 w-3" /> Add Option
                      </Button>
                    </div>
                    <div className="space-y-2">
                      {(question.options || []).map((opt, optIdx) => (
                        <div key={optIdx} className="flex gap-2">
                          <Input
                            value={opt}
                            onChange={(e) => updateOption(optIdx, e.target.value)}
                            placeholder={`Option ${optIdx + 1}`}
                            data-testid={`input-option-${index}-${optIdx}`}
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            onClick={() => removeOption(optIdx)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <Separator />

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Music className="h-4 w-4" /> Audio URL
                    </Label>
                    <Input
                      value={question.audioUrl || ""}
                      onChange={(e) => updateField("audioUrl", e.target.value)}
                      placeholder="https://... or upload audio"
                      data-testid={`input-audio-url-${index}`}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Tone Pattern (e.g., high, low, rising)</Label>
                    <Input
                      value={question.tonePattern || ""}
                      onChange={(e) => updateField("tonePattern", e.target.value)}
                      placeholder="high, low-high, etc."
                      data-testid={`input-tone-pattern-${index}`}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setShowVocabulary(!showVocabulary)}
                    >
                      {showVocabulary ? "Hide" : "Show"} Vocabulary ({(question.vocabulary || []).length})
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={addVocabulary}
                      data-testid={`button-add-vocabulary-${index}`}
                    >
                      <Plus className="mr-1 h-3 w-3" /> Add Word
                    </Button>
                  </div>

                  <AnimatePresence>
                    {showVocabulary && (question.vocabulary || []).length > 0 && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="space-y-3"
                      >
                        {(question.vocabulary || []).map((vocab, vocabIdx) => (
                          <Card key={vocabIdx} className="p-3">
                            <div className="grid gap-2 sm:grid-cols-2">
                              <Input
                                value={vocab.word}
                                onChange={(e) => updateVocabulary(vocabIdx, "word", e.target.value)}
                                placeholder="Hausa word"
                              />
                              <Input
                                value={vocab.translation}
                                onChange={(e) => updateVocabulary(vocabIdx, "translation", e.target.value)}
                                placeholder="English translation"
                              />
                              <Input
                                value={vocab.pronunciation || ""}
                                onChange={(e) => updateVocabulary(vocabIdx, "pronunciation", e.target.value)}
                                placeholder="Pronunciation guide"
                              />
                              <Input
                                value={vocab.tone || ""}
                                onChange={(e) => updateVocabulary(vocabIdx, "tone", e.target.value)}
                                placeholder="Tone (high/low)"
                              />
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <Input
                                value={vocab.examplePhrase || ""}
                                onChange={(e) => updateVocabulary(vocabIdx, "examplePhrase", e.target.value)}
                                placeholder="Example phrase"
                                className="flex-1"
                              />
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => removeVocabulary(vocabIdx)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

interface CreateLessonDialogProps {
  trigger?: React.ReactNode;
  initialData?: Partial<LessonFormData>;
  onSuccess?: () => void;
}

export function CreateLessonDialog({ trigger, initialData, onSuccess }: CreateLessonDialogProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const { data: tracks = [] } = useQuery<Track[]>({
    queryKey: ["/api/tracks"],
  });

  const form = useForm<LessonFormData>({
    resolver: zodResolver(lessonFormSchema),
    defaultValues: {
      trackId: initialData?.trackId || "",
      title: initialData?.title || "",
      description: initialData?.description || "",
      language: initialData?.language || "Hausa",
      difficulty: initialData?.difficulty || "Easy",
      xpReward: initialData?.xpReward || 100,
      order: initialData?.order || 0,
      questions: initialData?.questions || [{ ...emptyQuestion }],
    },
  });

  const createLessonMutation = useMutation({
    mutationFn: async (data: LessonFormData) => {
      const response = await apiRequest("POST", "/api/admin/lessons", data);
      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/tracks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/lessons"] });
      toast({
        title: "Lesson Created",
        description: "The lesson has been successfully created.",
      });
      setOpen(false);
      form.reset();
      onSuccess?.();
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.message || "Failed to create lesson",
        variant: "destructive",
      });
    },
  });

  const questions = form.watch("questions");

  const addQuestion = () => {
    const currentQuestions = form.getValues("questions");
    form.setValue("questions", [...currentQuestions, { ...emptyQuestion }]);
  };

  const updateQuestion = (index: number, question: Question) => {
    const currentQuestions = form.getValues("questions");
    currentQuestions[index] = question;
    form.setValue("questions", [...currentQuestions]);
  };

  const removeQuestion = (index: number) => {
    const currentQuestions = form.getValues("questions");
    if (currentQuestions.length > 1) {
      form.setValue("questions", currentQuestions.filter((_, i) => i !== index));
    } else {
      toast({
        title: "Cannot Remove",
        description: "A lesson must have at least one question.",
        variant: "destructive",
      });
    }
  };

  const onSubmit = (data: LessonFormData) => {
    createLessonMutation.mutate(data);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button data-testid="button-create-lesson">
            <Plus className="mr-2 h-4 w-4" /> Create New Lesson
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] max-w-4xl overflow-hidden">
        <DialogHeader>
          <DialogTitle>Create New Lesson</DialogTitle>
          <DialogDescription>
            Add a new Hausa language lesson with questions and vocabulary
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <ScrollArea className="h-[60vh] pr-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="space-y-6 pb-4"
              >
                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="trackId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Track/Module</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-track">
                              <SelectValue placeholder="Select a track..." />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tracks.map((track) => (
                              <SelectItem key={track.id} value={track.id}>
                                {track.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-difficulty">
                              <SelectValue />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Easy">Easy</SelectItem>
                            <SelectItem value="Medium">Medium</SelectItem>
                            <SelectItem value="Hard">Hard</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Lesson Title</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., Greetings & Introductions"
                          data-testid="input-lesson-title"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Describe what learners will master in this lesson..."
                          data-testid="input-lesson-description"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 sm:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="xpReward"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>XP Reward</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-xp-reward"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="order"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Order</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                            data-testid="input-order"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Questions</h3>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addQuestion}
                      data-testid="button-add-question"
                    >
                      <Plus className="mr-2 h-4 w-4" /> Add Question
                    </Button>
                  </div>

                  <AnimatePresence mode="popLayout">
                    {questions.map((question, index) => (
                      <QuestionBuilder
                        key={index}
                        question={question}
                        index={index}
                        onUpdate={(q) => updateQuestion(index, q)}
                        onRemove={() => removeQuestion(index)}
                      />
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
                data-testid="button-cancel"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={createLessonMutation.isPending}
                data-testid="button-submit-lesson"
              >
                {createLessonMutation.isPending && (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                )}
                Create Lesson
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
