# LingoQuest - Gamified Language Learning Platform

## Overview
LingoQuest is a community-driven, gamified language learning platform designed for interactive language learning. It features an XP system, achievement badges, streaks, and leaderboards, and allows users to contribute their own content. The platform tracks vocabulary with a memory-strength scoring system and includes admin moderation workflows. It is built using a zero-cost tech stack, primarily leveraging Supabase's free tier.

## User Preferences
- **Boot.dev-inspired dark mode aesthetics** - neon green XP, electric purple badges, deep midnight backgrounds
- **Retro gaming vibes** - pixel-perfect achievement unlocks, level-up celebrations
- **Terminal/code aesthetic** - developer-focused UI with JetBrains Mono accents
- Community-first approach - users can contribute without coding
- Free tier compatible - zero startup costs for modest usage

## System Architecture
LingoQuest employs a full-stack architecture with a React + TypeScript frontend, an Express.js backend, and a PostgreSQL database managed by Supabase.

**UI/UX Decisions:**
- **Design System:** Primarily uses `shadcn/ui` with Radix UI primitives.
- **Color Palettes:**
    - **Boot.dev Dark Mode:** Neon green for XP/success, electric purple for badges/secondary actions, bright cyan for interactive elements, and deep midnight backgrounds.
    - **Hausa Cultural Design:** Desert-night color palette with burnt orange (primary), emerald (success), gold (royal status), and deep indigo (background).
- **Gamification Components:** Custom components like `CalabashXPBar`, `IncenseStreakCounter`, `KolaNutProgress`, `LeatherCard`, `HennaDivider`, and `CowrieReward` integrated with cultural animations.
- **Hausa Icon System:** Custom SVG icon library (`hausa-icons.tsx`) featuring 11 culturally-authentic icons including CalabashIcon, TalkingDrumIcon, TurbanIcon, MinaretIcon, IncenseIcon, KolaNutIcon, CowrieIcon, CamelIcon, LeatherScrollIcon, HennaIcon, and ZamaniPatternIcon - replacing generic Lucide icons throughout the application.
- **Traditional Background Patterns:** CSS-based Hausa/Northern Nigerian patterns including Fulani diamond lattice (`.fulani-diamonds`), desert dune waves (`.desert-waves`), traditional mud-cloth patterns (`.mud-cloth`), and animated harmattan haze effect with subtle drift animation.
- **Bilingual Support:** Hausa/English labels and Hausa/Ajami fonts (Amiri and Scheherazade New).

**Technical Implementations:**
- **Frontend:** React + TypeScript, Wouter for routing, TailwindCSS for styling. State management handled by TanStack Query v5.
- **Backend:** Express.js with Drizzle ORM for database interactions.
- **Database:** PostgreSQL on Supabase, with Drizzle ORM for schema definition and migrations.
- **Authentication:** Production-ready triple authentication system including direct Google OAuth, Facebook OAuth via Passport.js, and traditional email/password with bcrypt hashing. PostgreSQL session store (`connect-pg-simple`) ensures production persistence.
- **Gamification System:** XP and leveling, daily streaks, achievement badges, and global leaderboards.
- **Learning Experience:** Skill tree progression, multiple question types (multiple choice, fill-in-the-blank, flashcards), and an interactive full-screen lesson player with optional audio support.
- **Vocabulary Tracking:** Personal vocabulary book with a "memory strength" system (Known, Fuzzy, Forgotten) and smart review functionality.
- **Community Contributions:** Users can submit lessons and track proposals, which are managed via an admin dashboard for review and approval.

**Feature Specifications:**
- **Gamification:** XP & Levels (100 XP per level), Streaks (daily tracking), Badges (milestone achievements), Leaderboards (global rankings).
- **Learning Content:** Lessons contain JSON question data.
- **Vocabulary:** User-specific vocabulary with memory tracking.
- **Progress:** Tracks user lesson completion.

**System Design Choices:**
- **Zero-Cost Tech Stack:** Optimized for cost-effectiveness using Supabase free tier.
- **Modular Project Structure:** Separated client, server, database, and shared schema.
- **API Endpoints:** Comprehensive RESTful API for authentication, track/lesson management, vocabulary, progress, gamification, and contributions.

## Hausa Curriculum Content

### 10 Comprehensive Learning Modules (44+ Lessons)
1. **Alphabet & Pronunciation** (5 lessons) - Boko script, special letters, tones
2. **Greetings & Introductions** (6 lessons) - Formal/informal greetings, situational responses
3. **Numbers & Time** (5 lessons) - Counting 1-100, telling time, days of week
4. **Family & Colors** (5 lessons) - Family terms, color vocabulary, descriptions
5. **Basic Nouns & Gender** (5 lessons) - House parts, body parts, gender rules, plurals
6. **Simple Pronouns & Possession** (5 lessons) - Personal pronouns, possessives, demonstratives
7. **Daily Routines** (4 lessons) - Action verbs, present tense, routine sentences
8. **Food & Shopping Basics** (4 lessons) - Food vocabulary, market phrases, bargaining
9. **Directions & Places** (3 lessons) - Location names, asking directions, commands
10. **Weather & Seasons** (3 lessons) - Weather expressions, seasonal vocabulary

**Each Lesson Includes:**
- Multiple question types: multiple choice, fill-in-blank, flashcards
- Vocabulary with pronunciation guides
- Optional audio URLs for pronunciation practice
- Tone patterns for tonal accuracy
- Cultural context and Hausa-specific linguistic features

**Seed Data:** Run `POST /api/seed` to populate database with all 10 modules and 44+ lessons automatically.

## External Dependencies
- **Supabase PostgreSQL:** Core database for all application data.
- **Passport.js:** Used for Google OAuth and Facebook OAuth strategies.
- **connect-pg-simple:** PostgreSQL-backed session storage for Express.js.
- **bcrypt:** For secure password hashing.
- **Google Fonts:** Amiri and Scheherazade New for cultural typography.
- **shadcn/ui:** UI component library built on Radix UI.
- **TanStack Query v5:** For data fetching, caching, and state management in the frontend.

## Recent Updates (Session 7-8)
- **Improved Error Handling:** Added React Error Boundaries and dedicated error page with navigation options
- **Fixed Leaderboard Null Error:** Added null-safe checks for username fallback
- **Comprehensive Hausa Schema:** Added `language` field to lessons/tracks, `pronunciation`, `audioUrl`, `tone` to vocabulary
- **Hausa Icon System:** Added DesertArrowIcon for navigation, replaced all generic arrows with Hausa-themed alternatives
- **Custom Hausa Curriculum:** 10 modules with 44+ lessons, authentic cultural content, proper tone/pronunciation data
- **Database Seeding:** Automated curriculum population via `/api/seed` endpoint