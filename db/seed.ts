import { db } from "./index";
import { tracks, lessons, badges } from "@shared/schema";
import type { Question } from "@shared/schema";

async function seed() {
  console.log("Seeding database...");

  // Seed Tracks
  const [basicsTrack, travelTrack, foodTrack] = await db
    .insert(tracks)
    .values([
      {
        name: "Basics",
        description: "Learn essential words and phrases",
        language: "Spanish",
        icon: "Book",
        order: 1,
        isLocked: false,
        unlockLevel: 1,
      },
      {
        name: "Travel",
        description: "Phrases for getting around",
        language: "Spanish",
        icon: "Plane",
        order: 2,
        isLocked: false,
        unlockLevel: 3,
      },
      {
        name: "Food & Dining",
        description: "Order food and discuss meals",
        language: "Spanish",
        icon: "UtensilsCrossed",
        order: 3,
        isLocked: true,
        unlockLevel: 5,
      },
    ])
    .returning();

  console.log("Created tracks:", basicsTrack, travelTrack, foodTrack);

  // Seed Lessons for Basics Track
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
    {
      type: "multiple_choice",
      question: "What does '¿Cómo estás?' mean?",
      options: ["How are you?", "What's your name?", "Goodbye", "Thank you"],
      correctAnswer: "How are you?",
      vocabulary: [
        {
          word: "¿Cómo estás?",
          translation: "How are you?",
        },
      ],
    },
  ];

  const numbersQuestions: Question[] = [
    {
      type: "flashcard",
      question: "What is 'Uno' in English?",
      correctAnswer: "One",
      vocabulary: [{ word: "Uno", translation: "One" }],
    },
    {
      type: "flashcard",
      question: "What is 'Dos' in English?",
      correctAnswer: "Two",
      vocabulary: [{ word: "Dos", translation: "Two" }],
    },
    {
      type: "multiple_choice",
      question: "How do you say 'Five' in Spanish?",
      options: ["Tres", "Cuatro", "Cinco", "Seis"],
      correctAnswer: "Cinco",
      vocabulary: [{ word: "Cinco", translation: "Five" }],
    },
  ];

  const phrasesQuestions: Question[] = [
    {
      type: "multiple_choice",
      question: "How do you say 'Thank you' in Spanish?",
      options: ["Gracias", "Por favor", "De nada", "Perdón"],
      correctAnswer: "Gracias",
      vocabulary: [
        {
          word: "Gracias",
          translation: "Thank you",
          examplePhrase: "Muchas gracias por tu ayuda.",
        },
      ],
    },
    {
      type: "fill_in_blank",
      question: "Complete: '_____ favor' (Please)",
      correctAnswer: "Por",
      vocabulary: [
        {
          word: "Por favor",
          translation: "Please",
          examplePhrase: "¿Puedes ayudarme, por favor?",
        },
      ],
    },
  ];

  const colorsQuestions: Question[] = [
    {
      type: "multiple_choice",
      question: "What color is 'Rojo'?",
      options: ["Blue", "Red", "Green", "Yellow"],
      correctAnswer: "Red",
      vocabulary: [{ word: "Rojo", translation: "Red" }],
    },
    {
      type: "multiple_choice",
      question: "What color is 'Azul'?",
      options: ["Blue", "Red", "Green", "Yellow"],
      correctAnswer: "Blue",
      vocabulary: [{ word: "Azul", translation: "Blue" }],
    },
    {
      type: "flashcard",
      question: "What is 'Verde' in English?",
      correctAnswer: "Green",
      vocabulary: [{ word: "Verde", translation: "Green" }],
    },
  ];

  await db.insert(lessons).values([
    {
      trackId: basicsTrack.id,
      title: "Greetings",
      description: "Learn how to say hello and goodbye",
      difficulty: "Easy",
      xpReward: 10,
      order: 1,
      questions: greetingsQuestions,
    },
    {
      trackId: basicsTrack.id,
      title: "Numbers 1-10",
      description: "Count from one to ten",
      difficulty: "Easy",
      xpReward: 10,
      order: 2,
      questions: numbersQuestions,
    },
    {
      trackId: basicsTrack.id,
      title: "Common Phrases",
      description: "Essential expressions for daily use",
      difficulty: "Easy",
      xpReward: 15,
      order: 3,
      questions: phrasesQuestions,
    },
    {
      trackId: basicsTrack.id,
      title: "Colors",
      description: "Learn basic color vocabulary",
      difficulty: "Medium",
      xpReward: 15,
      order: 4,
      questions: colorsQuestions,
    },
    {
      trackId: basicsTrack.id,
      title: "Days of the Week",
      description: "Master the days of the week",
      difficulty: "Medium",
      xpReward: 15,
      order: 5,
      questions: [
        {
          type: "flashcard",
          question: "What is 'Lunes' in English?",
          correctAnswer: "Monday",
          vocabulary: [{ word: "Lunes", translation: "Monday" }],
        },
      ],
    },
  ]);

  console.log("Created lessons for Basics track");

  // Seed Badges
  await db.insert(badges).values([
    {
      name: "First Step",
      description: "Complete your first lesson",
      icon: "Star",
      criteria: "complete_first_lesson",
    },
    {
      name: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: "Flame",
      criteria: "7_day_streak",
    },
    {
      name: "Century Club",
      description: "Earn 100 XP",
      icon: "Trophy",
      criteria: "100_xp",
    },
    {
      name: "Contributor",
      description: "Submit your first lesson",
      icon: "Award",
      criteria: "first_contribution",
    },
    {
      name: "Polyglot",
      description: "Complete all lessons in a track",
      icon: "BookOpen",
      criteria: "complete_track",
    },
  ]);

  console.log("Created badges");
  console.log("Seeding complete!");
}

seed()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
