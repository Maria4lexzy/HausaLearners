import { db } from "../db";
import { eq, desc, sql, and } from "drizzle-orm";
import {
  type User,
  type InsertUser,
  type UpsertUser,
  type Track,
  type InsertTrack,
  type Lesson,
  type InsertLesson,
  type Vocabulary,
  type InsertVocabulary,
  type UserLesson,
  type InsertUserLesson,
  type Badge,
  type InsertBadge,
  type UserBadge,
  type InsertUserBadge,
  type Contribution,
  type InsertContribution,
  users,
  tracks,
  lessons,
  vocabulary,
  userLessons,
  badges,
  userBadges,
  contributions,
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  upsertUser(user: UpsertUser): Promise<User>; // For OAuth users (Replit Auth)
  updateUserXP(userId: string, xpGained: number): Promise<User>;
  updateUserStreak(userId: string, streak: number, lastActiveDate: string): Promise<User>;

  // Badges (create method)
  createBadge(badge: InsertBadge): Promise<Badge>;

  // Tracks
  getAllTracks(): Promise<Track[]>;
  getTrack(id: string): Promise<Track | undefined>;
  createTrack(track: InsertTrack): Promise<Track>;
  updateTrack(id: string, track: Partial<InsertTrack>): Promise<Track>;

  // Lessons
  getLessonsByTrack(trackId: string): Promise<Lesson[]>;
  getLesson(id: string): Promise<Lesson | undefined>;
  createLesson(lesson: InsertLesson): Promise<Lesson>;
  updateLesson(id: string, lesson: Partial<InsertLesson>): Promise<Lesson>;

  // Vocabulary
  getUserVocabulary(userId: string): Promise<Vocabulary[]>;
  getVocabularyByWord(userId: string, word: string): Promise<Vocabulary | undefined>;
  createVocabulary(vocab: InsertVocabulary): Promise<Vocabulary>;
  updateVocabulary(id: string, vocab: Partial<InsertVocabulary>): Promise<Vocabulary>;

  // User Progress
  getUserLessons(userId: string): Promise<UserLesson[]>;
  getUserLesson(userId: string, lessonId: string): Promise<UserLesson | undefined>;
  createUserLesson(userLesson: InsertUserLesson): Promise<UserLesson>;
  updateUserLesson(id: string, userLesson: Partial<InsertUserLesson>): Promise<UserLesson>;

  // Badges
  getAllBadges(): Promise<Badge[]>;
  getUserBadges(userId: string): Promise<(UserBadge & { badge: Badge })[]>;
  awardBadge(userBadge: InsertUserBadge): Promise<UserBadge>;

  // Contributions
  getContributions(status?: string): Promise<Contribution[]>;
  getContribution(id: string): Promise<Contribution | undefined>;
  createContribution(contribution: InsertContribution): Promise<Contribution>;
  updateContribution(id: string, data: Partial<Contribution>): Promise<Contribution>;

  // Leaderboard
  getLeaderboard(limit?: number): Promise<User[]>;
}

export class DatabaseStorage implements IStorage {
  // Users
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    // For OAuth users - creates or updates user from Google/Facebook
    // Priority order: googleId -> facebookId -> email
    let existingUser: User | undefined;
    
    // Check by OAuth provider ID first
    if (userData.googleId) {
      const [user] = await db.select().from(users).where(eq(users.googleId, userData.googleId));
      existingUser = user;
    } else if (userData.facebookId) {
      const [user] = await db.select().from(users).where(eq(users.facebookId, userData.facebookId));
      existingUser = user;
    } else if (userData.replitId) {
      // Legacy Replit Auth lookup for migration
      const [user] = await db.select().from(users).where(eq(users.replitId, userData.replitId));
      existingUser = user;
    }
    
    // Fall back to email lookup for migration/linking
    if (!existingUser && userData.email) {
      existingUser = await this.getUserByEmail(userData.email);
    }
    
    if (existingUser) {
      // Update existing user with OAuth info (only if provided)
      const updateData: any = {
        updatedAt: new Date(),
      };
      
      if (userData.googleId) updateData.googleId = userData.googleId;
      if (userData.facebookId) updateData.facebookId = userData.facebookId;
      if (userData.replitId) updateData.replitId = userData.replitId;
      if (userData.firstName) updateData.firstName = userData.firstName;
      if (userData.lastName) updateData.lastName = userData.lastName;
      if (userData.profileImageUrl) updateData.profileImageUrl = userData.profileImageUrl;
      
      const [user] = await db
        .update(users)
        .set(updateData)
        .where(eq(users.id, existingUser.id))
        .returning();
      return user;
    } else {
      // Create new OAuth user
      const [user] = await db
        .insert(users)
        .values(userData)
        .returning();
      return user;
    }
  }

  async updateUserXP(userId: string, xpGained: number): Promise<User> {
    const user = await this.getUser(userId);
    if (!user) throw new Error("User not found");

    const newXP = user.xp + xpGained;
    const newLevel = Math.floor(newXP / 100) + 1;

    const [updated] = await db
      .update(users)
      .set({ xp: newXP, level: newLevel })
      .where(eq(users.id, userId))
      .returning();
    return updated;
  }

  async updateUserStreak(userId: string, streak: number, lastActiveDate: string): Promise<User> {
    const [updated] = await db
      .update(users)
      .set({ streak, lastActiveDate })
      .where(eq(users.id, userId))
      .returning();
    return updated;
  }

  // Tracks
  async getAllTracks(): Promise<Track[]> {
    return db.select().from(tracks).orderBy(tracks.order);
  }

  async getTrack(id: string): Promise<Track | undefined> {
    const [track] = await db.select().from(tracks).where(eq(tracks.id, id));
    return track;
  }

  async createTrack(track: InsertTrack): Promise<Track> {
    const [created] = await db.insert(tracks).values(track).returning();
    return created;
  }

  async updateTrack(id: string, track: Partial<InsertTrack>): Promise<Track> {
    const [updated] = await db
      .update(tracks)
      .set(track)
      .where(eq(tracks.id, id))
      .returning();
    return updated;
  }

  // Lessons
  async getLessonsByTrack(trackId: string): Promise<Lesson[]> {
    return db.select().from(lessons).where(eq(lessons.trackId, trackId)).orderBy(lessons.order);
  }

  async getLesson(id: string): Promise<Lesson | undefined> {
    const [lesson] = await db.select().from(lessons).where(eq(lessons.id, id));
    return lesson;
  }

  async createLesson(lesson: InsertLesson): Promise<Lesson> {
    const [created] = await db.insert(lessons).values(lesson).returning();
    return created;
  }

  async updateLesson(id: string, lesson: Partial<InsertLesson>): Promise<Lesson> {
    const [updated] = await db
      .update(lessons)
      .set(lesson)
      .where(eq(lessons.id, id))
      .returning();
    return updated;
  }

  // Vocabulary
  async getUserVocabulary(userId: string): Promise<Vocabulary[]> {
    return db.select().from(vocabulary).where(eq(vocabulary.userId, userId));
  }

  async getVocabularyByWord(userId: string, word: string): Promise<Vocabulary | undefined> {
    const [vocab] = await db
      .select()
      .from(vocabulary)
      .where(and(eq(vocabulary.userId, userId), eq(vocabulary.word, word)));
    return vocab;
  }

  async createVocabulary(vocab: InsertVocabulary): Promise<Vocabulary> {
    const [created] = await db.insert(vocabulary).values(vocab).returning();
    return created;
  }

  async updateVocabulary(id: string, vocab: Partial<InsertVocabulary>): Promise<Vocabulary> {
    const [updated] = await db
      .update(vocabulary)
      .set(vocab)
      .where(eq(vocabulary.id, id))
      .returning();
    return updated;
  }

  // User Progress
  async getUserLessons(userId: string): Promise<UserLesson[]> {
    return db.select().from(userLessons).where(eq(userLessons.userId, userId));
  }

  async getUserLesson(userId: string, lessonId: string): Promise<UserLesson | undefined> {
    const [userLesson] = await db
      .select()
      .from(userLessons)
      .where(and(eq(userLessons.userId, userId), eq(userLessons.lessonId, lessonId)));
    return userLesson;
  }

  async createUserLesson(userLesson: InsertUserLesson): Promise<UserLesson> {
    const [created] = await db.insert(userLessons).values(userLesson).returning();
    return created;
  }

  async updateUserLesson(id: string, userLesson: Partial<InsertUserLesson>): Promise<UserLesson> {
    const [updated] = await db
      .update(userLessons)
      .set(userLesson)
      .where(eq(userLessons.id, id))
      .returning();
    return updated;
  }

  // Badges
  async getAllBadges(): Promise<Badge[]> {
    return db.select().from(badges);
  }

  async createBadge(badge: InsertBadge): Promise<Badge> {
    const [created] = await db.insert(badges).values(badge).returning();
    return created;
  }

  async getUserBadges(userId: string): Promise<(UserBadge & { badge: Badge })[]> {
    const results = await db
      .select()
      .from(userBadges)
      .leftJoin(badges, eq(userBadges.badgeId, badges.id))
      .where(eq(userBadges.userId, userId));

    return results.map(r => ({
      ...r.user_badges,
      badge: r.badges!,
    }));
  }

  async awardBadge(userBadge: InsertUserBadge): Promise<UserBadge> {
    const [awarded] = await db.insert(userBadges).values(userBadge).returning();
    return awarded;
  }

  // Contributions
  async getContributions(status?: string): Promise<Contribution[]> {
    if (status) {
      return db
        .select()
        .from(contributions)
        .where(eq(contributions.status, status))
        .orderBy(desc(contributions.createdAt));
    }
    return db.select().from(contributions).orderBy(desc(contributions.createdAt));
  }

  async getContribution(id: string): Promise<Contribution | undefined> {
    const [contribution] = await db.select().from(contributions).where(eq(contributions.id, id));
    return contribution;
  }

  async createContribution(contribution: InsertContribution): Promise<Contribution> {
    const [created] = await db.insert(contributions).values(contribution).returning();
    return created;
  }

  async updateContribution(id: string, data: Partial<Contribution>): Promise<Contribution> {
    const [updated] = await db
      .update(contributions)
      .set(data)
      .where(eq(contributions.id, id))
      .returning();
    return updated;
  }

  // Leaderboard
  async getLeaderboard(limit: number = 100): Promise<User[]> {
    return db.select().from(users).orderBy(desc(users.xp)).limit(limit);
  }
}

export const storage = new DatabaseStorage();
