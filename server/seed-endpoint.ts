import { storage } from "./storage";
import { HAUSA_CURRICULUM } from "./seed-data";

export async function seedDatabase() {
  try {
    console.log("Starting database seed...");

    // Check if already seeded
    const existingTracks = await storage.getAllTracks();
    if (existingTracks.length > 0) {
      console.log("Database already seeded");
      return { message: "Database already contains data" };
    }

    const results = { tracksCreated: 0, lessonsCreated: 0, badgesCreated: 0 };

    // Seed Hausa curriculum
    for (const moduleData of HAUSA_CURRICULUM) {
      // Create track
      const track = await storage.createTrack({
        name: moduleData.name,
        description: moduleData.description,
        language: moduleData.language,
        icon: moduleData.icon,
        order: moduleData.order,
        isLocked: false,
        unlockLevel: 1,
      });

      results.tracksCreated++;
      console.log(`Created track: ${moduleData.name}`);

      // Create lessons for this track
      for (let lessonIdx = 0; lessonIdx < moduleData.lessons.length; lessonIdx++) {
        const lessonData = moduleData.lessons[lessonIdx];
        await storage.createLesson({
          trackId: track.id,
          title: lessonData.title,
          description: lessonData.description,
          language: moduleData.language,
          difficulty: lessonData.difficulty,
          xpReward: lessonData.xpReward,
          order: lessonIdx,
          questions: lessonData.questions,
        });

        results.lessonsCreated++;
      }
    }

    console.log("Created lessons");

    // Seed Badges
    await storage.createBadge({
      name: "Sound Starter",
      description: "Complete Alphabet & Pronunciation",
      icon: "MiaretIcon",
      criteria: "complete_module_1",
    });

    await storage.createBadge({
      name: "Greeter",
      description: "Master greetings and introductions",
      icon: "HandWave",
      criteria: "complete_module_2",
    });

    await storage.createBadge({
      name: "Counter",
      description: "Learn numbers and time",
      icon: "Clock",
      criteria: "complete_module_3",
    });

    await storage.createBadge({
      name: "Week Warrior",
      description: "Maintain a 7-day streak",
      icon: "Flame",
      criteria: "7_day_streak",
    });

    results.badgesCreated = 4;
    console.log("Created badges");

    return {
      message: "Database seeded successfully with Hausa curriculum",
      ...results,
    };
  } catch (error: any) {
    console.error("Seed error:", error);
    throw error;
  }
}
