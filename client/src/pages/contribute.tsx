import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, X, Upload } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

const trackSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  language: z.string().min(1, "Language is required"),
});

const questionSchema = z.object({
  type: z.enum(["multiple_choice", "fill_in_blank", "flashcard"]),
  question: z.string().min(5, "Question must be at least 5 characters"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  options: z.array(z.string()).optional(),
});

const lessonSchema = z.object({
  trackId: z.string().optional(),
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  difficulty: z.enum(["Easy", "Medium", "Hard"]),
  xpReward: z.number().min(5).max(50),
});

export default function Contribute() {
  const { toast } = useToast();
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState({
    type: "multiple_choice",
    question: "",
    correctAnswer: "",
    options: ["", "", "", ""],
  });

  const trackForm = useForm<z.infer<typeof trackSchema>>({
    resolver: zodResolver(trackSchema),
    defaultValues: {
      name: "",
      description: "",
      language: "Spanish",
    },
  });

  const lessonForm = useForm<z.infer<typeof lessonSchema>>({
    resolver: zodResolver(lessonSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "Easy",
      xpReward: 10,
    },
  });

  const handleAddQuestion = () => {
    if (!currentQuestion.question || !currentQuestion.correctAnswer) {
      toast({
        title: "Incomplete Question",
        description: "Please fill in question and correct answer",
        variant: "destructive",
      });
      return;
    }

    if (currentQuestion.type === "multiple_choice" && currentQuestion.options.some(o => !o)) {
      toast({
        title: "Incomplete Options",
        description: "Please fill in all answer options",
        variant: "destructive",
      });
      return;
    }

    setQuestions([...questions, { ...currentQuestion }]);
    setCurrentQuestion({
      type: "multiple_choice",
      question: "",
      correctAnswer: "",
      options: ["", "", "", ""],
    });
    toast({
      title: "Question Added",
      description: "Question added to your lesson",
    });
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const onTrackSubmit = (data: z.infer<typeof trackSchema>) => {
    toast({
      title: "Track Submitted!",
      description: "Your track has been submitted for review. Thank you for contributing!",
    });
    trackForm.reset();
  };

  const onLessonSubmit = (data: z.infer<typeof lessonSchema>) => {
    if (questions.length === 0) {
      toast({
        title: "No Questions",
        description: "Please add at least one question to your lesson",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Lesson Submitted!",
      description: "Your lesson has been submitted for review. Thank you for contributing!",
    });
    lessonForm.reset();
    setQuestions([]);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold">Contribute Content</h1>
        <p className="text-lg text-muted-foreground">
          Help grow the community by creating new learning tracks and lessons
        </p>
      </div>

      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="p-6">
          <div className="space-y-2">
            <h3 className="font-semibold">Contribution Guidelines</h3>
            <ul className="list-inside list-disc space-y-1 text-sm text-muted-foreground">
              <li>All contributions are reviewed by admins before going live</li>
              <li>Provide clear, accurate translations and examples</li>
              <li>Include audio links when possible (e.g., from Vocaroo or similar free services)</li>
              <li>Start with easier content to help beginners</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="lesson" className="space-y-6">
        <TabsList>
          <TabsTrigger value="lesson" data-testid="tab-contribute-lesson">
            Create Lesson
          </TabsTrigger>
          <TabsTrigger value="track" data-testid="tab-contribute-track">
            Propose Track
          </TabsTrigger>
        </TabsList>

        <TabsContent value="lesson" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Lesson Details</CardTitle>
              <CardDescription>
                Create a new lesson for an existing track
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...lessonForm}>
                <form onSubmit={lessonForm.handleSubmit(onLessonSubmit)} className="space-y-4">
                  <FormField
                    control={lessonForm.control}
                    name="trackId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Track</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger data-testid="select-track">
                              <SelectValue placeholder="Select a track" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="1">Basics</SelectItem>
                            <SelectItem value="2">Travel</SelectItem>
                            <SelectItem value="3">Food & Dining</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={lessonForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Lesson Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Family Members" {...field} data-testid="input-lesson-title" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={lessonForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Brief description of what students will learn"
                            {...field}
                            data-testid="input-lesson-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid gap-4 sm:grid-cols-2">
                    <FormField
                      control={lessonForm.control}
                      name="difficulty"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Difficulty</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
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

                    <FormField
                      control={lessonForm.control}
                      name="xpReward"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>XP Reward</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              min={5}
                              max={50}
                              {...field}
                              onChange={e => field.onChange(parseInt(e.target.value))}
                              data-testid="input-xp-reward"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Questions</CardTitle>
              <CardDescription>
                Add questions to your lesson. You can add multiple choice, fill-in-the-blank, or flashcard questions.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label>Question Type</Label>
                  <Select
                    value={currentQuestion.type}
                    onValueChange={(v) => setCurrentQuestion({ ...currentQuestion, type: v })}
                  >
                    <SelectTrigger data-testid="select-question-type">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="multiple_choice">Multiple Choice</SelectItem>
                      <SelectItem value="fill_in_blank">Fill in the Blank</SelectItem>
                      <SelectItem value="flashcard">Flashcard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Question</Label>
                  <Textarea
                    placeholder="Enter your question"
                    value={currentQuestion.question}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, question: e.target.value })}
                    data-testid="input-question-text"
                  />
                </div>

                {currentQuestion.type === "multiple_choice" && (
                  <div className="space-y-2">
                    <Label>Answer Options</Label>
                    {currentQuestion.options.map((option, idx) => (
                      <Input
                        key={idx}
                        placeholder={`Option ${idx + 1}`}
                        value={option}
                        onChange={(e) => {
                          const newOptions = [...currentQuestion.options];
                          newOptions[idx] = e.target.value;
                          setCurrentQuestion({ ...currentQuestion, options: newOptions });
                        }}
                        data-testid={`input-option-${idx}`}
                      />
                    ))}
                  </div>
                )}

                <div>
                  <Label>Correct Answer</Label>
                  <Input
                    placeholder="Enter the correct answer"
                    value={currentQuestion.correctAnswer}
                    onChange={(e) => setCurrentQuestion({ ...currentQuestion, correctAnswer: e.target.value })}
                    data-testid="input-correct-answer"
                  />
                </div>

                <Button onClick={handleAddQuestion} className="w-full" data-testid="button-add-question">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Question
                </Button>
              </div>

              {questions.length > 0 && (
                <div className="space-y-3 rounded-lg border p-4">
                  <h4 className="font-semibold">Added Questions ({questions.length})</h4>
                  {questions.map((q, idx) => (
                    <div key={idx} className="flex items-center justify-between rounded border p-3">
                      <div className="flex-1">
                        <p className="text-sm font-medium">{q.question}</p>
                        <p className="text-xs text-muted-foreground">Type: {q.type.replace("_", " ")}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveQuestion(idx)}
                        data-testid={`button-remove-question-${idx}`}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}

              <Button
                onClick={lessonForm.handleSubmit(onLessonSubmit)}
                className="w-full"
                size="lg"
                data-testid="button-submit-lesson"
              >
                Submit Lesson for Review
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="track">
          <Card>
            <CardHeader>
              <CardTitle>Propose New Track</CardTitle>
              <CardDescription>
                Suggest a new learning track for the community
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...trackForm}>
                <form onSubmit={trackForm.handleSubmit(onTrackSubmit)} className="space-y-4">
                  <FormField
                    control={trackForm.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Track Name</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., Business Spanish" {...field} data-testid="input-track-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={trackForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Explain what this track will cover"
                            {...field}
                            data-testid="input-track-description"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={trackForm.control}
                    name="language"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Language</FormLabel>
                        <FormControl>
                          <Input {...field} data-testid="input-track-language" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <Button type="submit" className="w-full" size="lg" data-testid="button-submit-track">
                    Submit Track Proposal
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
