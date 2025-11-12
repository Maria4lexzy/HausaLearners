# 🚀 LingoQuest Deployment Guide

Complete guide for deploying LingoQuest to production using Replit Autoscale Deployments.

---

## 📋 Pre-Deployment Checklist

Before deploying to production, ensure all items are complete:

### ✅ Authentication & Security
- [ ] `SESSION_SECRET` is set to a strong random value (32+ characters)
- [ ] PostgreSQL session store is configured (already implemented in `server/replitAuth.ts`)
- [ ] Passwords are hashed with bcrypt (already implemented)
- [ ] HTTPS is enforced in production (automatically handled by Replit)
- [ ] All secrets are stored in Replit Secrets (not in code)

### ✅ Database
- [ ] Database schema is migrated (`npm run db:push`)
- [ ] Seeded initial data (`POST /api/seed`)
- [ ] Database has backups enabled (Replit provides automatic backups)
- [ ] Foreign key constraints are properly set

### ✅ Application
- [ ] All LSP errors resolved
- [ ] End-to-end tests passed
- [ ] Error handling implemented for all routes
- [ ] Production environment variables configured

---

## 🔐 Required Environment Variables

### Development (Auto-Configured)
```bash
DATABASE_URL=postgresql://...        # Auto-provided by Replit
SESSION_SECRET=<random-secret>       # Auto-provided in development
REPL_ID=<your-repl-id>              # Auto-provided by Replit
ISSUER_URL=https://replit.com/oidc  # Auto-provided for Replit Auth
NODE_ENV=development                 # Auto-set
```

### Production (Must Set Manually)
```bash
SESSION_SECRET=<strong-random-secret>  # CRITICAL: Generate with: openssl rand -base64 32
```

**⚠️ CRITICAL**: Never use the development `SESSION_SECRET` in production. Generate a strong secret:
```bash
openssl rand -base64 32
```

Then add it to Replit Secrets:
1. Open your Replit project
2. Click **"Secrets"** (lock icon) in the left sidebar
3. Click **"New Secret"**
4. Name: `SESSION_SECRET`
5. Value: Paste the generated secret
6. Click **"Add Secret"**

---

## 🎯 Deployment Options

LingoQuest supports two Replit deployment types:

### Option 1: Autoscale Deployments (Recommended ⭐)

**Best for**: Variable traffic, cost-efficiency, educational apps

**Pricing**: ~$5-15/month for 100-500 daily active users (with Replit Core credits)

**Pros**:
- ✅ Scales automatically from 0 to multiple instances
- ✅ Pay only for actual usage
- ✅ Perfect for sporadic/burst traffic patterns
- ✅ Free tier credits apply

**Cons**:
- ⚠️ Cold starts (1-3 seconds when scaling from 0)
- ⚠️ Not ideal for real-time features requiring instant response

**Configuration**:
```yaml
Machine Power: 0.5 vCPUs, 1 GB RAM
Min Instances: 0 (scales to zero when idle)
Max Instances: 5 (adjust based on expected traffic)
```

### Option 2: Reserved VM Deployments

**Best for**: Consistent traffic, always-on apps, real-time features

**Pricing**: ~$20-40/month (always-on, no scaling)

**Pros**:
- ✅ Zero cold starts
- ✅ Predictable performance
- ✅ Always running

**Cons**:
- ❌ Higher cost (pays for idle time)
- ❌ Manual scaling

**Configuration**:
```yaml
Machine Power: 1 vCPU, 2 GB RAM
Always-On: Yes
```

### Recommendation for LingoQuest

**Use Autoscale Deployments** because:
- LingoQuest is a learning app with variable traffic (peak during study hours, low overnight)
- Cold starts are acceptable for educational content (1-3 seconds is fine)
- Cost-efficiency matters for free/freemium models
- Can scale up for viral growth without configuration changes

---

## 📦 Step-by-Step Deployment

### 1. Prepare Your Application

#### a. Set SESSION_SECRET (CRITICAL)
```bash
# Generate strong secret
openssl rand -base64 32

# Add to Replit Secrets:
# Go to Secrets → New Secret → Name: SESSION_SECRET → Value: (paste generated secret)
```

#### b. Push Database Schema
```bash
npm run db:push
```

#### c. Seed Initial Data
```bash
curl -X POST http://localhost:5000/api/seed
```

#### d. Test Locally
```bash
npm run dev

# Test endpoints:
# - https://your-repl.replit.dev/
# - https://your-repl.replit.dev/api/auth/user (should 401)
# - Click "Continue with Replit" on login page
```

### 2. Configure Deployment Settings

1. **Open Replit Deployment**
   - Click **"Deploy"** button (rocket icon) in top-right
   - Select **"Autoscale Deployments"**

2. **Configure Machine Power**
   ```
   CPU: 0.5 vCPUs
   RAM: 1 GB
   ```

3. **Set Scaling Limits**
   ```
   Min Instances: 0
   Max Instances: 5
   ```

4. **Build Configuration**
   - Build Command: `npm install` (auto-detected)
   - Run Command: `npm run dev` (auto-detected from workflow)

5. **Environment Variables**
   - Replit automatically copies secrets from development to production
   - Verify `SESSION_SECRET` is set correctly
   - Verify `DATABASE_URL` is configured (should be automatic)

### 3. Deploy

1. Click **"Deploy"** button
2. Wait for build to complete (1-3 minutes)
3. Replit will show deployment URL: `https://your-app-name.replit.app`

### 4. Post-Deployment Verification

#### a. Check Application Health
```bash
# Test homepage
curl https://your-app-name.replit.app/

# Test authentication endpoint (should return 401)
curl https://your-app-name.replit.app/api/auth/user

# Test OAuth login (opens browser)
open https://your-app-name.replit.app/api/login
```

#### b. Verify Database Connection
```bash
# Test tracks endpoint (should return seeded tracks)
curl https://your-app-name.replit.app/api/tracks
```

#### c. Test Authentication Flow

1. **Replit Auth** (OAuth):
   - Navigate to `https://your-app-name.replit.app/auth/login`
   - Click **"Continue with Replit"**
   - Authorize with Google/GitHub/Apple/X
   - Verify redirect to dashboard
   - Check XP/level/streak display

2. **Password Auth**:
   - Register a new account via password form
   - Verify email/username/password login
   - Test logout
   - Test login again

#### d. Check Session Persistence
```bash
# Log in via browser
# Close browser tab
# Reopen app (should still be logged in)
# Session should persist for 7 days
```

---

## 📊 Production Monitoring

### Replit Deployment Dashboard

Access monitoring at: `https://replit.com/@your-username/your-repl/deployments`

**Key Metrics to Monitor**:
- **Active Instances**: Should scale 0-5 based on traffic
- **Response Time**: Aim for <500ms average
- **Error Rate**: Should be <1%
- **CPU Usage**: Should stay below 80%
- **Memory Usage**: Should stay below 80% of 1 GB

### Logging

View logs in Replit Deployment dashboard:
```bash
# Filter by level
ERROR    # Critical errors
WARN     # Warnings
INFO     # General info
DEBUG    # Detailed debug logs
```

### Common Production Issues

#### High Error Rate
```bash
# Check logs for:
- Database connection failures
- Session store errors
- Authentication failures

# Solutions:
- Verify DATABASE_URL is correct
- Check SESSION_SECRET is set
- Ensure HTTPS is enforced
```

#### Slow Response Times
```bash
# Check:
- Database query performance
- Memory usage (increase if >80%)
- Instance count (increase max instances)

# Solutions:
- Add database indexes for frequent queries
- Optimize heavy queries
- Scale to 1 vCPU, 2 GB RAM
```

#### Cold Start Issues
```bash
# If cold starts are problematic:
- Set Min Instances: 1 (keeps 1 instance always warm)
- Upgrade to Reserved VM (no cold starts)
```

---

## 🔒 Security Best Practices

### ✅ Session Security
```typescript
// Already implemented in server/replitAuth.ts
cookie: {
  secure: process.env.NODE_ENV === 'production', // HTTPS only
  httpOnly: true,                                 // No JavaScript access
  sameSite: 'lax',                               // CSRF protection
  maxAge: 7 * 24 * 60 * 60 * 1000               // 7 days
}
```

### ✅ Password Security
- Passwords hashed with bcrypt (SALT_ROUNDS=10)
- Never log or expose passwords
- Enforce minimum password length (6 characters)

### ✅ Database Security
- Use parameterized queries (Drizzle ORM handles this)
- Never concatenate user input into SQL
- Enforce foreign key constraints

### ✅ API Security
```typescript
// Authentication middleware (requireAuth) protects routes
app.get("/api/protected", requireAuth, async (req, res) => {
  // Only authenticated users can access
});

// Admin-only routes
app.post("/api/tracks", requireAdmin, async (req, res) => {
  // Only admins can create tracks
});
```

---

## 🐛 Troubleshooting

### Deployment Fails

**Issue**: Build fails with "npm install error"
```bash
# Solution:
- Check package.json for syntax errors
- Verify all dependencies are listed
- Try deploying again (transient npm registry issues)
```

**Issue**: Database migration fails
```bash
# Solution:
- Run `npm run db:push --force` locally first
- Verify DATABASE_URL in production secrets
- Check database permissions
```

### Authentication Issues

**Issue**: "Unauthorized" errors after login
```bash
# Check:
- SESSION_SECRET is set correctly
- Sessions table exists (run db:push)
- Cookie domain matches deployment URL

# Solution:
- Verify secrets in Replit dashboard
- Clear browser cookies and retry
- Check server logs for session errors
```

**Issue**: Replit Auth callback fails
```bash
# Check:
- REPL_ID is set correctly (auto-provided)
- ISSUER_URL is https://replit.com/oidc
- Callback URL matches deployment domain

# Solution:
- Verify environment variables
- Check Replit Auth configuration
- Ensure HTTPS is enabled
```

### Performance Issues

**Issue**: Slow database queries
```bash
# Add indexes:
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_vocabulary_user_id ON vocabulary(user_id);
CREATE INDEX idx_user_lessons_user_id ON user_lessons(user_id);

# Or use Drizzle:
export const users = pgTable("users", {
  // ...
}, (table) => ({
  emailIdx: index("email_idx").on(table.email),
}));
```

**Issue**: High memory usage
```bash
# Solution:
- Upgrade to 1 vCPU, 2 GB RAM
- Optimize React components (use React.memo)
- Reduce bundle size (code splitting)
```

---

## 📈 Scaling Recommendations

### User Growth Stages

#### 0-100 Daily Active Users
```yaml
Deployment: Autoscale
CPU: 0.5 vCPUs
RAM: 1 GB
Min Instances: 0
Max Instances: 3
Cost: ~$5-10/month
```

#### 100-500 Daily Active Users
```yaml
Deployment: Autoscale
CPU: 0.5 vCPUs
RAM: 1 GB
Min Instances: 1  # Keep one instance warm
Max Instances: 5
Cost: ~$10-20/month
```

#### 500-2,000 Daily Active Users
```yaml
Deployment: Autoscale
CPU: 1 vCPU
RAM: 2 GB
Min Instances: 2
Max Instances: 10
Cost: ~$30-50/month
```

#### 2,000+ Daily Active Users
```yaml
Deployment: Reserved VM (consider migrating to dedicated infrastructure)
CPU: 2 vCPUs
RAM: 4 GB
Cost: ~$80-120/month
```

---

## 🎓 Best Practices Summary

### ✅ Do
- Set strong `SESSION_SECRET` in production
- Use PostgreSQL session store (already configured)
- Monitor logs and metrics regularly
- Keep dependencies updated (`npm audit`)
- Test authentication flows end-to-end
- Use Autoscale for variable traffic
- Enable automatic backups (Replit provides this)

### ❌ Don't
- Use development `SESSION_SECRET` in production
- Store sessions in memory (MemoryStore)
- Commit secrets to git
- Skip database migrations
- Deploy without testing locally
- Ignore error logs
- Use Reserved VM for low-traffic apps (waste of money)

---

## 📚 Additional Resources

- **Replit Deployments Docs**: https://docs.replit.com/category/replit-deployments
- **Autoscale Deployments**: https://docs.replit.com/cloud-services/deployments/autoscale-deployments
- **Reserved VM Deployments**: https://docs.replit.com/cloud-services/deployments/reserved-vm-deployments
- **Database Documentation**: https://docs.replit.com/cloud-services/storage-and-databases/sql-database
- **Secrets Management**: https://docs.replit.com/replit-workspace/workspace-features/secrets
- **Usage-Based Billing**: https://docs.replit.com/billing/about-usage-based-billing

---

## 🆘 Support

If you encounter issues not covered in this guide:

1. Check Replit Deployment logs
2. Review browser console errors
3. Test authentication flow manually
4. Verify all environment variables
5. Contact Replit support if infrastructure issues

---

**✨ Congratulations!** Your LingoQuest app is now deployed and ready for users to start their language learning journey!
