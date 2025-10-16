import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { registerUser, loginUser } from "./auth";
import { seedDatabase } from "./seed-endpoint";
import { insertLessonSchema, insertTrackSchema, insertContributionSchema } from "@shared/schema";
import type { Question } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Database seeding endpoint
  app.post("/api/seed", async (_req, res) => {
    try {
      const result = await seedDatabase();
      res.json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Auth routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const { username, email, password } = req.body;
      const user = await registerUser(username, email, password);
      res.json(user);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.post("/api/auth/login", async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await loginUser(email, password);
      res.json(user);
    } catch (error: any) {
      res.status(401).json({ error: error.message });
    }
  });

  // Tracks
  app.get("/api/tracks", async (_req, res) => {
    try {
      const tracks = await storage.getAllTracks();
      res.json(tracks);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/tracks/:id", async (req, res) => {
    try {
      const track = await storage.getTrack(req.params.id);
      if (!track) {
        return res.status(404).json({ error: "Track not found" });
      }
      res.json(track);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/tracks", async (req, res) => {
    try {
      const validated = insertTrackSchema.parse(req.body);
      const track = await storage.createTrack(validated);
      res.json(track);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // Lessons
  app.get("/api/tracks/:trackId/lessons", async (req, res) => {
    try {
      const lessons = await storage.getLessonsByTrack(req.params.trackId);
      res.json(lessons);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/lessons/:id", async (req, res) => {
    try {
      const lesson = await storage.getLesson(req.params.id);
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }
      res.json(lesson);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/lessons", async (req, res) => {
    try {
      const validated = insertLessonSchema.parse(req.body);
      const lesson = await storage.createLesson(validated);
      res.json(lesson);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  // User Progress
  app.post("/api/lessons/:lessonId/complete", async (req, res) => {
    try {
      const { userId, score, vocabularyUpdates } = req.body;
      const lessonId = req.params.lessonId;

      if (!userId) {
        return res.status(400).json({ error: "userId is required" });
      }

      const lesson = await storage.getLesson(lessonId);
      if (!lesson) {
        return res.status(404).json({ error: "Lesson not found" });
      }

      const existingUserLesson = await storage.getUserLesson(userId, lessonId);

      let userLesson;
      if (existingUserLesson) {
        userLesson = await storage.updateUserLesson(existingUserLesson.id, {
          completed: true,
          score,
          completedAt: new Date(),
        });
      } else {
        userLesson = await storage.createUserLesson({
          userId,
          lessonId,
          completed: true,
          score,
          completedAt: new Date(),
        });
      }

      const updatedUser = await storage.updateUserXP(userId, lesson.xpReward);

      if (vocabularyUpdates && Array.isArray(vocabularyUpdates)) {
        for (const vocabUpdate of vocabularyUpdates) {
          const existing = await storage.getVocabularyByWord(userId, vocabUpdate.word);
          
          if (existing) {
            let newMemoryStrength = existing.memoryStrength;
            const newCorrectCount = existing.correctCount + (vocabUpdate.correct ? 1 : 0);
            const newIncorrectCount = existing.incorrectCount + (vocabUpdate.correct ? 0 : 1);

            if (newIncorrectCount >= 3) {
              newMemoryStrength = "Forgotten";
            } else if (newIncorrectCount >= 1) {
              newMemoryStrength = "Fuzzy";
            } else if (newCorrectCount >= 3) {
              newMemoryStrength = "Known";
            }

            await storage.updateVocabulary(existing.id, {
              memoryStrength: newMemoryStrength,
              correctCount: newCorrectCount,
              incorrectCount: newIncorrectCount,
              lastReviewedAt: new Date(),
            });
          } else {
            await storage.createVocabulary({
              userId,
              word: vocabUpdate.word,
              translation: vocabUpdate.translation,
              examplePhrase: vocabUpdate.examplePhrase,
              memoryStrength: vocabUpdate.correct ? "Known" : "Fuzzy",
              correctCount: vocabUpdate.correct ? 1 : 0,
              incorrectCount: vocabUpdate.correct ? 0 : 1,
            });
          }
        }
      }

      res.json({
        userLesson,
        user: updatedUser,
        message: "Lesson completed successfully",
      });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Vocabulary
  app.get("/api/users/:userId/vocabulary", async (req, res) => {
    try {
      const vocabulary = await storage.getUserVocabulary(req.params.userId);
      res.json(vocabulary);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Badges
  app.get("/api/badges", async (_req, res) => {
    try {
      const badges = await storage.getAllBadges();
      res.json(badges);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.get("/api/users/:userId/badges", async (req, res) => {
    try {
      const userBadges = await storage.getUserBadges(req.params.userId);
      res.json(userBadges);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Leaderboard
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit as string) : 100;
      const leaderboard = await storage.getLeaderboard(limit);
      res.json(leaderboard);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Contributions
  app.get("/api/contributions", async (req, res) => {
    try {
      const status = req.query.status as string | undefined;
      const contributions = await storage.getContributions(status);
      res.json(contributions);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  app.post("/api/contributions", async (req, res) => {
    try {
      const validated = insertContributionSchema.parse(req.body);
      const contribution = await storage.createContribution(validated);
      res.json(contribution);
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  });

  app.patch("/api/contributions/:id", async (req, res) => {
    try {
      const { status, reviewerComment, reviewedBy } = req.body;
      const contribution = await storage.updateContribution(req.params.id, {
        status,
        reviewerComment,
        reviewedBy,
        reviewedAt: new Date(),
      });

      if (status === "approved") {
        if (contribution.type === "track") {
          await storage.createTrack({
            ...contribution.data,
            order: 999,
          });
        } else if (contribution.type === "lesson" && contribution.trackId) {
          await storage.createLesson({
            trackId: contribution.trackId,
            ...contribution.data,
            order: 999,
          });
        }
      }

      res.json(contribution);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // Streaks
  app.post("/api/users/:userId/streak", async (req, res) => {
    try {
      const { streak, lastActiveDate } = req.body;
      const user = await storage.updateUserStreak(req.params.userId, streak, lastActiveDate);
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  // User
  app.get("/api/users/:userId", async (req, res) => {
    try {
      const user = await storage.getUser(req.params.userId);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json(user);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
