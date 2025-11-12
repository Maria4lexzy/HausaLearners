import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb, index } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table (required for Replit Auth and production session persistence)
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// Users table - supports both OAuth (Replit Auth) and password authentication
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  
  // OAuth fields (from Replit Auth) - replitId is the stable Replit user ID
  replitId: varchar("replit_id").unique(), // Maps to sub claim from OAuth
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  
  // Traditional auth fields (nullable for OAuth users)
  username: text("username").unique(),
  email: text("email").unique(),
  password: text("password"), // Nullable for OAuth users
  
  // Gamification fields
  xp: integer("xp").notNull().default(0),
  level: integer("level").notNull().default(1),
  streak: integer("streak").notNull().default(0),
  lastActiveDate: text("last_active_date"),
  isAdmin: boolean("is_admin").notNull().default(false),
  
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Lesson tracks (e.g., "Travel", "Shopping", "Family")
export const tracks = pgTable("tracks", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  language: text("language").notNull().default("Spanish"),
  icon: text("icon").notNull().default("Book"),
  order: integer("order").notNull().default(0),
  isLocked: boolean("is_locked").notNull().default(false),
  unlockLevel: integer("unlock_level").notNull().default(1),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Individual lessons within tracks
export const lessons = pgTable("lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  trackId: varchar("track_id").notNull().references(() => tracks.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  difficulty: text("difficulty").notNull().default("Easy"), // Easy, Medium, Hard
  xpReward: integer("xp_reward").notNull().default(10),
  order: integer("order").notNull().default(0),
  questions: jsonb("questions").notNull().$type<Question[]>(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// User vocabulary - tracks all learned words with memory strength
export const vocabulary = pgTable("vocabulary", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  word: text("word").notNull(),
  translation: text("translation").notNull(),
  examplePhrase: text("example_phrase"),
  memoryStrength: text("memory_strength").notNull().default("Known"), // Known, Fuzzy, Forgotten
  lastReviewedAt: timestamp("last_reviewed_at").notNull().defaultNow(),
  correctCount: integer("correct_count").notNull().default(0),
  incorrectCount: integer("incorrect_count").notNull().default(0),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// User lesson progress
export const userLessons = pgTable("user_lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  lessonId: varchar("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  completed: boolean("completed").notNull().default(false),
  score: integer("score").notNull().default(0),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// Badges
export const badges = pgTable("badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  criteria: text("criteria").notNull(), // e.g., "complete_first_lesson", "7_day_streak", "100_xp"
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// User badges
export const userBadges = pgTable("user_badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  badgeId: varchar("badge_id").notNull().references(() => badges.id, { onDelete: "cascade" }),
  earnedAt: timestamp("earned_at").notNull().defaultNow(),
});

// Community contributions (pending and approved)
export const contributions = pgTable("contributions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  contributorId: varchar("contributor_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  type: text("type").notNull(), // "track" or "lesson"
  status: text("status").notNull().default("pending"), // pending, approved, rejected
  trackId: varchar("track_id").references(() => tracks.id, { onDelete: "set null" }),
  data: jsonb("data").notNull().$type<TrackContribution | LessonContribution>(),
  reviewerComment: text("reviewer_comment"),
  reviewedBy: varchar("reviewed_by").references(() => users.id, { onDelete: "set null" }),
  reviewedAt: timestamp("reviewed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

// TypeScript types for JSON fields
export interface Question {
  type: "multiple_choice" | "fill_in_blank" | "flashcard";
  question: string;
  audioUrl?: string;
  options?: string[]; // for multiple choice
  correctAnswer: string;
  vocabulary?: {
    word: string;
    translation: string;
    examplePhrase?: string;
  }[];
}

export interface TrackContribution {
  name: string;
  description: string;
  language: string;
  icon: string;
}

export interface LessonContribution {
  title: string;
  description: string;
  difficulty: string;
  xpReward: number;
  questions: Question[];
}

// Insert schemas
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  xp: true,
  level: true,
  streak: true,
  lastActiveDate: true,
  isAdmin: true,
  createdAt: true,
  updatedAt: true,
});

// Upsert schema for OAuth users (Replit Auth)
export const upsertUserSchema = createInsertSchema(users).pick({
  id: true, // Required for upsert (replitId mapped to id)
  email: true,
  firstName: true,
  lastName: true,
  profileImageUrl: true,
  replitId: true,
});

export const insertTrackSchema = createInsertSchema(tracks).omit({
  id: true,
  createdAt: true,
});

export const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
  createdAt: true,
});

export const insertVocabularySchema = createInsertSchema(vocabulary).omit({
  id: true,
  createdAt: true,
});

export const insertUserLessonSchema = createInsertSchema(userLessons).omit({
  id: true,
  createdAt: true,
});

export const insertBadgeSchema = createInsertSchema(badges).omit({
  id: true,
  createdAt: true,
});

export const insertUserBadgeSchema = createInsertSchema(userBadges).omit({
  id: true,
  earnedAt: true,
});

export const insertContributionSchema = createInsertSchema(contributions).omit({
  id: true,
  status: true,
  reviewerComment: true,
  reviewedBy: true,
  reviewedAt: true,
  createdAt: true,
});

// Type exports
export type InsertUser = z.infer<typeof insertUserSchema>;
export type UpsertUser = z.infer<typeof upsertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTrack = z.infer<typeof insertTrackSchema>;
export type Track = typeof tracks.$inferSelect;

export type InsertLesson = z.infer<typeof insertLessonSchema>;
export type Lesson = typeof lessons.$inferSelect;

export type InsertVocabulary = z.infer<typeof insertVocabularySchema>;
export type Vocabulary = typeof vocabulary.$inferSelect;

export type InsertUserLesson = z.infer<typeof insertUserLessonSchema>;
export type UserLesson = typeof userLessons.$inferSelect;

export type InsertBadge = z.infer<typeof insertBadgeSchema>;
export type Badge = typeof badges.$inferSelect;

export type InsertUserBadge = z.infer<typeof insertUserBadgeSchema>;
export type UserBadge = typeof userBadges.$inferSelect;

export type InsertContribution = z.infer<typeof insertContributionSchema>;
export type Contribution = typeof contributions.$inferSelect;
