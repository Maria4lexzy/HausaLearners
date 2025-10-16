import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "./queryClient";
import type { Track, Lesson, Vocabulary, User, Badge, UserBadge, Contribution } from "@shared/schema";

// Tracks
export function useTracks() {
  return useQuery<Track[]>({
    queryKey: ["/api/tracks"],
  });
}

export function useTrack(id: string) {
  return useQuery<Track>({
    queryKey: ["/api/tracks", id],
    enabled: !!id,
  });
}

export function useTrackLessons(trackId: string) {
  return useQuery<Lesson[]>({
    queryKey: ["/api/tracks", trackId, "lessons"],
    enabled: !!trackId,
  });
}

// Lessons
export function useLesson(id: string) {
  return useQuery<Lesson>({
    queryKey: ["/api/lessons", id],
    enabled: !!id,
  });
}

export function useCompleteLesson() {
  return useMutation({
    mutationFn: async ({
      lessonId,
      userId,
      score,
      vocabularyUpdates,
    }: {
      lessonId: string;
      userId: string;
      score: number;
      vocabularyUpdates: Array<{ word: string; translation: string; examplePhrase?: string; correct: boolean }>;
    }) => {
      return apiRequest("POST", `/api/lessons/${lessonId}/complete`, {
        userId,
        score,
        vocabularyUpdates,
      });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", variables.userId] });
      queryClient.invalidateQueries({ queryKey: ["/api/users", variables.userId, "vocabulary"] });
      queryClient.invalidateQueries({ queryKey: ["/api/leaderboard"] });
    },
  });
}

// Vocabulary
export function useUserVocabulary(userId: string) {
  return useQuery<Vocabulary[]>({
    queryKey: ["/api/users", userId, "vocabulary"],
    enabled: !!userId,
  });
}

// User
export function useUser(userId: string) {
  return useQuery<User>({
    queryKey: ["/api/users", userId],
    enabled: !!userId,
  });
}

export function useUpdateStreak() {
  return useMutation({
    mutationFn: async ({
      userId,
      streak,
      lastActiveDate,
    }: {
      userId: string;
      streak: number;
      lastActiveDate: string;
    }) => {
      return apiRequest("POST", `/api/users/${userId}/streak`, { streak, lastActiveDate });
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["/api/users", variables.userId] });
    },
  });
}

// Badges
export function useBadges() {
  return useQuery<Badge[]>({
    queryKey: ["/api/badges"],
  });
}

export function useUserBadges(userId: string) {
  return useQuery<(UserBadge & { badge: Badge })[]>({
    queryKey: ["/api/users", userId, "badges"],
    enabled: !!userId,
  });
}

// Leaderboard
export function useLeaderboard(limit = 100) {
  return useQuery<User[]>({
    queryKey: ["/api/leaderboard", limit],
  });
}

// Contributions
export function useContributions(status?: string) {
  return useQuery<Contribution[]>({
    queryKey: ["/api/contributions", { status }],
  });
}

export function useCreateContribution() {
  return useMutation({
    mutationFn: async (contribution: {
      contributorId: string;
      type: "track" | "lesson";
      trackId?: string;
      data: any;
    }) => {
      return apiRequest("POST", "/api/contributions", contribution);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contributions"] });
    },
  });
}

export function useReviewContribution() {
  return useMutation({
    mutationFn: async ({
      id,
      status,
      reviewerComment,
      reviewedBy,
    }: {
      id: string;
      status: string;
      reviewerComment?: string;
      reviewedBy?: string;
    }) => {
      return apiRequest("PATCH", `/api/contributions/${id}`, {
        status,
        reviewerComment,
        reviewedBy,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/contributions"] });
      queryClient.invalidateQueries({ queryKey: ["/api/tracks"] });
      queryClient.invalidateQueries({ queryKey: ["/api/lessons"] });
    },
  });
}

// Auth
export function useRegister() {
  return useMutation({
    mutationFn: async (data: { username: string; email: string; password: string }) => {
      return apiRequest("POST", "/api/auth/register", data);
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      return apiRequest("POST", "/api/auth/login", data);
    },
  });
}
