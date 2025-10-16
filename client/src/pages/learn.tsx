import { useState } from "react";
import { TrackCard } from "@/components/track-card";
import { LessonCard } from "@/components/lesson-card";
import { LessonPlayer } from "@/components/lesson-player";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

export default function Learn() {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [playingLesson, setPlayingLesson] = useState<any | null>(null);
  const { toast } = useToast();

  const mockTracks = [
    {
      id: "1",
      name: "Basics",
      description: "Learn essential words and phrases",
      isLocked: false,
      unlockLevel: 1,
      lessonsCompleted: 3,
      totalLessons: 5,
      lessons: [
        {
          id: "1-1",
          title: "Greetings",
          description: "Learn how to say hello and goodbye",
          difficulty: "Easy" as const,
          xpReward: 10,
          isLocked: false,
          isCompleted: true,
          questions: [
            {
              type: "multiple_choice" as const,
              question: "How do you say 'Hello' in Spanish?",
              options: ["Hola", "Adiós", "Gracias", "Por favor"],
              correctAnswer: "Hola",
              vocabulary: [{ word: "Hola", translation: "Hello" }],
            },
            {
              type: "fill_in_blank" as const,
              question: "Complete: '_____ días' (Good day)",
              correctAnswer: "Buenos",
              vocabulary: [{ word: "Buenos días", translation: "Good day", examplePhrase: "Buenos días, ¿cómo estás?" }],
            },
          ],
        },
        {
          id: "1-2",
          title: "Numbers 1-10",
          description: "Count from one to ten",
          difficulty: "Easy" as const,
          xpReward: 10,
          isLocked: false,
          isCompleted: true,
          questions: [
            {
              type: "flashcard" as const,
              question: "What is 'Uno' in English?",
              correctAnswer: "One",
              vocabulary: [{ word: "Uno", translation: "One" }],
            },
          ],
        },
        {
          id: "1-3",
          title: "Common Phrases",
          description: "Essential expressions for daily use",
          difficulty: "Easy" as const,
          xpReward: 15,
          isLocked: false,
          isCompleted: true,
          questions: [],
        },
        {
          id: "1-4",
          title: "Colors",
          description: "Learn basic color vocabulary",
          difficulty: "Medium" as const,
          xpReward: 15,
          isLocked: false,
          isCompleted: false,
          questions: [
            {
              type: "multiple_choice" as const,
              question: "What color is 'Rojo'?",
              options: ["Blue", "Red", "Green", "Yellow"],
              correctAnswer: "Red",
              vocabulary: [{ word: "Rojo", translation: "Red" }],
            },
          ],
        },
        {
          id: "1-5",
          title: "Days of the Week",
          description: "Master the days of the week",
          difficulty: "Medium" as const,
          xpReward: 15,
          isLocked: false,
          isCompleted: false,
          questions: [],
        },
      ],
    },
    {
      id: "2",
      name: "Travel",
      description: "Phrases for getting around",
      isLocked: false,
      unlockLevel: 3,
      lessonsCompleted: 0,
      totalLessons: 4,
      lessons: [],
    },
    {
      id: "3",
      name: "Food & Dining",
      description: "Order food and discuss meals",
      isLocked: true,
      unlockLevel: 5,
      lessonsCompleted: 0,
      totalLessons: 6,
      lessons: [],
    },
  ];

  const currentTrack = mockTracks.find(t => t.id === selectedTrack);

  const handleLessonComplete = (score: number, vocabulary: any[]) => {
    toast({
      title: "Lesson Complete! 🎉",
      description: `You scored ${score}/${playingLesson.questions.length}. Earned ${playingLesson.xpReward} XP!`,
    });
    setPlayingLesson(null);
  };

  if (playingLesson) {
    return (
      <LessonPlayer
        lessonTitle={playingLesson.title}
        questions={playingLesson.questions}
        onComplete={handleLessonComplete}
        onExit={() => setPlayingLesson(null)}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {!selectedTrack ? (
          <>
            <h1 className="text-4xl font-bold">Learning Tracks</h1>
            <p className="text-lg text-muted-foreground">
              Choose a track to start your learning journey
            </p>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              onClick={() => setSelectedTrack(null)}
              data-testid="button-back-to-tracks"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Tracks
            </Button>
            <div>
              <h1 className="text-4xl font-bold">{currentTrack?.name}</h1>
              <p className="text-lg text-muted-foreground">{currentTrack?.description}</p>
            </div>
          </div>
        )}
      </div>

      {!selectedTrack ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {mockTracks.map((track) => (
            <TrackCard
              key={track.id}
              id={track.id}
              name={track.name}
              description={track.description}
              isLocked={track.isLocked}
              unlockLevel={track.unlockLevel}
              lessonsCompleted={track.lessonsCompleted}
              totalLessons={track.totalLessons}
              onClick={() => !track.isLocked && setSelectedTrack(track.id)}
            />
          ))}
        </div>
      ) : currentTrack?.lessons && currentTrack.lessons.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {currentTrack.lessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              description={lesson.description}
              difficulty={lesson.difficulty}
              xpReward={lesson.xpReward}
              isLocked={lesson.isLocked}
              isCompleted={lesson.isCompleted}
              onStart={() => lesson.questions.length > 0 && setPlayingLesson(lesson)}
            />
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex min-h-64 items-center justify-center">
            <div className="text-center">
              <p className="text-lg text-muted-foreground">
                No lessons available yet. Check back soon!
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
