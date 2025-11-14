// OAuth Authentication - Google and Facebook
// Session management with PostgreSQL storage

import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import passport from "passport";
import session from "express-session";
import type { Express } from "express";
import connectPg from "connect-pg-simple";
import { storage } from "./storage";


export function getSession() {
  const sessionTtl = 7 * 24 * 60 * 60 * 1000; // 1 week
  const pgStore = connectPg(session);
  const sessionStore = new pgStore({
    conString: process.env.DATABASE_URL,
    createTableIfMissing: false,
    ttl: sessionTtl,
    tableName: "sessions",
  });
  return session({
    secret: process.env.SESSION_SECRET!,
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: sessionTtl,
    },
  });
}

async function upsertGoogleUser(profile: any): Promise<string> {
  // Map Google user to our internal user system
  const [firstName, ...lastNameParts] = (profile.displayName || "").split(" ");
  const user = await storage.upsertUser({
    googleId: profile.id,
    email: profile.emails?.[0]?.value,
    firstName: firstName || profile.name?.givenName,
    lastName: lastNameParts.join(" ") || profile.name?.familyName,
    profileImageUrl: profile.photos?.[0]?.value,
  });
  return user.id; // Return database UUID
}

async function upsertFacebookUser(profile: any): Promise<string> {
  // Map Facebook user to our internal user system
  const [firstName, ...lastNameParts] = (profile.displayName || "").split(" ");
  const user = await storage.upsertUser({
    facebookId: profile.id,
    email: profile.emails?.[0]?.value,
    firstName: firstName,
    lastName: lastNameParts.join(" "),
    profileImageUrl: profile.photos?.[0]?.value,
  });
  return user.id; // Return database UUID
}

export async function setupAuth(app: Express) {
  app.set("trust proxy", 1);
  app.use(getSession());
  app.use(passport.initialize());
  app.use(passport.session());

  // Google OAuth Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    const callbackURL = process.env.NODE_ENV === 'production'
      ? `https://${process.env.REPLIT_DOMAINS?.split(',')[0]}/api/auth/google/callback`
      : 'http://localhost:5000/api/auth/google/callback';

    passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL,
      scope: ['profile', 'email'],
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        const userId = await upsertGoogleUser(profile);
        // Store database UUID in session
        done(null, { userId, provider: 'google' });
      } catch (error) {
        done(error);
      }
    }));
  }

  // Facebook OAuth Strategy
  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    const callbackURL = process.env.NODE_ENV === 'production'
      ? `https://${process.env.REPLIT_DOMAINS?.split(',')[0]}/api/auth/facebook/callback`
      : 'http://localhost:5000/api/auth/facebook/callback';

    passport.use(new FacebookStrategy({
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL,
      profileFields: ['id', 'displayName', 'emails', 'photos'],
      enableProof: true,
    }, async (accessToken, refreshToken, profile, done) => {
      try {
        const userId = await upsertFacebookUser(profile);
        // Store database UUID in session
        done(null, { userId, provider: 'facebook' });
      } catch (error) {
        done(error);
      }
    }));
  }

  passport.serializeUser((user: Express.User, cb) => cb(null, user));
  passport.deserializeUser((user: Express.User, cb) => cb(null, user));

  // Google OAuth Routes
  app.get("/api/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
  );

  app.get("/api/auth/google/callback",
    passport.authenticate("google", { 
      failureRedirect: "/auth/login",
      failureMessage: true 
    }),
    (req: any, res) => {
      // Explicitly set session userId before redirecting
      if (req.user && req.user.userId) {
        req.session.userId = req.user.userId;
        req.session.save((err) => {
          if (err) {
            console.error("Session save error:", err);
          }
          res.redirect("/");
        });
      } else {
        res.redirect("/auth/login");
      }
    }
  );

  // Facebook OAuth Routes
  app.get("/api/auth/facebook",
    passport.authenticate("facebook", { scope: ["email"] })
  );

  app.get("/api/auth/facebook/callback",
    passport.authenticate("facebook", { 
      failureRedirect: "/auth/login",
      failureMessage: true 
    }),
    (req: any, res) => {
      // Explicitly set session userId before redirecting
      if (req.user && req.user.userId) {
        req.session.userId = req.user.userId;
        req.session.save((err) => {
          if (err) {
            console.error("Session save error:", err);
          }
          res.redirect("/");
        });
      } else {
        res.redirect("/auth/login");
      }
    }
  );
}
