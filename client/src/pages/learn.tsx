import { useState } from "react";
import { TrackCard } from "@/components/track-card";
import { LessonCard } from "@/components/lesson-card";
import { LessonPlayer } from "@/components/lesson-player";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useCurrentUser } from "@/lib/user-context";
import { apiRequest, queryClient } from "@/lib/queryClient";

interface Track {
  id: string;
  name: string;
  description: string;
  language: string;
  icon: string;
  order: number;
  isLocked: boolean;
  unlockLevel: number;
  createdAt: string;
}

interface Lesson {
  id: string;
  trackId: string;
  title: string;
  description: string;
  difficulty: string;
  xpReward: number;
  order: number;
  questions: any[];
  createdAt: string;
}

interface UserLesson {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  score: number;
  completedAt: string | null;
}

export default function Learn() {
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);
  const [playingLesson, setPlayingLesson] = useState<Lesson | null>(null);
  const { toast } = useToast();
  const { user } = useCurrentUser();

  // Fetch all tracks
  const { data: tracks = [], isLoading: tracksLoading } = useQuery<Track[]>({
    queryKey: ["/api/tracks"],
    enabled: !!user,
  });

  // Fetch lessons for selected track
  const { data: lessons = [], isLoading: lessonsLoading } = useQuery<Lesson[]>({
    queryKey: ["/api/tracks", selectedTrack, "lessons"],
    enabled: !!selectedTrack && !!user,
  });

  // Fetch user's lesson progress
  const { data: userLessons = [] } = useQuery<UserLesson[]>({
    queryKey: ["/api/users", user?.id, "lessons"],
    enabled: !!user,
  });

  // Complete lesson mutation
  const completeLessonMutation = useMutation({
    mutationFn: async ({ lessonId, score, vocabularyUpdates }: { 
      lessonId: string; 
      score: number; 
      vocabularyUpdates: Array<{ word: string; translation: string; correct: boolean; examplePhrase?: string }> 
    }) => {
      await apiRequest("POST", `/api/lessons/${lessonId}/complete`, { score, vocabularyUpdates });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", user?.id, "lessons"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users", user?.id, "vocabulary"] });
      queryClient.invalidateQueries({ queryKey: ["/api/auth/me"] });
      queryClient.invalidateQueries({ queryKey: ["/api/badges/user"] });
    },
  });

  const currentTrack = tracks.find(t => t.id === selectedTrack);

  // Calculate track progress
  const tracksWithProgress = tracks.map(track => {
    const trackLessons = lessons.filter(l => l.trackId === track.id);
    const completedLessons = trackLessons.filter(l => 
      userLessons.some(ul => ul.lessonId === l.id && ul.completed)
    ).length;
    
    return {
      ...track,
      lessonsCompleted: completedLessons,
      totalLessons: trackLessons.length,
      isLocked: track.unlockLevel > (user?.level || 1),
    };
  });

  // Add completion status to lessons
  const lessonsWithStatus = lessons.map(lesson => {
    const userLesson = userLessons.find(ul => ul.lessonId === lesson.id);
    return {
      ...lesson,
      isCompleted: userLesson?.completed || false,
      isLocked: false, // We can add unlock logic later
    };
  });

  const handleLessonComplete = async (score: number, vocabulary: any[]) => {
    if (!playingLesson) return;

    try {
      await completeLessonMutation.mutateAsync({
        lessonId: playingLesson.id,
        score,
        vocabularyUpdates: vocabulary,
      });

      toast({
        title: "Lesson Complete! 🎉",
        description: `You scored ${score}/${playingLesson.questions.length}. Earned ${playingLesson.xpReward} XP!`,
      });
      
      setPlayingLesson(null);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to complete lesson",
        variant: "destructive",
      });
    }
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

  if (tracksLoading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
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
        <>
          {tracksWithProgress.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tracksWithProgress.map((track) => (
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
          ) : (
            <Card>
              <CardContent className="flex min-h-64 items-center justify-center">
                <div className="text-center">
                  <p className="text-lg text-muted-foreground">
                    No tracks available yet. Check back soon!
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </>
      ) : lessonsLoading ? (
        <div className="flex items-center justify-center min-h-96">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      ) : lessonsWithStatus.length > 0 ? (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {lessonsWithStatus.map((lesson) => (
            <LessonCard
              key={lesson.id}
              id={lesson.id}
              title={lesson.title}
              description={lesson.description}
              difficulty={lesson.difficulty as "Easy" | "Medium" | "Hard"}
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
