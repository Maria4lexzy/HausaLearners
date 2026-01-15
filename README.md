# LingoQuest - Gamified Hausa Language Learning Platform

LingoQuest is a community-driven, gamified language learning platform designed for interactive Hausa language learning. Built with authentic Hausa cultural aesthetics and featuring comprehensive curriculum management.

## Features

### Learning Experience
- **Skill Tree Progression** - Structured learning path from beginner to advanced
- **Interactive Lessons** - Multiple question types including flashcards, multiple choice, fill-in-the-blank
- **Vocabulary Tracking** - Personal vocabulary book with memory strength scoring (Known, Fuzzy, Forgotten)
- **Audio Support** - Pronunciation guides with optional audio playback

### Gamification
- **XP & Leveling System** - Earn 100 XP per level with progress tracking
- **Daily Streaks** - Maintain learning momentum with streak tracking
- **Achievement Badges** - Unlock milestones and celebrate progress
- **Global Leaderboards** - Compete with other learners

### Cultural Authenticity
- **Hausa Cultural Design** - Desert-night color palette with burnt orange, emerald, and gold accents
- **Custom Icon System** - 11 culturally-authentic Hausa icons (Calabash, Talking Drum, Turban, etc.)
- **Traditional Patterns** - Fulani diamond lattice, desert waves, mud-cloth patterns
- **Bilingual Support** - Hausa/English labels with cultural typography

### Admin Features
- **Curriculum Import** - Bulk import lessons from structured JSON
- **Lesson Creator** - Build lessons with Hausa-specific fields (tone patterns, pronunciation)
- **Contribution Review** - Moderate community-submitted content
- **Edit Before Approve** - Modify contributions before publishing

## Tech Stack

- **Frontend**: React + TypeScript, TailwindCSS, shadcn/ui, Framer Motion
- **Backend**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Google OAuth, Facebook OAuth, Email/Password
- **State Management**: TanStack Query v5

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```
   DATABASE_URL=your_postgres_connection_string
   SESSION_SECRET=your_session_secret
   GOOGLE_CLIENT_ID=your_google_oauth_client_id
   GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
   ```

4. Push database schema:
   ```bash
   npm run db:push
   ```

5. Seed the database with Hausa curriculum:
   ```bash
   # POST request to /api/seed
   ```

6. Start the development server:
   ```bash
   npm run dev
   ```

## Curriculum Structure

LingoQuest includes 10 comprehensive Hausa learning modules:

1. **Alphabet & Pronunciation** - Boko script, special letters, tones
2. **Greetings & Introductions** - Formal/informal greetings
3. **Numbers & Time** - Counting, telling time, days of week
4. **Family & Colors** - Family terms, color vocabulary
5. **Basic Nouns & Gender** - House parts, body parts, gender rules
6. **Simple Pronouns & Possession** - Personal pronouns, possessives
7. **Daily Routines** - Action verbs, present tense
8. **Food & Shopping** - Food vocabulary, market phrases
9. **Directions & Places** - Location names, asking directions
10. **Weather & Seasons** - Weather expressions, seasonal vocabulary

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register with email/password
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/google` - Google OAuth login
- `GET /api/auth/facebook` - Facebook OAuth login

### Learning
- `GET /api/tracks` - Get all learning tracks
- `GET /api/tracks/:id/lessons` - Get lessons for a track
- `GET /api/lessons/:id` - Get lesson details
- `POST /api/lessons/:id/complete` - Mark lesson complete

### Gamification
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/users/:id/badges` - Get user badges
- `POST /api/users/:id/streak` - Update streak

### Admin
- `POST /api/admin/lessons` - Create new lesson
- `POST /api/admin/import-curriculum` - Bulk import curriculum
- `PATCH /api/admin/contributions/:id` - Review/edit contributions

## Cookie Consent & Analytics

LingoQuest includes a GDPR-compliant cookie consent banner supporting:
- Google Analytics 4
- Google Ads

Users can customize their preferences for analytics and advertising cookies.

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `SESSION_SECRET` | Express session secret |
| `GOOGLE_CLIENT_ID` | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | Google OAuth client secret |
| `FACEBOOK_APP_ID` | Facebook OAuth app ID (optional) |
| `FACEBOOK_APP_SECRET` | Facebook OAuth app secret (optional) |
| `VITE_GA_MEASUREMENT_ID` | Google Analytics measurement ID (optional) |

## Contributing

LingoQuest welcomes community contributions! Users can submit:
- New lesson proposals
- Track suggestions
- Vocabulary additions

All contributions go through admin review before publishing.

## License

MIT License - See LICENSE file for details.

## Acknowledgments

- Hausa cultural elements inspired by Northern Nigerian traditions
- UI components from shadcn/ui
- Icons from Lucide React
