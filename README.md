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

## Quick Start with Docker

The easiest way to run LingoQuest locally is with Docker Compose, which sets up both the application and database automatically. This setup is ideal for development and testing.

### Prerequisites
- Docker and Docker Compose installed

### Running with Docker

1. Clone the repository:
   ```bash
   git clone https://github.com/Maria4lexzy/HausaLearners.git
   cd HausaLearners
   ```

2. Create a `.env` file with your configuration:
   ```bash
   SESSION_SECRET=your-secure-session-secret
   GOOGLE_CLIENT_ID=your-google-oauth-client-id
   GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
   VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
   ```

3. Build and start the application:
   ```bash
   docker-compose up -d --build
   ```
   
   Note: The `--build` flag is required on first run and after changing any `VITE_*` environment variables, as these are embedded during the build process.

4. The application will be available at `http://localhost:5000`

   Database migrations run automatically on startup.

5. Seed the database with Hausa curriculum:
   ```bash
   curl -X POST http://localhost:5000/api/seed
   ```

### Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild after code changes
docker-compose up -d --build

# Reset database (removes all data)
docker-compose down -v
docker-compose up -d
```

## Manual Installation

### Prerequisites
- Node.js 20+
- PostgreSQL 16+

### Setup

1. Clone the repository

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   ```bash
   export DATABASE_URL=postgresql://user:password@localhost:5432/lingoquest
   export SESSION_SECRET=your-session-secret
   export GOOGLE_CLIENT_ID=your-google-oauth-client-id
   export GOOGLE_CLIENT_SECRET=your-google-oauth-client-secret
   ```

4. Push database schema:
   ```bash
   npm run db:push
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Seed the database:
   ```bash
   curl -X POST http://localhost:5000/api/seed
   ```

## Curriculum Structure

LingoQuest includes 10 comprehensive Hausa learning modules with 44+ lessons:

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
- `POST /api/auth/logout` - Logout current session
- `GET /api/auth/me` - Get current user

### Learning
- `GET /api/tracks` - Get all learning tracks
- `GET /api/tracks/:id/lessons` - Get lessons for a track
- `GET /api/lessons/:id` - Get lesson details
- `POST /api/lessons/:id/complete` - Mark lesson complete

### Vocabulary
- `GET /api/vocabulary` - Get user's vocabulary
- `POST /api/vocabulary` - Add vocabulary item
- `PATCH /api/vocabulary/:id` - Update memory strength

### Gamification
- `GET /api/leaderboard` - Get global leaderboard
- `GET /api/users/:id/badges` - Get user badges
- `POST /api/users/:id/streak` - Update streak

### Admin
- `POST /api/admin/lessons` - Create new lesson
- `POST /api/admin/import-curriculum` - Bulk import curriculum
- `GET /api/admin/contributions` - List pending contributions
- `PATCH /api/admin/contributions/:id` - Review/edit contributions

### System
- `POST /api/seed` - Seed database with Hausa curriculum

## Cookie Consent & Analytics

LingoQuest includes a GDPR-compliant cookie consent system:
- Consent defaults to opt-in (unchecked)
- No tracking until explicit consent is granted
- Supports Google Analytics 4 and Google Ads
- Consent preferences stored in localStorage

## Environment Variables

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection string |
| `SESSION_SECRET` | Yes | Express session secret (use a secure random string) |
| `GOOGLE_CLIENT_ID` | No | Google OAuth client ID |
| `GOOGLE_CLIENT_SECRET` | No | Google OAuth client secret |
| `FACEBOOK_APP_ID` | No | Facebook OAuth app ID |
| `FACEBOOK_APP_SECRET` | No | Facebook OAuth app secret |
| `VITE_GA_MEASUREMENT_ID` | No | Google Analytics measurement ID (e.g., G-XXXXXXXXXX) |

## Production Deployment

For production, we recommend:

1. **Use a managed PostgreSQL service** (e.g., Neon, Supabase, AWS RDS) instead of the containerized database

2. **Build with environment variables**:
   ```bash
   docker build \
     --build-arg VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX \
     -t lingoquest:latest .
   ```

3. **Run database migrations separately** before starting the app:
   ```bash
   npm run db:push
   ```

4. **Configure for production**:
   - Use a strong, unique `SESSION_SECRET`
   - Configure OAuth redirect URIs for your production domain
   - Use HTTPS via reverse proxy (nginx, Caddy, etc.)
   - Don't expose PostgreSQL port publicly

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
- Icons from Lucide React and custom Hausa icon system
