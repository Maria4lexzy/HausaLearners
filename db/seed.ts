import { db } from "./index";
import { tracks, lessons, badges } from "@shared/schema";
import type { Question } from "@shared/schema";

async function seed() {
  console.log("Seeding database with Hausa content...");

  const [basicsTrack, numbersTrack, phrasesTrack] = await db
    .insert(tracks)
    .values([
      {
        name: "Basics & Greetings",
        description: "Learn essential Hausa words and greetings",
        language: "Hausa",
        icon: "Book",
        order: 1,
        isLocked: false,
        unlockLevel: 1,
      },
      {
        name: "Numbers & Counting",
        description: "Learn to count in Hausa",
        language: "Hausa",
        icon: "Hash",
        order: 2,
        isLocked: false,
        unlockLevel: 3,
      },
      {
        name: "Daily Phrases",
        description: "Common expressions for everyday use",
        language: "Hausa",
        icon: "MessageCircle",
        order: 3,
        isLocked: true,
        unlockLevel: 5,
      },
    ])
    .returning();

  console.log("Created tracks:", basicsTrack, numbersTrack, phrasesTrack);

  const greetingsQuestions: Question[] = [
    {
      type: "multiple_choice",
      question: "How do you say 'Hello' in Hausa?",
      options: ["Sannu", "Na gode", "Sai anjima", "Barka"],
      correctAnswer: "Sannu",
      vocabulary: [{ word: "Sannu", translation: "Hello", pronunciation: "sah-noo" }],
    },
    {
      type: "fill_in_blank",
      question: "Complete: '_____ da safe' (Good morning)",
      correctAnswer: "Barka",
      vocabulary: [
        {
          word: "Barka da safe",
          translation: "Good morning",
          pronunciation: "bar-ka da sah-fay",
          examplePhrase: "Barka da safe, yaya lafiya?",
        },
      ],
    },
    {
      type: "multiple_choice",
      question: "What does 'Yaya lafiya?' mean?",
      options: ["How are you?", "What's your name?", "Goodbye", "Thank you"],
      correctAnswer: "How are you?",
      vocabulary: [
        {
          word: "Yaya lafiya?",
          translation: "How are you?",
          pronunciation: "yah-yah lah-fee-yah",
        },
      ],
    },
    {
      type: "multiple_choice",
      question: "How do you respond to 'Yaya lafiya?' when you are fine?",
      options: ["Lafiya lau", "Na gode", "Sannu", "Sai anjima"],
      correctAnswer: "Lafiya lau",
      vocabulary: [
        {
          word: "Lafiya lau",
          translation: "I am fine / Very well",
          pronunciation: "lah-fee-yah lau",
        },
      ],
    },
  ];

  const numbersQuestions: Question[] = [
    {
      type: "flashcard",
      question: "What is 'Ɗaya' in English?",
      correctAnswer: "One",
      vocabulary: [{ word: "Ɗaya", translation: "One", pronunciation: "dah-yah" }],
    },
    {
      type: "flashcard",
      question: "What is 'Biyu' in English?",
      correctAnswer: "Two",
      vocabulary: [{ word: "Biyu", translation: "Two", pronunciation: "bee-yoo" }],
    },
    {
      type: "multiple_choice",
      question: "How do you say 'Five' in Hausa?",
      options: ["Uku", "Huɗu", "Biyar", "Shida"],
      correctAnswer: "Biyar",
      vocabulary: [{ word: "Biyar", translation: "Five", pronunciation: "bee-yar" }],
    },
    {
      type: "multiple_choice",
      question: "What number is 'Goma'?",
      options: ["Eight", "Nine", "Ten", "Eleven"],
      correctAnswer: "Ten",
      vocabulary: [{ word: "Goma", translation: "Ten", pronunciation: "go-mah" }],
    },
  ];

  const phrasesQuestions: Question[] = [
    {
      type: "multiple_choice",
      question: "How do you say 'Thank you' in Hausa?",
      options: ["Na gode", "Sannu", "Barka", "Sai anjima"],
      correctAnswer: "Na gode",
      vocabulary: [
        {
          word: "Na gode",
          translation: "Thank you",
          pronunciation: "nah go-day",
          examplePhrase: "Na gode sosai. (Thank you very much.)",
        },
      ],
    },
    {
      type: "fill_in_blank",
      question: "Complete: 'Don Allah' means _____ in English",
      correctAnswer: "Please",
      vocabulary: [
        {
          word: "Don Allah",
          translation: "Please",
          pronunciation: "don al-lah",
          examplePhrase: "Don Allah, taimaka mini.",
        },
      ],
    },
    {
      type: "multiple_choice",
      question: "What does 'Sai anjima' mean?",
      options: ["See you later", "Good night", "Thank you", "Welcome"],
      correctAnswer: "See you later",
      vocabulary: [
        {
          word: "Sai anjima",
          translation: "See you later / Goodbye",
          pronunciation: "sai an-jee-mah",
        },
      ],
    },
  ];

  await db.insert(lessons).values([
    {
      trackId: basicsTrack.id,
      title: "Greetings",
      description: "Learn how to greet in Hausa",
      difficulty: "Easy",
      xpReward: 10,
      order: 1,
      questions: greetingsQuestions,
    },
    {
      trackId: numbersTrack.id,
      title: "Numbers 1-10",
      description: "Count from one to ten in Hausa",
      difficulty: "Easy",
      xpReward: 10,
      order: 1,
      questions: numbersQuestions,
    },
    {
      trackId: phrasesTrack.id,
      title: "Common Phrases",
      description: "Essential Hausa expressions",
      difficulty: "Easy",
      xpReward: 15,
      order: 1,
      questions: phrasesQuestions,
    },
  ]);

  console.log("Created lessons for all tracks");

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
