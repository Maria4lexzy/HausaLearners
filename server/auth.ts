import bcrypt from "bcrypt";
import { storage } from "./storage";
import type { InsertUser } from "@shared/schema";

const SALT_ROUNDS = 10;

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export async function registerUser(username: string, email: string, password: string) {
  const existingUser = await storage.getUserByEmail(email);
  if (existingUser) {
    throw new Error("Email already registered");
  }

  const existingUsername = await storage.getUserByUsername(username);
  if (existingUsername) {
    throw new Error("Username already taken");
  }

  const hashedPassword = await hashPassword(password);
  const user = await storage.createUser({
    username,
    email,
    password: hashedPassword,
  });

  return { id: user.id, username: user.username, email: user.email, xp: user.xp, level: user.level, streak: user.streak };
}

export async function loginUser(email: string, password: string) {
  const user = await storage.getUserByEmail(email);
  if (!user || !user.password) {
    throw new Error("Invalid credentials");
  }

  const isValid = await verifyPassword(password, user.password);
  if (!isValid) {
    throw new Error("Invalid credentials");
  }

  return { id: user.id, username: user.username, email: user.email, xp: user.xp, level: user.level, streak: user.streak, isAdmin: user.isAdmin };
}
