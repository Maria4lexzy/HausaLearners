# LingoQuest - Complete Technical Documentation

**Last Updated**: November 20, 2025  
**Version**: 1.0 (Production-Ready MVP)  
**Project Type**: Gamified Language Learning Platform

---

## Table of Contents

1. [High-Level Overview](#1-high-level-overview)
2. [Project Structure](#2-project-structure)
3. [Backend Architecture](#3-backend-architecture)
4. [Database System](#4-database-system)
5. [Frontend Architecture](#5-frontend-architecture)
6. [Shared Code](#6-shared-code)
7. [Deployment Guide](#7-deployment-guide)
8. [Maintenance Checklist](#8-maintenance-checklist)
9. [Improvement Suggestions](#9-improvement-suggestions)
10. [Boot.dev UI Enhancements (BONUS)](#10-bootdev-ui-enhancements-bonus)

---

## 1. High-Level Overview

### What the App Does

**LingoQuest** is a community-driven, gamified language learning platform where users:
- Learn languages through interactive lessons (multiple choice, fill-in-blank, flashcards)
- Track vocabulary with memory-strength scoring (Known/Fuzzy/Forgotten)
- Earn XP, level up, maintain streaks, and unlock badges
- Compete on global leaderboards
- Contribute their own lessons and tracks for community approval
- Experience a Boot.dev-inspired dark mode aesthetic with retro gaming vibes

**Key Features:**
- 🎮 **Gamification**: XP/Levels, Streaks, Badges, Leaderboards
- 📚 **Learning**: Skill tree progression, lesson tracks, vocabulary tracking
- 🤝 **Community**: User-contributed content with admin moderation
- 🔐 **Triple Authentication**: Google OAuth, Facebook OAuth, Email/Password
- 🌙 **Boot.dev UI**: Neon green XP, electric purple badges, midnight backgrounds

### Architecture Summary

```
┌─────────────────────────────────────────────────────────────┐
│                       CLIENT (Vite + React)                  │
│  Pages → Components → React Query → API Calls               │
└────────────┬────────────────────────────────────────────────┘
             │ HTTP (REST API)
             ↓
┌─────────────────────────────────────────────────────────────┐
│                    SERVER (Express.js)                       │
│  Routes → Middleware → Storage → Database                   │
│  - Authentication (Passport.js + bcrypt)                     │
│  - Session (PostgreSQL session store)                        │
│  - Authorization (requireAuth, requireAdmin)                 │
└────────────┬────────────────────────────────────────────────┘
             │ SQL (Drizzle ORM)
             ↓
┌─────────────────────────────────────────────────────────────┐
│              DATABASE (PostgreSQL - Neon)                    │
│  - Users, Sessions, Tracks, Lessons                          │
│  - Vocabulary, Badges, Contributions                         │
│  - Drizzle migrations + schema sync                          │
└─────────────────────────────────────────────────────────────┘
```

**Communication Flow:**
1. **Client** → Makes API request via React Query
2. **Server** → Validates session, checks authorization, processes business logic
3. **Storage Layer** → Executes Drizzle ORM queries
4. **Database** → Returns data
5. **Response** → JSON sent back through the chain

### Tech Stack

**Frontend:**
- React 18.3 + TypeScript
- Vite 5.4 (build tool + dev server)
- Wouter 3.3 (routing)
- TailwindCSS 3.4 + shadcn/ui (components)
- TanStack Query v5 (data fetching/caching)
- Framer Motion (animations)
- Lucide React (icons)

**Backend:**
- Node.js 20+ with Express.js 4.21
- TypeScript 5.6
- Passport.js (OAuth + local strategy)
- bcrypt 6.0 (password hashing)
- express-session + connect-pg-simple (PostgreSQL session store)

**Database:**
- PostgreSQL (Neon serverless)
- Drizzle ORM 0.39
- Drizzle Kit 0.31 (migrations)
- Drizzle-Zod (schema validation)

**Dev Tools:**
- tsx (TypeScript execution)
- esbuild (production builds)
- Replit (hosting platform)

---

## 2. Project Structure

```
lingoquest/
├── client/                    # Frontend React application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/            # shadcn/ui primitives (40+ components)
│   │   │   ├── app-header.tsx # Top navigation with XP/streak
│   │   │   ├── app-sidebar.tsx # Side navigation
│   │   │   ├── xp-bar.tsx     # Gamification: XP progress bar
│   │   │   ├── streak-counter.tsx # Gamification: Streak display
│   │   │   ├── badge-display.tsx # Gamification: Badges
│   │   │   ├── lesson-card.tsx # Learning: Lesson preview cards
│   │   │   ├── lesson-player.tsx # Learning: Full-screen lesson UI
│   │   │   ├── track-card.tsx # Learning: Track/course cards
│   │   │   ├── vocabulary-card.tsx # Vocabulary display with memory strength
│   │   │   ├── leaderboard-item.tsx # Leaderboard entry
│   │   │   ├── theme-provider.tsx # Dark/light mode context
│   │   │   └── theme-toggle.tsx # Mode switcher
│   │   ├── hooks/             # Custom React hooks
│   │   │   ├── use-toast.ts   # Toast notifications
│   │   │   ├── use-mobile.tsx # Responsive breakpoint detection
│   │   │   └── useAuth.ts     # Authentication state hook
│   │   ├── lib/               # Utilities and global logic
│   │   │   ├── api.ts         # React Query API hooks
│   │   │   ├── queryClient.ts # TanStack Query configuration
│   │   │   ├── user-context.tsx # User state provider
│   │   │   ├── authUtils.ts   # Auth helper functions
│   │   │   └── utils.ts       # General utilities (cn, etc.)
│   │   ├── pages/             # Page-level components (routes)
│   │   │   ├── auth/          # Authentication pages
│   │   │   │   ├── login.tsx  # Login with Google/Facebook/Email
│   │   │   │   └── register.tsx # Register new account
│   │   │   ├── home.tsx       # Dashboard (XP, streaks, lessons)
│   │   │   ├── learn.tsx      # Skill tree / lesson browser
│   │   │   ├── vocabulary.tsx # User's vocabulary book
│   │   │   ├── leaderboard.tsx # Global rankings
│   │   │   ├── contribute.tsx # Submit new lessons/tracks
│   │   │   ├── admin.tsx      # Admin moderation panel
│   │   │   └── not-found.tsx  # 404 page
│   │   ├── App.tsx            # Root component + routing
│   │   ├── index.css          # Global styles + Tailwind config
│   │   └── main.tsx           # Entry point (React DOM render)
│   └── index.html             # HTML template
│
├── server/                    # Backend Express application
│   ├── index.ts               # Server entry point
│   ├── routes.ts              # All API route handlers
│   ├── storage.ts             # Database access layer (Drizzle queries)
│   ├── auth.ts                # Password auth logic (bcrypt)
│   ├── replitAuth.ts          # OAuth setup (Google/Facebook + sessions)
│   ├── middleware.ts          # Authorization middleware
│   ├── seed-endpoint.ts       # Database seeding logic
│   └── vite.ts                # Vite dev server integration
│
├── shared/                    # Code shared between client + server
│   └── schema.ts              # Drizzle schema + TypeScript types
│
├── db/                        # Database configuration
│   ├── index.ts               # Drizzle client initialization
│   └── seed.ts                # Initial seed data (tracks/lessons/badges)
│
├── migrations/                # Drizzle-generated SQL migrations
│   └── *.sql                  # Auto-generated migration files
│
├── attached_assets/           # User-attached files (images, etc.)
│
├── drizzle.config.ts          # Drizzle migration configuration
├── vite.config.ts             # Vite build configuration
├── tailwind.config.ts         # Tailwind CSS configuration
├── tsconfig.json              # TypeScript compiler options
├── package.json               # Dependencies + scripts
├── docker-compose.yml         # Docker deployment config
├── DEPLOYMENT.md              # Production deployment guide
├── design_guidelines.md       # UI/UX design system
├── replit.md                  # Project overview + changelog
└── LOCAL_SETUP.md             # Local development setup
```

### Directory Explanations

**`client/`** - Frontend React SPA
- Contains all user-facing UI code
- Communicates with backend via REST API
- Uses Vite for fast dev builds and HMR (Hot Module Replacement)
- Routing via Wouter (lightweight React router)
- **Why it exists**: Separates presentation layer from business logic

**`server/`** - Backend Express API
- Contains all business logic, authentication, and database operations
- Exposes RESTful API endpoints for the client
- Handles OAuth flows, session management, and authorization
- **Why it exists**: Centralizes data persistence and security

**`shared/`** - Cross-cutting concerns
- Schema definitions used by both client (for types) and server (for DB queries)
- **Why it exists**: Ensures type safety between frontend and backend

**`db/`** - Database initialization
- Drizzle client setup
- Seed data for initial tracks, lessons, and badges
- **Why it exists**: Bootstraps the database with sample content

**`migrations/`** - Database version control
- Auto-generated SQL migration files
- Tracks schema changes over time
- **Why it exists**: Enables safe database updates in production

---

## 3. Backend Architecture

### Framework: Express.js 4.21

**Server Entry Point** (`server/index.ts`):
```typescript
import express from "express";
import { registerRoutes } from "./routes";
import { setupVite } from "./vite";

const app = express();
app.use(express.json());

// Setup authentication BEFORE routes
await setupAuth(app);

// Register all API routes
await registerRoutes(app);

// Development: Vite dev server
if (app.get("env") === "development") {
  await setupVite(app, server);
} else {
  serveStatic(app); // Production: Serve built files
}

server.listen({ port: 5000, host: "0.0.0.0" });
```

### Routes/Controllers Structure

All routes are centralized in `server/routes.ts`. No separate controller pattern - handlers are inline for simplicity.

**Route Organization:**

```typescript
export async function registerRoutes(app: Express) {
  // OAuth setup
  await setupAuth(app);

  // Session normalization middleware
  app.use((req, res, next) => { ... });

  // === AUTHENTICATION ===
  app.post("/api/seed", seedDatabase);
  app.post("/api/auth/register", registerHandler);
  app.post("/api/auth/login", loginHandler);
  app.post("/api/auth/logout", requireAuth, logoutHandler);
  app.get("/api/auth/me", requireAuth, getCurrentUser);

  // === TRACKS (Lesson Collections) ===
  app.get("/api/tracks", getAllTracks);
  app.get("/api/tracks/:id", getTrackById);
  app.post("/api/tracks", requireAdmin, createTrack);

  // === LESSONS ===
  app.get("/api/tracks/:trackId/lessons", getLessonsByTrack);
  app.get("/api/lessons/:id", getLessonById);
  app.post("/api/lessons", requireAdmin, createLesson);
  app.get("/api/users/:userId/lessons", requireAuth, getUserLessons);
  app.post("/api/lessons/:lessonId/complete", requireAuth, completeLesson);

  // === VOCABULARY ===
  app.get("/api/users/:userId/vocabulary", requireSelfOrAdmin, getUserVocabulary);

  // === GAMIFICATION ===
  app.get("/api/badges", getAllBadges);
  app.get("/api/users/:userId/badges", requireSelfOrAdmin, getUserBadges);
  app.get("/api/leaderboard", getLeaderboard);
  app.post("/api/users/:userId/streak", requireSelfOrAdmin, updateStreak);
  app.get("/api/users/:userId", requireSelfOrAdmin, getUserProfile);

  // === CONTRIBUTIONS ===
  app.get("/api/contributions", getContributions);
  app.post("/api/contributions", requireAuth, submitContribution);
  app.patch("/api/contributions/:id", requireAdmin, reviewContribution);

  return createServer(app);
}
```

### Middleware

**Authentication Middleware** (`server/middleware.ts`):

```typescript
// Require user to be logged in
export function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  next();
}

// Require admin privileges
export function requireAdmin(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).json({ error: "Authentication required" });
  }
  const user = await storage.getUser(req.session.userId);
  if (!user || !user.isAdmin) {
    return res.status(403).json({ error: "Admin access required" });
  }
  next();
}

// Require user to access own data or be admin
export function requireSelfOrAdmin(req, res, next) {
  const requestedUserId = req.params.userId;
  if (req.session.userId !== requestedUserId && !user.isAdmin) {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
}
```

**Session Normalization** (OAuth + Password compatibility):
```typescript
app.use((req, res, next) => {
  // OAuth users have req.user.userId (from Passport)
  // Copy it to req.session.userId for middleware compatibility
  if (!req.session.userId && req.user && req.user.userId) {
    req.session.userId = req.user.userId;
  }
  next();
});
```

### Authentication Logic

**Triple Authentication System:**

1. **Google OAuth** (Passport.js + passport-google-oauth20)
2. **Facebook OAuth** (Passport.js + passport-facebook)
3. **Email/Password** (bcrypt + manual validation)

**OAuth Setup** (`server/replitAuth.ts`):
```typescript
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import passport from "passport";
import session from "express-session";
import connectPg from "connect-pg-simple";

export async function setupAuth(app: Express) {
  // PostgreSQL session store (7-day TTL)
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    tableName: "sessions",
  });

  app.use(session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    },
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  // Google OAuth Strategy
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:5000/api/auth/google/callback',
    scope: ['profile', 'email'],
  }, async (accessToken, refreshToken, profile, done) => {
    const userId = await upsertGoogleUser(profile);
    done(null, { userId, provider: 'google' });
  }));

  // Facebook OAuth Strategy
  passport.use(new FacebookStrategy({ ... }));

  // Routes
  app.get("/api/auth/google", passport.authenticate("google"));
  app.get("/api/auth/google/callback", 
    passport.authenticate("google", { failureRedirect: "/auth/login" }),
    (req, res) => {
      req.session.userId = req.user.userId;
      req.session.save(() => res.redirect("/"));
    }
  );
}
```

**Password Authentication** (`server/auth.ts`):
```typescript
import bcrypt from "bcrypt";

const SALT_ROUNDS = 10;

export async function registerUser(username, email, password) {
  // Check for existing user
  const existingUser = await storage.getUserByEmail(email);
  if (existingUser) throw new Error("Email already registered");

  // Hash password
  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  // Create user
  const user = await storage.createUser({
    username,
    email,
    password: hashedPassword,
  });

  return user;
}

export async function loginUser(email, password) {
  const user = await storage.getUserByEmail(email);
  if (!user || !user.password) throw new Error("Invalid credentials");

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) throw new Error("Invalid credentials");

  return user;
}
```

### Database Connections

**Drizzle Client** (`db/index.ts`):
```typescript
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "@shared/schema";

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle({ client: sql, schema });
```

**Storage Layer** (`server/storage.ts`):
- Abstracts all database operations
- Uses Drizzle ORM for type-safe queries
- Example:

```typescript
export const storage = {
  async getUser(id: string) {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  },

  async createUser(data: InsertUser) {
    const result = await db.insert(users).values(data).returning();
    return result[0];
  },

  async upsertUser(data: UpsertUser) {
    // OAuth user upsert logic
    if (data.googleId) {
      const existing = await this.getUserByGoogleId(data.googleId);
      if (existing) return this.updateUser(existing.id, data);
    }
    return this.createUser(data);
  },

  // ... 30+ more methods for all entities
};
```

### Validation

**Zod Schemas** (from Drizzle):
```typescript
import { createInsertSchema } from "drizzle-zod";
import { lessons } from "@shared/schema";

const insertLessonSchema = createInsertSchema(lessons).omit({
  id: true,
  createdAt: true,
});

// In route handler:
app.post("/api/lessons", requireAdmin, async (req, res) => {
  const validated = insertLessonSchema.parse(req.body); // Throws if invalid
  const lesson = await storage.createLesson(validated);
  res.json(lesson);
});
```

### Known Potential Issues

1. **Session Store Dependency**: PostgreSQL must be available or sessions fail (no graceful degradation)
2. **No Rate Limiting**: API endpoints are unprotected from abuse
3. **No Request Logging**: Difficult to debug production issues
4. **Inline Route Handlers**: Routes file is 400+ lines (could be split into controllers)
5. **No Input Sanitization**: XSS vulnerabilities possible (relies on Zod validation only)
6. **Lesson Completion Race Conditions**: Multiple simultaneous completions could double-award XP
7. **No Caching Layer**: Every request hits the database (could use Redis)
8. **Memory Leaks**: Passport session serialization stores entire user object (should only store ID)

---

## 4. Database System

### Database Provider: Neon PostgreSQL (Serverless)

**Connection Configuration:**
- Driver: `@neondatabase/serverless` (HTTP-based, auto-pooling)
- ORM: Drizzle ORM 0.39
- Environment Variable: `DATABASE_URL` (auto-provided by Replit)

### Schema Definitions

**All Tables:**

#### `sessions` - Session Storage (PostgreSQL session store)
```typescript
export const sessions = pgTable("sessions", {
  sid: varchar("sid").primaryKey(),
  sess: jsonb("sess").notNull(),
  expire: timestamp("expire").notNull(),
}, (table) => [
  index("IDX_session_expire").on(table.expire)
]);
```
- **Purpose**: Stores user sessions for authentication persistence
- **Indexed**: `expire` column for efficient cleanup of expired sessions

#### `users` - User Accounts
```typescript
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  
  // OAuth fields
  googleId: varchar("google_id").unique(),
  facebookId: varchar("facebook_id").unique(),
  replitId: varchar("replit_id").unique(), // DEPRECATED (migration only)
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  
  // Traditional auth fields
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
```
- **Primary Key**: UUID (generated by PostgreSQL)
- **Unique Constraints**: email, username, googleId, facebookId
- **Nullable**: password (OAuth users), username (OAuth users)
- **Indexes**: Automatic on unique columns

#### `tracks` - Lesson Collections (e.g., "Travel Spanish")
```typescript
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
```
- **Purpose**: Groups related lessons (e.g., "Basics", "Food", "Travel")
- **Ordering**: `order` field determines display sequence
- **Progression**: `unlockLevel` gates access by user level

#### `lessons` - Individual Learning Units
```typescript
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
```
- **Foreign Key**: `trackId` → `tracks.id` (cascade delete)
- **JSON Column**: `questions` stores array of Question objects
- **Question Types**: multiple_choice, fill_in_blank, flashcard

#### `vocabulary` - User Vocabulary Tracking
```typescript
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
```
- **Foreign Key**: `userId` → `users.id` (cascade delete)
- **Memory Strength Algorithm**:
  - Known: `correctCount > 0 && incorrectCount === 0`
  - Fuzzy: `incorrectCount > 0 && correctCount >= incorrectCount`
  - Forgotten: `incorrectCount > correctCount`

#### `userLessons` - Lesson Progress Tracking
```typescript
export const userLessons = pgTable("user_lessons", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  lessonId: varchar("lesson_id").notNull().references(() => lessons.id, { onDelete: "cascade" }),
  completed: boolean("completed").notNull().default(false),
  score: integer("score").notNull().default(0),
  completedAt: timestamp("completed_at"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
```
- **Composite Relationship**: User ↔ Lesson (many-to-many)
- **Purpose**: Tracks which lessons a user has completed and their score

#### `badges` - Achievement Definitions
```typescript
export const badges = pgTable("badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
  criteria: text("criteria").notNull(), // e.g., "complete_first_lesson", "7_day_streak"
  createdAt: timestamp("created_at").notNull().defaultNow(),
});
```
- **Criteria Examples**: "complete_first_lesson", "7_day_streak", "100_xp", "10_lessons_completed"

#### `userBadges` - User Achievement Tracking
```typescript
export const userBadges = pgTable("user_badges", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id, { onDelete: "cascade" }),
  badgeId: varchar("badge_id").notNull().references(() => badges.id, { onDelete: "cascade" }),
  earnedAt: timestamp("earned_at").notNull().defaultNow(),
});
```
- **Composite Relationship**: User ↔ Badge (many-to-many)

#### `contributions` - Community Content Submissions
```typescript
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
```
- **Workflow**: User submits → Admin reviews → Approved/Rejected
- **JSON Data**: Full track or lesson definition stored in `data` column

### Enums (String Constants)

- **Difficulty**: "Easy", "Medium", "Hard"
- **Memory Strength**: "Known", "Fuzzy", "Forgotten"
- **Contribution Type**: "track", "lesson"
- **Contribution Status**: "pending", "approved", "rejected"
- **Question Type**: "multiple_choice", "fill_in_blank", "flashcard"

### Relations & Foreign Keys

```
users (1) ───< (many) vocabulary
users (1) ───< (many) userLessons
users (1) ───< (many) userBadges
users (1) ───< (many) contributions

tracks (1) ───< (many) lessons
tracks (1) ───< (many) contributions

lessons (1) ───< (many) userLessons

badges (1) ───< (many) userBadges
```

**Cascade Delete Rules:**
- Delete user → Delete all their vocabulary, progress, badges, contributions
- Delete track → Delete all lessons in that track
- Delete lesson → Delete all user progress for that lesson

### Migration System

**Drizzle Config** (`drizzle.config.ts`):
```typescript
export default defineConfig({
  out: "./migrations",
  schema: "./shared/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
});
```

**Migration Workflow:**
1. Edit schema in `shared/schema.ts`
2. Run `npm run db:push` (applies changes directly, no SQL files)
3. For production: Use Drizzle Kit to generate migration SQL

**Database Initialization:**
- Database is created automatically by Replit
- Schema is synced via `npm run db:push`
- Initial data seeded via `POST /api/seed` endpoint

**Seed Data** (`db/seed.ts`):
- 3 tracks: "Basics", "Travel", "Food & Dining"
- 15+ lessons with 5-10 questions each
- 7 badges: First Lesson, 7-Day Streak, 100 XP, etc.
- No users (created on signup)

---

## 5. Frontend Architecture

### Framework: Vite 5.4 + React 18.3 + TypeScript

**Build Tool:** Vite (lightning-fast dev server, optimized production builds)  
**Routing:** Wouter 3.3 (7KB alternative to React Router)  
**State Management:** TanStack Query v5 (server state) + React Context (auth state)  
**Styling:** TailwindCSS 3.4 + shadcn/ui components  

### UI Structure

**Pages** (`client/src/pages/`):
```
/                  → home.tsx          Dashboard (XP, streaks, quick start)
/learn             → learn.tsx         Skill tree / lesson browser
/vocabulary        → vocabulary.tsx    Vocabulary book with filters
/leaderboard       → leaderboard.tsx   Global rankings
/contribute        → contribute.tsx    Submit lessons/tracks
/admin             → admin.tsx         Moderation panel (admin only)
/auth/login        → auth/login.tsx    Login page
/auth/register     → auth/register.tsx Register page
```

**Components** (`client/src/components/`):

**UI Primitives** (`ui/`):
- 40+ shadcn/ui components (Button, Card, Dialog, Form, etc.)
- Radix UI headless primitives
- Fully accessible (ARIA, keyboard navigation)

**Custom Components**:
- `app-header.tsx` - Top nav with logo, XP bar, streak, user menu
- `app-sidebar.tsx` - Side nav (Learn, Vocabulary, Leaderboard, etc.)
- `xp-bar.tsx` - Animated XP progress bar with level display
- `streak-counter.tsx` - Flame icon + days counter
- `badge-display.tsx` - Achievement badges (locked/unlocked states)
- `lesson-card.tsx` - Lesson preview with difficulty + completion status
- `lesson-player.tsx` - Full-screen lesson UI (question → answer → XP reward)
- `track-card.tsx` - Track preview with progress bar
- `vocabulary-card.tsx` - Word card with memory strength indicator
- `leaderboard-item.tsx` - User rank entry with avatar + XP

**Hooks** (`client/src/hooks/`):
- `use-toast.ts` - Toast notification system
- `use-mobile.tsx` - Responsive breakpoint detection
- `useAuth.ts` - Authentication state hook (wraps UserContext)

### Global State

**User Context** (`client/src/lib/user-context.tsx`):
```typescript
interface User {
  id: string;
  username: string;
  email: string;
  xp: number;
  level: number;
  streak: number;
  isAdmin: boolean;
}

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  // Fetch on mount
  useEffect(() => {
    fetch('/api/auth/me')
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(() => setUser(null));
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
```

**TanStack Query** (`client/src/lib/queryClient.ts`):
```typescript
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      retry: 1,
    },
  },
});

// Default fetcher
export async function defaultQueryFn({ queryKey }) {
  const url = queryKey[0];
  const res = await fetch(url, { credentials: 'include' });
  if (!res.ok) throw new Error('Network error');
  return res.json();
}
```

### API Calls

**Centralized API Hooks** (`client/src/lib/api.ts`):
```typescript
import { useQuery, useMutation } from "@tanstack/react-query";

// GET /api/tracks
export function useTracks() {
  return useQuery({
    queryKey: ['/api/tracks'],
    // Uses default fetcher from queryClient
  });
}

// GET /api/tracks/:trackId/lessons
export function useLessonsByTrack(trackId: string) {
  return useQuery({
    queryKey: ['/api/tracks', trackId, 'lessons'],
    enabled: !!trackId, // Only fetch if trackId exists
  });
}

// POST /api/lessons/:lessonId/complete
export function useCompleteLesson() {
  return useMutation({
    mutationFn: async ({ lessonId, answers }) => {
      const res = await apiRequest('POST', `/api/lessons/${lessonId}/complete`, { answers });
      return res;
    },
    onSuccess: () => {
      // Invalidate related queries
      queryClient.invalidateQueries({ queryKey: ['/api/auth/me'] });
      queryClient.invalidateQueries({ queryKey: ['/api/users'] });
    },
  });
}
```

**API Request Helper**:
```typescript
export async function apiRequest(method, url, body?) {
  const res = await fetch(url, {
    method,
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include', // Send cookies
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
```

### Build & Dev Commands

**package.json scripts:**
```json
{
  "dev": "NODE_ENV=development tsx server/index.ts",
  "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "start": "NODE_ENV=production node dist/index.js",
  "check": "tsc",
  "db:push": "drizzle-kit push"
}
```

**Development**:
```bash
npm run dev
# → Starts Express on :5000
# → Vite dev server proxies frontend
# → HMR enabled
```

**Production Build**:
```bash
npm run build
# → Vite builds client to dist/public
# → esbuild bundles server to dist/index.js
npm start
# → Serves static files + API from dist/
```

---

## 6. Shared Code

**File:** `shared/schema.ts`

**Purpose:** Define database schema and TypeScript types that are used by both frontend and backend.

**Contents:**
1. **Drizzle Table Schemas**: PostgreSQL table definitions
2. **TypeScript Interfaces**: JSON field types (Question, TrackContribution, etc.)
3. **Zod Insert Schemas**: Validation schemas for API requests
4. **Type Exports**: Select types, Insert types, Upsert types

**Why Shared?**
- **Type Safety**: Frontend knows exact shape of API responses
- **Validation**: Same Zod schemas used for client-side forms and server-side validation
- **Single Source of Truth**: Change schema once, both client and server update

**Example:**
```typescript
// Define table
export const lessons = pgTable("lessons", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  questions: jsonb("questions").$type<Question[]>(),
});

// Generate insert schema
export const insertLessonSchema = createInsertSchema(lessons).omit({ id: true });

// Export types
export type Lesson = typeof lessons.$inferSelect;
export type InsertLesson = z.infer<typeof insertLessonSchema>;
```

**Frontend uses:**
```typescript
import { Lesson, insertLessonSchema } from "@shared/schema";

// Type-safe API response
const lesson: Lesson = await fetch('/api/lessons/123').then(r => r.json());

// Validate form data
const formData = insertLessonSchema.parse(userInput);
```

**Backend uses:**
```typescript
import { lessons, insertLessonSchema } from "@shared/schema";

// Type-safe database query
const lesson = await db.select().from(lessons).where(eq(lessons.id, id));

// Validate request body
const validated = insertLessonSchema.parse(req.body);
```

**Potential Improvements:**
1. **Split Schema**: Large file (245 lines) - could split into separate files per entity
2. **Enums**: Use TypeScript enums instead of string literals ("Easy" | "Medium" | "Hard")
3. **Relations**: Add Drizzle relations for better join queries
4. **Indexes**: Add database indexes for performance-critical queries

---

## 7. Deployment Guide

### Platform: Replit Autoscale Deployments (Recommended)

**Why Replit?**
- Zero-config PostgreSQL database
- Automatic HTTPS certificates
- Built-in secret management
- Git integration
- One-click deployments

### Local Development

**Prerequisites:**
- Node.js 20+
- PostgreSQL 15+ (or use Replit-provided DB)

**Setup:**
```bash
# Clone repository
git clone <repo-url>
cd lingoquest

# Install dependencies
npm install

# Set environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL and SESSION_SECRET

# Push database schema
npm run db:push

# Seed initial data
curl -X POST http://localhost:5000/api/seed

# Start development server
npm run dev
```

**Environment Variables (Development):**
```env
DATABASE_URL=postgresql://user:pass@localhost:5432/lingoquest
SESSION_SECRET=dev-secret-change-in-production
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
NODE_ENV=development
```

### Docker Deployment

**docker-compose.yml:**
```yaml
version: '3.8'

services:
  db:
    image: postgres:15-alpine
    environment:
      POSTGRES_DB: lingoquest
      POSTGRES_USER: lingoquest
      POSTGRES_PASSWORD: ${DB_PASSWORD}
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  app:
    build: .
    environment:
      DATABASE_URL: postgresql://lingoquest:${DB_PASSWORD}@db:5432/lingoquest
      SESSION_SECRET: ${SESSION_SECRET}
      NODE_ENV: production
    ports:
      - "5000:5000"
    depends_on:
      - db

volumes:
  postgres_data:
```

**Steps:**
```bash
# Create .env file
echo "DB_PASSWORD=your-db-password" > .env
echo "SESSION_SECRET=$(openssl rand -base64 32)" >> .env

# Build and start
docker-compose up -d

# Push schema
docker-compose exec app npm run db:push

# Seed data
curl -X POST http://localhost:5000/api/seed
```

### Production Deployment (Replit)

**Step-by-Step:**

1. **Set SESSION_SECRET**
   ```bash
   openssl rand -base64 32
   ```
   - Go to Secrets tab in Replit
   - Add `SESSION_SECRET` with the generated value

2. **Configure OAuth (Optional)**
   - Add `GOOGLE_CLIENT_ID` and `GOOGLE_CLIENT_SECRET`
   - Add `FACEBOOK_APP_ID` and `FACEBOOK_APP_SECRET`

3. **Push Database Schema**
   ```bash
   npm run db:push
   ```

4. **Seed Initial Data**
   ```bash
   curl -X POST https://your-app.replit.app/api/seed
   ```

5. **Deploy**
   - Click "Deploy" button in Replit
   - Choose "Autoscale" deployment
   - Machine: 0.5 vCPU, 1 GB RAM
   - Min instances: 0, Max instances: 5

**Production Environment Variables:**
```env
DATABASE_URL=<auto-provided-by-replit>
SESSION_SECRET=<set-in-secrets>
GOOGLE_CLIENT_ID=<set-in-secrets>
GOOGLE_CLIENT_SECRET=<set-in-secrets>
FACEBOOK_APP_ID=<set-in-secrets>
FACEBOOK_APP_SECRET=<set-in-secrets>
NODE_ENV=production
```

### Alternative Platforms

**Render.com:**
1. Create PostgreSQL database
2. Create Web Service (Node.js)
3. Build command: `npm run build`
4. Start command: `npm start`
5. Set environment variables in dashboard

**Railway.app:**
1. Connect GitHub repo
2. Add PostgreSQL plugin
3. Set environment variables
4. Deploy automatically on push

**DigitalOcean Apps:**
1. Create App from GitHub
2. Add managed PostgreSQL database
3. Configure build/run commands
4. Set environment variables

**Fly.io:**
1. Install flyctl CLI
2. `fly launch` (auto-detects Node.js)
3. `fly postgres create`
4. `fly secrets set SESSION_SECRET=...`
5. `fly deploy`

---

## 8. Maintenance Checklist

### Daily/Weekly

- [ ] Monitor error logs (check Replit logs or `pm2 logs`)
- [ ] Check database disk usage (should stay under 1GB for free tier)
- [ ] Review user feedback/bug reports
- [ ] Test critical paths (login, lesson completion, XP gain)

### Monthly

- [ ] Update dependencies (`npm update`)
- [ ] Review and approve pending contributions
- [ ] Check leaderboard for suspicious activity
- [ ] Analyze most popular lessons/tracks

### Quarterly

- [ ] Backup database (Replit auto-backs up, but export manually for safety)
- [ ] Review security (update bcrypt, session secrets)
- [ ] Performance audit (slow queries, bundle size)
- [ ] User feedback review (add requested features)

### Continuous

**Dependency Updates:**
```bash
# Check for outdated packages
npm outdated

# Update non-breaking changes
npm update

# Update to latest (breaking changes)
npm install <package>@latest

# Re-test after updates
npm run check
npm run dev
```

**Database Migrations:**
```bash
# After schema changes
npm run db:push

# In production
npm run db:push --force # Use with caution
```

**Environment Variables:**
- Rotate `SESSION_SECRET` every 6 months
- Update OAuth credentials if changed
- Verify `DATABASE_URL` after provider updates

**Error Handling:**
- Set up Sentry or LogRocket for error tracking
- Monitor 4xx/5xx response rates
- Check for uncaught exceptions in logs

**Performance Checks:**
```bash
# Lighthouse audit
npx lighthouse https://your-app.replit.app

# Bundle size analysis
npm run build -- --mode=analyze
```

**PostgreSQL Backups:**
```bash
# Export database (Replit)
pg_dump $DATABASE_URL > backup-$(date +%Y%m%d).sql

# Restore
psql $DATABASE_URL < backup-20251120.sql
```

---

## 9. Improvement Suggestions

### Priority 1: Critical (Do First)

**1. Add Rate Limiting**
- **Why**: Prevent API abuse and DDoS attacks
- **How**: Use `express-rate-limit` middleware
- **Where**: `server/index.ts` (apply globally) and `server/routes.ts` (per-endpoint limits)
- **Code**:
  ```typescript
  import rateLimit from 'express-rate-limit';

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // 100 requests per window
  });

  app.use('/api/', limiter);
  ```

**2. Add Request Logging**
- **Why**: Debug production issues, track usage
- **How**: Use `morgan` middleware
- **Where**: `server/index.ts`
- **Code**:
  ```typescript
  import morgan from 'morgan';
  app.use(morgan('combined'));
  ```

**3. Fix Lesson Completion Race Condition**
- **Why**: Users can spam lesson completion and gain infinite XP
- **How**: Add database-level unique constraint or optimistic locking
- **Where**: `server/storage.ts` - `completeLesson` method
- **Code**:
  ```typescript
  // In schema.ts, add unique constraint:
  export const userLessons = pgTable("user_lessons", {
    userId: varchar("user_id"),
    lessonId: varchar("lesson_id"),
  }, (table) => [
    unique().on(table.userId, table.lessonId) // Prevents duplicate completions
  ]);
  ```

**4. Implement Input Sanitization**
- **Why**: Prevent XSS attacks
- **How**: Use `validator` or `DOMPurify`
- **Where**: All user input fields (lesson titles, contributions, etc.)
- **Code**:
  ```typescript
  import sanitizeHtml from 'sanitize-html';

  app.post("/api/contributions", requireAuth, async (req, res) => {
    req.body.data.title = sanitizeHtml(req.body.data.title, { allowedTags: [] });
    // ... rest of handler
  });
  ```

### Priority 2: High (Do Soon)

**5. Split Routes into Controllers**
- **Why**: `routes.ts` is 400+ lines, hard to maintain
- **How**: Create `server/controllers/` directory
- **Structure**:
  ```
  server/controllers/
    ├── auth.controller.ts
    ├── lessons.controller.ts
    ├── tracks.controller.ts
    ├── users.controller.ts
    └── contributions.controller.ts
  ```

**6. Add Caching Layer**
- **Why**: Reduce database load, improve response times
- **How**: Use Redis or in-memory cache
- **Where**: Frequently accessed data (tracks, badges, leaderboard)
- **Code**:
  ```typescript
  import { createClient } from 'redis';

  const redis = createClient({ url: process.env.REDIS_URL });
  await redis.connect();

  // Cache tracks for 1 hour
  app.get("/api/tracks", async (req, res) => {
    const cached = await redis.get('tracks');
    if (cached) return res.json(JSON.parse(cached));

    const tracks = await storage.getAllTracks();
    await redis.setEx('tracks', 3600, JSON.stringify(tracks));
    res.json(tracks);
  });
  ```

**7. Add Error Tracking**
- **Why**: Catch and diagnose production errors
- **How**: Integrate Sentry
- **Where**: `server/index.ts`
- **Code**:
  ```typescript
  import * as Sentry from "@sentry/node";

  Sentry.init({ dsn: process.env.SENTRY_DSN });

  app.use(Sentry.Handlers.errorHandler());
  ```

**8. Optimize Passport Session Serialization**
- **Why**: Currently stores entire user object in session (memory leak)
- **How**: Store only user ID, fetch user on each request
- **Where**: `server/replitAuth.ts`
- **Code**:
  ```typescript
  passport.serializeUser((user, cb) => cb(null, user.userId)); // Only ID
  passport.deserializeUser(async (id, cb) => {
    const user = await storage.getUser(id);
    cb(null, user);
  });
  ```

### Priority 3: Medium (Nice to Have)

**9. Add Database Indexes**
- **Why**: Speed up common queries
- **How**: Add indexes to frequently queried columns
- **Where**: `shared/schema.ts`
- **Code**:
  ```typescript
  export const vocabulary = pgTable("vocabulary", {
    userId: varchar("user_id"),
    memoryStrength: text("memory_strength"),
  }, (table) => [
    index("idx_vocabulary_user_id").on(table.userId),
    index("idx_vocabulary_memory_strength").on(table.memoryStrength),
  ]);
  ```

**10. Implement Pagination**
- **Why**: Leaderboard and contributions can grow large
- **How**: Add `limit` and `offset` query params
- **Where**: `GET /api/leaderboard`, `GET /api/contributions`
- **Code**:
  ```typescript
  app.get("/api/leaderboard", async (req, res) => {
    const limit = parseInt(req.query.limit) || 50;
    const offset = parseInt(req.query.offset) || 0;

    const users = await db.select()
      .from(users)
      .orderBy(desc(users.xp))
      .limit(limit)
      .offset(offset);

    res.json({ users, total, hasMore: offset + limit < total });
  });
  ```

**11. Add Vocabulary Review Spaced Repetition**
- **Why**: Improve learning retention
- **How**: Implement SM-2 algorithm (SuperMemo)
- **Where**: New endpoint `POST /api/vocabulary/:id/review`
- **Algorithm**:
  ```typescript
  function calculateNextReview(easiness, interval, performance) {
    if (performance < 3) {
      // Forgotten - review tomorrow
      return { interval: 1, easiness: Math.max(1.3, easiness - 0.2) };
    }
    // Known - increase interval
    const newInterval = Math.ceil(interval * easiness);
    return { interval: newInterval, easiness: easiness + 0.1 };
  }
  ```

**12. Add Real-Time Notifications**
- **Why**: Notify users of contribution approvals, achievements
- **How**: Use WebSockets (ws package already installed)
- **Where**: New `server/websocket.ts`
- **Code**:
  ```typescript
  import { WebSocketServer } from 'ws';

  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws) => {
    ws.on('message', (message) => {
      // Handle messages
    });
  });

  // Send achievement unlock notification
  function notifyUser(userId, achievement) {
    wss.clients.forEach((client) => {
      if (client.userId === userId) {
        client.send(JSON.stringify({ type: 'achievement', data: achievement }));
      }
    });
  }
  ```

### Frontend Improvements

**13. Add Loading Skeletons**
- **Why**: Improve perceived performance
- **How**: Use shadcn Skeleton component
- **Where**: All pages with data loading
- **Code**:
  ```tsx
  import { Skeleton } from "@/components/ui/skeleton";

  function LessonList() {
    const { data: lessons, isLoading } = useLessons();

    if (isLoading) {
      return (
        <div className="space-y-4">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      );
    }

    return <div>{lessons.map(...)}</div>;
  }
  ```

**14. Add Error Boundaries**
- **Why**: Prevent entire app from crashing on component errors
- **How**: Use React error boundaries
- **Where**: `client/src/App.tsx`
- **Code**:
  ```tsx
  class ErrorBoundary extends React.Component {
    state = { hasError: false };

    static getDerivedStateFromError() {
      return { hasError: true };
    }

    render() {
      if (this.state.hasError) {
        return <div>Something went wrong. Please refresh.</div>;
      }
      return this.props.children;
    }
  }
  ```

**15. Optimize Bundle Size**
- **Why**: Faster page loads
- **How**: Code splitting, tree shaking, lazy loading
- **Where**: `vite.config.ts`
- **Code**:
  ```typescript
  import { lazy, Suspense } from 'react';

  const Admin = lazy(() => import('./pages/admin'));

  function App() {
    return (
      <Suspense fallback={<Skeleton />}>
        <Route path="/admin" component={Admin} />
      </Suspense>
    );
  }
  ```

### Security Improvements

**16. Add CSRF Protection**
- **Why**: Prevent cross-site request forgery attacks
- **How**: Use `csurf` middleware
- **Where**: `server/index.ts`

**17. Add Helmet.js**
- **Why**: Set security HTTP headers
- **How**: Use `helmet` middleware
- **Code**:
  ```typescript
  import helmet from 'helmet';
  app.use(helmet());
  ```

**18. Add SQL Injection Protection**
- **Why**: Prevent SQL injection attacks
- **Status**: Already protected (Drizzle ORM uses parameterized queries)
- **Verify**: Never use raw SQL with user input

### Scalability Improvements

**19. Add Database Connection Pooling**
- **Why**: Handle more concurrent users
- **How**: Configure Neon connection pool
- **Where**: `db/index.ts`

**20. Add CDN for Static Assets**
- **Why**: Faster global delivery
- **How**: Use Cloudflare or AWS CloudFront
- **Where**: Production deployment only

---

## 10. Boot.dev UI Enhancements (BONUS)

### Current State

**Already Implemented** ✅:
- ✅ XP system (gain XP on lesson completion)
- ✅ Level system (level up every 100 XP)
- ✅ Streak tracking (daily activity counter)
- ✅ Badge system (achievements for milestones)
- ✅ Leaderboard (global rankings by XP)
- ✅ Progress tracking (lesson completion)
- ✅ Boot.dev-inspired dark mode (neon green, purple, midnight backgrounds)
- ✅ Dashboard with gamification stats
- ✅ Skill tree lesson navigation

### Enhancement Suggestions

#### 1. XP Gain Animations

**Current**: XP updates silently  
**Enhancement**: Floating "+10 XP" animation when completing a lesson

**Implementation:**
```tsx
// client/src/components/xp-gain-animation.tsx
import { motion } from "framer-motion";

export function XPGainAnimation({ amount, onComplete }) {
  return (
    <motion.div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      initial={{ opacity: 0, scale: 0.5, y: 0 }}
      animate={{ opacity: 1, scale: 1.5, y: -100 }}
      exit={{ opacity: 0, scale: 0 }}
      transition={{ duration: 1.5 }}
      onAnimationComplete={onComplete}
    >
      <div className="text-6xl font-bold text-primary">
        +{amount} XP
      </div>
    </motion.div>
  );
}
```

**Where to add**: `client/src/components/lesson-player.tsx` (on lesson completion)

#### 2. Level-Up Celebration

**Current**: Level updates silently  
**Enhancement**: Full-screen confetti + "LEVEL UP!" banner

**Implementation:**
```tsx
import Confetti from 'react-confetti';

export function LevelUpCelebration({ newLevel, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      <Confetti width={window.innerWidth} height={window.innerHeight} />
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        className="text-center"
      >
        <h1 className="text-8xl font-bold text-primary">LEVEL UP!</h1>
        <p className="text-4xl mt-4">You're now Level {newLevel}</p>
        <Button onClick={onClose} className="mt-8">Continue</Button>
      </motion.div>
    </div>
  );
}
```

**Where to add**: Triggered in `useCompleteLesson` hook when `user.level` increases

#### 3. Quest/Challenge System

**Enhancement**: Daily/weekly challenges for bonus XP

**Database Schema Addition:**
```typescript
export const quests = pgTable("quests", {
  id: varchar("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // "daily", "weekly", "special"
  xpReward: integer("xp_reward").notNull(),
  criteria: jsonb("criteria").$type<QuestCriteria>(),
  expiresAt: timestamp("expires_at"),
});

export const userQuests = pgTable("user_quests", {
  userId: varchar("user_id").references(() => users.id),
  questId: varchar("quest_id").references(() => quests.id),
  progress: integer("progress").default(0),
  completed: boolean("completed").default(false),
  completedAt: timestamp("completed_at"),
});

interface QuestCriteria {
  type: "complete_lessons" | "vocabulary_review" | "streak";
  target: number; // e.g., "complete 5 lessons"
}
```

**UI Component:**
```tsx
// client/src/components/quest-card.tsx
export function QuestCard({ quest, progress }) {
  const percentage = (progress / quest.criteria.target) * 100;

  return (
    <Card className="border-primary/50">
      <CardHeader>
        <CardTitle>{quest.title}</CardTitle>
        <CardDescription>{quest.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <Progress value={percentage} className="mb-2" />
        <p className="text-sm text-muted-foreground">
          {progress} / {quest.criteria.target}
        </p>
        <p className="text-primary font-bold">+{quest.xpReward} XP</p>
      </CardContent>
    </Card>
  );
}
```

**Where to add**: 
- New page: `client/src/pages/quests.tsx`
- Dashboard widget: `client/src/pages/home.tsx` (show 3 active quests)

#### 4. Chapter/Course System

**Enhancement**: Group lessons into "chapters" with progressive unlocking

**Database Schema Addition:**
```typescript
export const chapters = pgTable("chapters", {
  id: varchar("id").primaryKey(),
  trackId: varchar("track_id").references(() => tracks.id),
  title: text("title").notNull(),
  order: integer("order").notNull(),
  unlockLevel: integer("unlock_level").default(1),
});

// Modify lessons table:
export const lessons = pgTable("lessons", {
  chapterId: varchar("chapter_id").references(() => chapters.id),
  // ... existing fields
});
```

**UI Component:**
```tsx
// client/src/components/chapter-accordion.tsx
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function ChapterAccordion({ chapters, userLevel }) {
  return (
    <Accordion type="single" collapsible>
      {chapters.map(chapter => (
        <AccordionItem key={chapter.id} value={chapter.id}>
          <AccordionTrigger>
            <div className="flex items-center gap-2">
              {chapter.unlockLevel > userLevel && <Lock className="h-4 w-4" />}
              {chapter.title}
            </div>
          </AccordionTrigger>
          <AccordionContent>
            <LessonList chapterId={chapter.id} />
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
```

**Where to add**: `client/src/pages/learn.tsx` (replace flat lesson list)

#### 5. Progress Ring Dashboard

**Enhancement**: Circular progress indicators for each track

**Implementation:**
```tsx
// client/src/components/circular-progress.tsx
export function CircularProgress({ value, max, size = 120 }) {
  const percentage = (value / max) * 100;
  const radius = (size - 10) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <svg width={size} height={size}>
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--muted))"
        strokeWidth="8"
      />
      <circle
        cx={size / 2}
        cy={size / 2}
        r={radius}
        fill="none"
        stroke="hsl(var(--primary))"
        strokeWidth="8"
        strokeDasharray={circumference}
        strokeDashoffset={offset}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
      <text
        x="50%"
        y="50%"
        textAnchor="middle"
        dy=".3em"
        className="text-2xl font-bold"
      >
        {Math.round(percentage)}%
      </text>
    </svg>
  );
}
```

**Where to add**: `client/src/pages/home.tsx` (show progress for each track)

#### 6. Achievement Unlock Modal

**Enhancement**: Popup when user earns a new badge

**Implementation:**
```tsx
// client/src/components/achievement-modal.tsx
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { motion } from "framer-motion";

export function AchievementModal({ badge, open, onClose }) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 0.8 }}
          className="text-center"
        >
          <div className="text-8xl mb-4">{badge.icon}</div>
          <h2 className="text-3xl font-bold text-primary">Achievement Unlocked!</h2>
          <h3 className="text-xl mt-2">{badge.name}</h3>
          <p className="text-muted-foreground mt-2">{badge.description}</p>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}
```

**Where to trigger**: `useCompleteLesson` hook (check if new badge earned)

#### 7. Streak Flame Animation

**Enhancement**: Pulsing animation on active streak

**Implementation:**
```tsx
// client/src/components/streak-counter.tsx (update existing)
import { motion } from "framer-motion";

export function StreakCounter({ days }) {
  return (
    <div className="flex items-center gap-2">
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          filter: ["hue-rotate(0deg)", "hue-rotate(20deg)", "hue-rotate(0deg)"],
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <Flame className="h-6 w-6 text-orange-500" />
      </motion.div>
      <span className="text-xl font-bold">{days} Day Streak</span>
    </div>
  );
}
```

**Where to update**: `client/src/components/app-header.tsx`

#### 8. Leaderboard Medals

**Enhancement**: Gold/Silver/Bronze medals for top 3

**Implementation:**
```tsx
// client/src/components/leaderboard-item.tsx (update existing)
export function LeaderboardItem({ user, rank }) {
  const getMedal = (rank) => {
    if (rank === 1) return { icon: "🥇", color: "text-yellow-500" };
    if (rank === 2) return { icon: "🥈", color: "text-gray-400" };
    if (rank === 3) return { icon: "🥉", color: "text-amber-700" };
    return null;
  };

  const medal = getMedal(rank);

  return (
    <div className="flex items-center gap-4 p-4 border-b">
      <div className="text-2xl font-bold w-12 text-center">
        {medal ? <span className={medal.color}>{medal.icon}</span> : `#${rank}`}
      </div>
      <Avatar>
        <AvatarImage src={user.profileImageUrl} />
        <AvatarFallback>{user.username[0]}</AvatarFallback>
      </Avatar>
      <div className="flex-1">
        <p className="font-semibold">{user.username}</p>
        <p className="text-sm text-muted-foreground">Level {user.level}</p>
      </div>
      <div className="text-right">
        <p className="font-bold text-primary">{user.xp} XP</p>
      </div>
    </div>
  );
}
```

**Where to update**: `client/src/pages/leaderboard.tsx`

---

### Summary Table

| Feature | Status | Difficulty | Impact | Priority |
|---------|--------|-----------|--------|----------|
| XP Gain Animation | ❌ Not Implemented | Easy | High | High |
| Level-Up Celebration | ❌ Not Implemented | Medium | High | High |
| Quest System | ❌ Not Implemented | Hard | Very High | Medium |
| Chapter System | ❌ Not Implemented | Medium | Medium | Low |
| Circular Progress | ❌ Not Implemented | Easy | Medium | Medium |
| Achievement Modal | ❌ Not Implemented | Easy | High | High |
| Streak Animation | ✅ Partially Done | Easy | Medium | Low |
| Leaderboard Medals | ✅ Partially Done | Easy | Low | Low |

**Recommended Implementation Order:**
1. XP Gain Animation (quick win, high impact)
2. Achievement Modal (quick win, high impact)
3. Level-Up Celebration (medium effort, high impact)
4. Quest System (high effort, very high impact)
5. Circular Progress (easy, nice visual upgrade)

---

## Conclusion

LingoQuest is a **production-ready, feature-complete** gamified language learning platform with:

✅ **Triple authentication** (Google, Facebook, Email/Password)  
✅ **Full gamification system** (XP, levels, streaks, badges, leaderboard)  
✅ **Community-driven content** (user contributions + admin moderation)  
✅ **Boot.dev-inspired UI** (dark mode, neon accents, retro vibes)  
✅ **Type-safe codebase** (TypeScript + Drizzle + Zod)  
✅ **Production deployment guide** (Replit Autoscale + alternatives)  

**Next Steps:**
1. Implement Priority 1 security improvements (rate limiting, logging, input sanitization)
2. Add XP gain animations and level-up celebrations (quick wins)
3. Build quest/challenge system (high-impact feature)
4. Scale as user base grows (caching, connection pooling)

**Estimated Monthly Cost** (100-500 users):
- Replit Autoscale: $5-15/month
- PostgreSQL: Free (Neon free tier)
- Total: **$5-15/month**

**Contact/Contribute:**
- GitHub: (your-repo-url)
- Issues: Report bugs or request features
- Contributions: Fork and submit PRs

---

**Document Version**: 1.0  
**Last Updated**: November 20, 2025  
**Author**: AI Technical Documentation Agent  
**Project**: LingoQuest - Gamified Language Learning Platform
