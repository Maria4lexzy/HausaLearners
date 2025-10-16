import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { X, Volume2, ArrowRight, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Question } from "@shared/schema";

interface LessonPlayerProps {
  lessonTitle: string;
  questions: Question[];
  onComplete: (score: number, vocabulary: Array<{ word: string; translation: string; correct: boolean }>) => void;
  onExit: () => void;
}

export function LessonPlayer({ lessonTitle, questions, onComplete, onExit }: LessonPlayerProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [vocabularyResults, setVocabularyResults] = useState<Array<{ word: string; translation: string; correct: boolean }>>([]);

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  const handleAnswer = (answer: string) => {
    if (isAnswered) return;

    setSelectedAnswer(answer);
    const correct = answer.trim().toLowerCase() === currentQuestion.correctAnswer.trim().toLowerCase();
    setIsCorrect(correct);
    setIsAnswered(true);

    if (correct) {
      setScore(score + 1);
    }

    if (currentQuestion.vocabulary) {
      currentQuestion.vocabulary.forEach(vocab => {
        setVocabularyResults(prev => [...prev, { ...vocab, correct }]);
      });
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer("");
      setIsAnswered(false);
      setIsCorrect(false);
    } else {
      onComplete(score, vocabularyResults);
    }
  };

  const playAudio = () => {
    if (currentQuestion.audioUrl) {
      const audio = new Audio(currentQuestion.audioUrl);
      audio.play();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-background">
      <div className="border-b">
        <div className="container mx-auto flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={onExit}
              data-testid="button-exit-lesson"
            >
              <X className="h-5 w-5" />
            </Button>
            <h2 className="text-lg font-semibold">{lessonTitle}</h2>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground" data-testid="text-question-counter">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
          </div>
        </div>
        <Progress value={progress} className="h-1" data-testid="progress-lesson" />
      </div>

      <div className="flex flex-1 items-center justify-center p-6">
        <Card className="w-full max-w-2xl">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-2xl" data-testid="text-question">
                  {currentQuestion.question}
                </CardTitle>
                {currentQuestion.type === "flashcard" && (
                  <CardDescription className="mt-2">
                    Click to reveal the answer
                  </CardDescription>
                )}
              </div>
              {currentQuestion.audioUrl && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={playAudio}
                  data-testid="button-play-audio"
                >
                  <Volume2 className="h-5 w-5" />
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            {currentQuestion.type === "multiple_choice" && currentQuestion.options && (
              <div className="grid gap-3">
                {currentQuestion.options.map((option, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className={cn(
                      "h-auto min-h-14 justify-start whitespace-normal p-4 text-left text-base",
                      isAnswered && option === selectedAnswer && isCorrect && "border-success bg-success/10",
                      isAnswered && option === selectedAnswer && !isCorrect && "border-destructive bg-destructive/10",
                      isAnswered && option === currentQuestion.correctAnswer && "border-success bg-success/10"
                    )}
                    onClick={() => handleAnswer(option)}
                    disabled={isAnswered}
                    data-testid={`button-option-${index}`}
                  >
                    <div className="flex flex-1 items-center gap-3">
                      <span className="flex-1">{option}</span>
                      {isAnswered && option === selectedAnswer && (
                        isCorrect ? (
                          <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                        ) : (
                          <XCircle className="h-5 w-5 shrink-0 text-destructive" />
                        )
                      )}
                      {isAnswered && !isCorrect && option === currentQuestion.correctAnswer && (
                        <CheckCircle2 className="h-5 w-5 shrink-0 text-success" />
                      )}
                    </div>
                  </Button>
                ))}
              </div>
            )}

            {currentQuestion.type === "fill_in_blank" && (
              <div className="space-y-4">
                <Input
                  placeholder="Type your answer..."
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && selectedAnswer && !isAnswered) {
                      handleAnswer(selectedAnswer);
                    }
                  }}
                  disabled={isAnswered}
                  className={cn(
                    "text-lg",
                    isAnswered && isCorrect && "border-success bg-success/10",
                    isAnswered && !isCorrect && "border-destructive bg-destructive/10"
                  )}
                  data-testid="input-answer"
                />
                {!isAnswered && (
                  <Button
                    onClick={() => handleAnswer(selectedAnswer)}
                    disabled={!selectedAnswer}
                    className="w-full"
                    data-testid="button-submit-answer"
                  >
                    Submit Answer
                  </Button>
                )}
                {isAnswered && !isCorrect && (
                  <div className="rounded-lg bg-success/10 p-3 text-sm">
                    <p className="font-medium text-success-foreground">
                      Correct answer: {currentQuestion.correctAnswer}
                    </p>
                  </div>
                )}
              </div>
            )}

            {currentQuestion.type === "flashcard" && (
              <div className="space-y-4">
                {!isAnswered ? (
                  <Button
                    variant="outline"
                    className="h-32 w-full text-lg"
                    onClick={() => {
                      setIsAnswered(true);
                      setSelectedAnswer(currentQuestion.correctAnswer);
                    }}
                    data-testid="button-reveal-flashcard"
                  >
                    Click to reveal
                  </Button>
                ) : (
                  <div className="space-y-4">
                    <Card className="bg-primary/5">
                      <CardContent className="p-6">
                        <p className="text-center text-xl font-semibold" data-testid="text-flashcard-answer">
                          {currentQuestion.correctAnswer}
                        </p>
                      </CardContent>
                    </Card>
                    <div className="flex gap-3">
                      <Button
                        variant="outline"
                        className="flex-1"
                        onClick={() => {
                          setIsCorrect(false);
                          handleNext();
                        }}
                        data-testid="button-flashcard-incorrect"
                      >
                        I didn't know
                      </Button>
                      <Button
                        className="flex-1"
                        onClick={() => {
                          setIsCorrect(true);
                          setScore(score + 1);
                          handleNext();
                        }}
                        data-testid="button-flashcard-correct"
                      >
                        I knew it!
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {isAnswered && currentQuestion.type !== "flashcard" && (
              <div className="flex justify-end pt-4">
                <Button onClick={handleNext} data-testid="button-next-question">
                  {currentQuestionIndex < questions.length - 1 ? (
                    <>
                      Next Question
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  ) : (
                    <>
                      Complete Lesson
                      <CheckCircle2 className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
