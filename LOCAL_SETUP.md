# LingoQuest - Local Development Setup

This guide will help you run LingoQuest on your local machine.

## Prerequisites

- **Node.js** (v18 or later)
- **PostgreSQL** (v14 or later)
- **Git** (to clone the repository)

## Setup Instructions

### 1. Clone or Download the Code

If you're working from Replit, you can download the entire project or clone it to your local machine.

### 2. Install Dependencies

```bash
npm install
```

### 3. Set Up PostgreSQL Database

#### Option A: Use Existing PostgreSQL Installation

1. Make sure PostgreSQL is running on your machine
2. Create a new database:
   ```bash
   psql -U postgres
   CREATE DATABASE lingoquest;
   \q
   ```

#### Option B: Use Docker (Recommended)

```bash
# Run PostgreSQL in Docker
docker run --name lingoquest-db \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=lingoquest \
  -p 5432:5432 \
  -d postgres:15
```

### 4. Configure Environment Variables

1. Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

2. Edit `.env` and update the values:

   ```bash
   # For local PostgreSQL (adjust username/password as needed)
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/lingoquest
   PGHOST=localhost
   PGPORT=5432
   PGUSER=postgres
   PGPASSWORD=postgres
   PGDATABASE=lingoquest

   # Generate a secure session secret
   SESSION_SECRET=$(openssl rand -base64 32)
   ```

   **Important:** Replace `postgres:postgres` with your actual PostgreSQL username and password.

### 5. Run Database Migrations

Push the database schema to your local database:

```bash
npm run db:push
```

If you encounter issues, use:

```bash
npm run db:push --force
```

### 6. Seed the Database

Populate the database with initial tracks, lessons, and badges:

```bash
curl -X POST http://localhost:5000/api/seed
```

Or start the dev server first (step 7), then run the seed command.

### 7. Start the Development Server

```bash
npm run dev
```

The application will be available at:
- **Frontend & Backend:** http://localhost:5000

### 8. Create Your First User

1. Navigate to http://localhost:5000
2. Click "Get Started"
3. Register a new account
4. Start learning!

## Development Workflow

### Running the App

```bash
npm run dev
```

This starts both the Express backend and Vite frontend on port 5000.

### Database Commands

```bash
# Push schema changes to database
npm run db:push

# Force push (if there are conflicts)
npm run db:push --force

# Generate migration files (if needed)
npm run db:generate

# Open Drizzle Studio (database GUI)
npm run db:studio
```

### Making an Admin User

To access the admin dashboard at `/admin`, you need to manually set a user as admin:

```bash
# Connect to your database
psql -U postgres -d lingoquest

# Set a user as admin (replace 'username' with actual username)
UPDATE users SET "isAdmin" = true WHERE username = 'your-username';
\q
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Full PostgreSQL connection string | `postgresql://user:pass@localhost:5432/lingoquest` |
| `PGHOST` | PostgreSQL host | `localhost` |
| `PGPORT` | PostgreSQL port | `5432` |
| `PGUSER` | PostgreSQL username | `postgres` |
| `PGPASSWORD` | PostgreSQL password | `your-password` |
| `PGDATABASE` | Database name | `lingoquest` |
| `SESSION_SECRET` | Session encryption key | Generate with `openssl rand -base64 32` |
| `NODE_ENV` | Environment mode | `development` or `production` |

## Troubleshooting

### "Cannot connect to database"
- Ensure PostgreSQL is running: `pg_isready`
- Check your database credentials in `.env`
- Verify the database exists: `psql -U postgres -l`

### "Port 5000 already in use"
- Change the port in `server/index.ts` or kill the process using port 5000

### "Session secret not found"
- Make sure you've set `SESSION_SECRET` in your `.env` file
- Generate a new one: `openssl rand -base64 32`

### Database schema issues
- Run `npm run db:push --force` to force sync the schema
- If that fails, you may need to drop and recreate the database

## Production Deployment

For production deployment, ensure you:

1. **Set a strong SESSION_SECRET**: Generate with `openssl rand -base64 32`
2. **Use persistent session store**: Configure `connect-pg-simple` instead of MemoryStore
3. **Enable HTTPS**: The app is configured to use secure cookies in production
4. **Set NODE_ENV=production**: This enables production optimizations

## Tech Stack

- **Frontend**: React + TypeScript + Vite + TailwindCSS
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL + Drizzle ORM
- **State Management**: TanStack Query v5
- **UI Components**: shadcn/ui + Radix UI

## Need Help?

- Check the main `replit.md` for API documentation
- Review the database schema in `shared/schema.ts`
- Explore the API routes in `server/routes.ts`

Happy learning! 🚀
