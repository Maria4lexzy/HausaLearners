# LingoQuest - Gamified Language Learning Platform

## Overview
LingoQuest is a community-driven, gamified language learning platform where users learn through interactive lessons, track vocabulary with memory-strength scoring, and contribute their own content. Built with a zero-cost tech stack (Supabase free tier), it features XP systems, achievement badges, streaks, leaderboards, and admin moderation workflows.

## Tech Stack
- **Frontend**: React + TypeScript + Wouter + TailwindCSS + shadcn/ui
- **Backend**: Express.js + Drizzle ORM
- **Database**: Supabase PostgreSQL (free tier)
- **State Management**: TanStack Query v5

## Project Structure
```
├── client/               # Frontend React application
│   ├── src/
│   │   ├── components/   # Reusable UI components
│   │   ├── pages/        # Page-level components
│   │   └── lib/          # Utilities and query client
├── server/               # Express backend
│   ├── routes.ts         # API endpoints
│   └── storage.ts        # Database access layer
├── db/                   # Database configuration
│   ├── index.ts          # Drizzle client
│   └── seed.ts           # Initial data seeding
├── shared/
│   └── schema.ts         # Shared TypeScript types & Drizzle schemas
└── migrations/           # Database migrations
```

## Key Features Implemented

### 1. Gamification System
- **XP & Levels**: Users earn XP for completing lessons, leveling up every 100 XP
- **Streaks**: Track daily learning streaks with visual flame indicators
- **Badges**: Achievement system for milestones (first lesson, 7-day streak, 100 XP, etc.)
- **Leaderboards**: Global and language-specific rankings

### 2. Learning Experience
- **Skill Tree**: Visual progression through lesson tracks
- **Multiple Question Types**:
  - Multiple Choice
  - Fill in the Blank
  - Flashcards
- **Interactive Lesson Player**: Full-screen immersive learning mode
- **Audio Support**: Optional pronunciation audio for questions

### 3. Vocabulary Tracking
- **Personal Vocabulary Book**: Auto-populated from completed lessons
- **Memory Strength System**:
  - Known (green): Consistently correct answers
  - Fuzzy (amber): Some incorrect answers
  - Forgotten (red): Multiple incorrect answers
- **Smart Review**: Filter and practice weak vocabulary

### 4. Community Contributions
- **Lesson Creation**: Users can submit new lessons with structured validation
- **Track Proposals**: Suggest entirely new learning tracks
- **Admin Dashboard**: Review, approve, edit, or reject contributions with feedback

## Database Schema

### Core Tables
- **users**: User accounts, XP, level, streak tracking
- **tracks**: Learning tracks (Basics, Travel, Food, etc.)
- **lessons**: Individual lessons with JSON question data
- **vocabulary**: User-specific vocabulary with memory tracking
- **user_lessons**: Progress tracking for lesson completion
- **badges**: Achievement definitions
- **user_badges**: Awarded badges per user
- **contributions**: Community-submitted content awaiting review

## API Endpoints

### Tracks
- `GET /api/tracks` - List all tracks
- `GET /api/tracks/:id` - Get single track
- `POST /api/tracks` - Create new track (admin/approved contributions)

### Lessons
- `GET /api/tracks/:trackId/lessons` - Get lessons for a track
- `GET /api/lessons/:id` - Get single lesson
- `POST /api/lessons` - Create new lesson
- `POST /api/lessons/:lessonId/complete` - Mark lesson complete, award XP, update vocabulary

### Vocabulary
- `GET /api/users/:userId/vocabulary` - Get user's vocabulary list

### Progress & Gamification
- `GET /api/users/:userId` - Get user profile with XP/level/streak
- `POST /api/users/:userId/streak` - Update user streak
- `GET /api/badges` - List all badges
- `GET /api/users/:userId/badges` - Get user's earned badges

### Leaderboard
- `GET /api/leaderboard?limit=100` - Get top users by XP

### Contributions
- `GET /api/contributions?status=pending` - List contributions
- `POST /api/contributions` - Submit new contribution
- `PATCH /api/contributions/:id` - Approve/reject contribution

## Design System

### Colors (Light Mode)
- **Primary**: Blue (210° 85% 45%) - Learning, trust
- **Success**: Green (142° 76% 36%) - Correct answers, achievements
- **Warning**: Amber (38° 92% 50%) - Fuzzy vocabulary, needs review
- **Destructive**: Red (0° 84% 60%) - Errors, forgotten words

### Memory Strength Color Coding
- **Known**: Green border + green/5 background
- **Fuzzy**: Amber border + amber/5 background
- **Forgotten**: Red border + red/5 background

### Components
- Uses shadcn/ui component library with Radix UI primitives
- Custom gamification components: XPBar, StreakCounter, BadgeDisplay
- Lesson player with full-screen immersive mode
- Vocabulary cards with collapsible example phrases
- Leaderboard items with rank badges (gold/silver/bronze for top 3)

## Recent Changes (Current Session)
1. Implemented complete schema with Drizzle ORM for Supabase
2. Built all frontend components with exceptional visual quality
3. Created comprehensive API routes for all features
4. Set up database storage layer with TypeScript interfaces
5. Designed gamification algorithms (XP calculation, memory strength scoring)

## User Preferences
- Modern, playful design inspired by Duolingo and Boot.dev
- Community-first approach - users can contribute without coding
- Free tier compatible - zero startup costs for modest usage

## Known Limitations
- Database seeding requires manual execution due to SSL certificate configuration
- Admin features require manual user role assignment in database
- Audio files stored as URLs (not uploaded to Supabase Storage yet)

## Next Steps (Post-MVP)
- Implement Supabase Auth for Google OAuth and email/password
- Add spaced repetition algorithm for vocabulary reviews
- Audio upload to Supabase Storage
- Mobile-responsive optimizations
- User profiles with contribution history
- Social features (friend challenges, shared vocabulary lists)
