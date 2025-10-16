import { storage } from "./storage";
import type { Question } from "@shared/schema";

export async function seedDatabase() {
  try {
    console.log("Starting database seed...");

    // Check if already seeded
    const existingTracks = await storage.getAllTracks();
    if (existingTracks.length > 0) {
      console.log("Database already seeded");
      return { message: "Database already contains data" };
    }

    // Seed Tracks
    const basicsTrack = await storage.createTrack({
      name: "Basics",
      description: "Learn essential words and phrases",
      language: "Spanish",
      icon: "Book",
      order: 1,
      isLocked: false,
      unlockLevel: 1,
    });

    const travelTrack = await storage.createTrack({
      name: "Travel",
      description: "Phrases for getting around",
      language: "Spanish",
      icon: "Plane",
      order: 2,
      isLocked: false,
      unlockLevel: 3,
    });

    const foodTrack = await storage.createTrack({
      name: "Food & Dining",
      description: "Order food and discuss meals",
      language: "Spanish",
      icon: "UtensilsCrossed",
      order: 3,
      isLocked: true,
      unlockLevel: 5,
    });

    console.log("Created tracks");

    // Seed Lessons
    const greetingsQuestions: Question[] = [
      {
        type: "multiple_choice",
        question: "How do you say 'Hello' in Spanish?",
        options: ["Hola", "Adiós", "Gracias", "Por favor"],
        correctAnswer: "Hola",
        vocabulary: [{ word: "Hola", translation: "Hello" }],
      },
      {
        type: "fill_in_blank",
        question: "Complete: '_____ días' (Good day)",
        correctAnswer: "Buenos",
        vocabulary: [
          {
            word: "Buenos días",
            translation: "Good day",
            examplePhrase: "Buenos días, ¿cómo estás?",
          },
        ],
      },
    ];

    await storage.createLesson({
      trackId: basicsTrack.id,
      title: "Greetings",
      description: "Learn how to say hello and goodbye",
      difficulty: "Easy",
      xpReward: 10,
      order: 1,
      questions: greetingsQuestions,
    });

    await storage.createLesson({
      trackId: basicsTrack.id,
      title: "Numbers 1-10",
      description: "Count from one to ten",
      difficulty: "Easy",
      xpReward: 10,
      order: 2,
      questions: [
        {
          type: "flashcard",
          question: "What is 'Uno' in English?",
          correctAnswer: "One",
          vocabulary: [{ word: "Uno", translation: "One" }],
        },
      ],
    });

    console.log("Created lessons");

    // Seed Badges
    await storage.createBadge({
      name: "First Step",
      description: "Complete your first lesson",
      icon: "Star",
      criteria: "complete_first_lesson",
    });

    await storage.createBadge({
      name: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: "Flame",
      criteria: "7_day_streak",
    });

    console.log("Created badges");

    return { message: "Database seeded successfully" };
  } catch (error: any) {
    console.error("Seed error:", error);
    throw error;
  }
}
