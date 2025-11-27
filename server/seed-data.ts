/**
 * Hausa Language Learning Curriculum Seed Data
 * 10 Comprehensive Modules with Lessons, Topics, and Gamification
 */

export const HAUSA_CURRICULUM = [
  {
    name: "Alphabet & Pronunciation",
    description: "Master Hausa script basics, special letters, tones, and pronunciation fundamentals",
    language: "Hausa",
    icon: "BookOpen",
    order: 0,
    lessons: [
      {
        title: "Boko Script Basics",
        description: "Introduction to Latin-based alphabet with Hausa diacritics",
        difficulty: "Easy",
        xpReward: 100,
        questions: [
          {
            type: "multiple_choice",
            question: "Which letter represents an implosive 'd' sound in Hausa?",
            options: ["d", "ɗ", "ð", "đ"],
            correctAnswer: "ɗ",
            vocabulary: [
              { word: "ɗ", translation: "Implosive d", pronunciation: "duh" },
            ],
          },
          {
            type: "fill_in_blank",
            question: "The letter ____ is used for the implosive 'b' sound",
            correctAnswer: "ɓ",
            vocabulary: [
              { word: "ɓ", translation: "Implosive b", pronunciation: "buh" },
            ],
          },
        ],
      },
      {
        title: "Special Letters (ɗ, ƙ, ɓ)",
        description: "Learn Hausa-specific consonants with implosive sounds",
        difficulty: "Easy",
        xpReward: 100,
        questions: [
          {
            type: "multiple_choice",
            question: "What sound does 'ƙ' represent?",
            options: ["Hard k", "Implosive k", "Soft k", "No sound"],
            correctAnswer: "Implosive k",
            vocabulary: [
              { word: "ƙ", translation: "Implosive k", pronunciation: "kuh" },
            ],
          },
        ],
      },
      {
        title: "Tones & Pitch",
        description: "Understand high and low tones in Hausa speech",
        difficulty: "Medium",
        xpReward: 120,
        questions: [
          {
            type: "fill_in_blank",
            question: "Mariam? with a high pitch means ____",
            correctAnswer: "Are you Mariam?",
            audioUrl: "https://example.com/mariam-high.mp3",
            tonePattern: "high",
          },
        ],
      },
      {
        title: "Common Sounds Practice",
        description: "Practice pronunciation of common Hausa sounds",
        difficulty: "Easy",
        xpReward: 110,
        questions: [
          {
            type: "flashcard",
            question: "Pronounce: Ina kwana",
            correctAnswer: "Good morning",
            audioUrl: "https://example.com/ina-kwana.mp3",
            pronunciation: "ee-nah kwah-nah",
          },
        ],
      },
      {
        title: "Quiz: Pronounce Words",
        description: "Test your pronunciation with recorded feedback",
        difficulty: "Medium",
        xpReward: 150,
        questions: [
          {
            type: "multiple_choice",
            question: "Match the pronunciation to the word: 'Sannu'",
            options: ["Hello (formal)", "Thank you", "Goodbye", "Please"],
            correctAnswer: "Hello (formal)",
            audioUrl: "https://example.com/sannu.mp3",
          },
        ],
      },
    ],
  },
  {
    name: "Greetings & Introductions",
    description: "Master formal and informal greetings for all social situations",
    language: "Hausa",
    icon: "HandWave",
    order: 1,
    lessons: [
      {
        title: "Informal Greetings",
        description: "Learn casual daily greetings",
        difficulty: "Easy",
        xpReward: 120,
        questions: [
          {
            type: "multiple_choice",
            question: "How do you say 'How are you?' informally in Hausa?",
            options: ["Sannu", "Ina kwana", "Yaya kake", "Lafiya kalau"],
            correctAnswer: "Yaya kake",
            vocabulary: [
              { word: "Yaya kake", translation: "How are you? (male)", pronunciation: "yah-yah kah-keh" },
            ],
          },
          {
            type: "fill_in_blank",
            question: "____ is 'Good morning' in Hausa",
            correctAnswer: "Ina kwana",
            vocabulary: [
              { word: "Ina kwana", translation: "Good morning", pronunciation: "ee-nah kwah-nah" },
            ],
          },
        ],
      },
      {
        title: "Formal & Group Greetings",
        description: "Formal greetings and responses for respectful encounters",
        difficulty: "Easy",
        xpReward: 130,
        questions: [
          {
            type: "multiple_choice",
            question: "What is a formal Hausa greeting?",
            options: ["Mariam?", "Sannu", "Yaya kake", "Ina kwana"],
            correctAnswer: "Sannu",
            vocabulary: [
              { word: "Sannu", translation: "Hello (formal)", pronunciation: "sahn-noo" },
            ],
          },
        ],
      },
      {
        title: "Responses & Endings",
        description: "Learn appropriate responses and how to end conversations politely",
        difficulty: "Easy",
        xpReward: 130,
        questions: [
          {
            type: "fill_in_blank",
            question: "When someone greets you, you respond: ____",
            correctAnswer: "Lafiya kalau",
            vocabulary: [
              { word: "Lafiya kalau", translation: "Fine, and you?", pronunciation: "lah-fee-yah kah-lau" },
            ],
          },
        ],
      },
      {
        title: "Situational Greetings",
        description: "Greetings for special occasions and situations",
        difficulty: "Medium",
        xpReward: 150,
        questions: [
          {
            type: "multiple_choice",
            question: "What do you say to someone who has just delivered a baby?",
            options: ["Ya jiki?", "Ta sauka lafiya?", "Allah ya ji kan shi", "Sai anjima"],
            correctAnswer: "Ta sauka lafiya?",
            vocabulary: [
              { word: "Ta sauka lafiya?", translation: "Did she come well? (Birth greeting)", pronunciation: "tah sah-oo-kah lah-fee-yah" },
            ],
          },
        ],
      },
      {
        title: "Politeness Phrases",
        description: "Essential polite expressions in Hausa",
        difficulty: "Easy",
        xpReward: 120,
        questions: [
          {
            type: "fill_in_blank",
            question: "To wish someone well, you say: ____",
            correctAnswer: "Allah ya taimaka",
            vocabulary: [
              { word: "Allah ya taimaka", translation: "May Allah help you", pronunciation: "ah-lah yah tie-mah-kah" },
            ],
          },
        ],
      },
      {
        title: "Dialogue Practice",
        description: "Practice complete greeting conversations",
        difficulty: "Medium",
        xpReward: 160,
        questions: [
          {
            type: "fill_in_blank",
            question: "A: Sannu, B: ____",
            correctAnswer: "Sannu da zurwa",
            vocabulary: [
              { word: "Sannu da zurwa", translation: "Hello to you too", pronunciation: "sahn-noo dah zoo-wah" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Numbers & Time",
    description: "Learn to count, tell time, and understand temporal concepts",
    language: "Hausa",
    icon: "Clock",
    order: 2,
    lessons: [
      {
        title: "Numbers 1-100",
        description: "Master counting in Hausa from 1 to 100",
        difficulty: "Easy",
        xpReward: 120,
        questions: [
          {
            type: "multiple_choice",
            question: "How do you say 'one' in Hausa?",
            options: ["Guda daya", "Biyu", "Uku", "Hudu"],
            correctAnswer: "Guda daya",
            vocabulary: [
              { word: "Guda daya", translation: "One", pronunciation: "goo-dah die-yah" },
              { word: "Dubu", translation: "One thousand", pronunciation: "doo-boo" },
            ],
          },
          {
            type: "fill_in_blank",
            question: "Five in Hausa is ____",
            correctAnswer: "Biyar",
            vocabulary: [
              { word: "Biyar", translation: "Five", pronunciation: "bee-yahr" },
            ],
          },
        ],
      },
      {
        title: "Telling Time",
        description: "How to ask for and tell the time in Hausa",
        difficulty: "Medium",
        xpReward: 130,
        questions: [
          {
            type: "fill_in_blank",
            question: "To ask 'What time is it?', you say: ____",
            correctAnswer: "Ina lokaci?",
            vocabulary: [
              { word: "Ina lokaci?", translation: "What time is it?", pronunciation: "ee-nah loh-kah-chee" },
            ],
          },
        ],
      },
      {
        title: "Days of the Week",
        description: "Learn the seven days of the week",
        difficulty: "Easy",
        xpReward: 110,
        questions: [
          {
            type: "multiple_choice",
            question: "Which is Monday in Hausa?",
            options: ["Jiya", "Litinin", "Talata", "Laraba"],
            correctAnswer: "Litinin",
            vocabulary: [
              { word: "Litinin", translation: "Monday", pronunciation: "lee-tee-neen" },
              { word: "Talata", translation: "Tuesday", pronunciation: "tah-lah-tah" },
            ],
          },
        ],
      },
      {
        title: "Asking Questions (Numbers/Time)",
        description: "Form questions about quantities and time",
        difficulty: "Medium",
        xpReward: 140,
        questions: [
          {
            type: "fill_in_blank",
            question: "To ask 'How many?', you say: ____",
            correctAnswer: "Guda nawa?",
            vocabulary: [
              { word: "Guda nawa?", translation: "How many?", pronunciation: "goo-dah nah-wah" },
            ],
          },
        ],
      },
      {
        title: "Practice Dialogues",
        description: "Complete conversations using numbers and time",
        difficulty: "Medium",
        xpReward: 150,
        questions: [
          {
            type: "fill_in_blank",
            question: "A: Guda nawa? B: ____",
            correctAnswer: "Guda hudu",
            vocabulary: [
              { word: "Guda hudu", translation: "Four", pronunciation: "goo-dah hoo-doo" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Family & Colors",
    description: "Describe family members and colors in Hausa",
    language: "Hausa",
    icon: "Users",
    order: 3,
    lessons: [
      {
        title: "Family Members",
        description: "Learn terms for family relationships",
        difficulty: "Easy",
        xpReward: 130,
        questions: [
          {
            type: "multiple_choice",
            question: "What is 'father' in Hausa?",
            options: ["Mama", "Baba", "Yaya", "Jiya"],
            correctAnswer: "Baba",
            vocabulary: [
              { word: "Baba", translation: "Father", pronunciation: "bah-bah" },
              { word: "Mama", translation: "Mother", pronunciation: "mah-mah" },
              { word: "Yaya", translation: "Sibling", pronunciation: "yah-yah" },
            ],
          },
        ],
      },
      {
        title: "Colors Vocabulary",
        description: "Learn the names of common colors",
        difficulty: "Easy",
        xpReward: 120,
        questions: [
          {
            type: "fill_in_blank",
            question: "Red in Hausa is ____",
            correctAnswer: "Ja",
            vocabulary: [
              { word: "Fari", translation: "White", pronunciation: "fah-ree" },
              { word: "Baki", translation: "Black", pronunciation: "bah-kee" },
              { word: "Ja", translation: "Red", pronunciation: "jah" },
              { word: "Kore", translation: "Green", pronunciation: "koh-reh" },
            ],
          },
        ],
      },
      {
        title: "Descriptions with Colors",
        description: "Combine colors with objects and people",
        difficulty: "Medium",
        xpReward: 140,
        questions: [
          {
            type: "fill_in_blank",
            question: "To describe 'a white house', you say: Gida ____",
            correctAnswer: "Fari",
            vocabulary: [
              { word: "Gida", translation: "House", pronunciation: "gee-dah" },
            ],
          },
        ],
      },
      {
        title: "Possessives in Family",
        description: "Use possessive pronouns with family terms",
        difficulty: "Medium",
        xpReward: 130,
        questions: [
          {
            type: "fill_in_blank",
            question: "'My father' in Hausa is: Baba ____",
            correctAnswer: "na",
            vocabulary: [
              { word: "Baba na", translation: "My father", pronunciation: "bah-bah nah" },
            ],
          },
        ],
      },
      {
        title: "Quiz: Describe Family",
        description: "Test your knowledge of family and colors",
        difficulty: "Medium",
        xpReward: 150,
        questions: [
          {
            type: "multiple_choice",
            question: "How would you describe 'my mother is good'?",
            options: ["Mama na gyara", "Mama na kyau", "Mama lafiya", "Mama fari"],
            correctAnswer: "Mama na kyau",
            vocabulary: [
              { word: "Kyau", translation: "Good/nice", pronunciation: "kyau" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Basic Nouns & Gender",
    description: "Master noun structures, gender rules, and plural forms",
    language: "Hausa",
    icon: "Building2",
    order: 4,
    lessons: [
      {
        title: "House Parts",
        description: "Learn vocabulary for parts of a house",
        difficulty: "Easy",
        xpReward: 140,
        questions: [
          {
            type: "multiple_choice",
            question: "What is 'door' in Hausa?",
            options: ["Gida", "Kofa", "Ciki", "Jiya"],
            correctAnswer: "Kofa",
            vocabulary: [
              { word: "Gida", translation: "House", pronunciation: "gee-dah", tone: "high" },
              { word: "Kofa", translation: "Door", pronunciation: "koh-fah" },
              { word: "Kofofi", translation: "Doors (plural)", pronunciation: "koh-foh-fee" },
            ],
          },
        ],
      },
      {
        title: "Body Parts",
        description: "Learn names for human body parts",
        difficulty: "Easy",
        xpReward: 130,
        questions: [
          {
            type: "fill_in_blank",
            question: "'Head' in Hausa is ____",
            correctAnswer: "Kai",
            vocabulary: [
              { word: "Kai", translation: "Head", pronunciation: "kah-ee" },
              { word: "Ido", translation: "Eye", pronunciation: "ee-doh" },
              { word: "Jikuna", translation: "Bodies (plural)", pronunciation: "jee-koo-nah" },
            ],
          },
        ],
      },
      {
        title: "Clothing & Items",
        description: "Vocabulary for clothes and common items",
        difficulty: "Easy",
        xpReward: 130,
        questions: [
          {
            type: "multiple_choice",
            question: "What is 'dress' in Hausa?",
            options: ["Wando", "Riga", "Gida", "Kofa"],
            correctAnswer: "Riga",
            vocabulary: [
              { word: "Riga", translation: "Dress", pronunciation: "ree-gah" },
              { word: "Wando", translation: "Trousers", pronunciation: "wahn-doh" },
              { word: "Riguna", translation: "Dresses (plural)", pronunciation: "ree-goo-nah" },
            ],
          },
        ],
      },
      {
        title: "Gender Rules (ki/ka)",
        description: "Understand masculine and feminine gender markers",
        difficulty: "Medium",
        xpReward: 150,
        questions: [
          {
            type: "fill_in_blank",
            question: "'Ka' is used for addressing a ____ person",
            correctAnswer: "male",
            vocabulary: [
              { word: "Ka", translation: "You (male)", pronunciation: "kah" },
              { word: "Ki", translation: "You (female)", pronunciation: "kee" },
            ],
          },
        ],
      },
      {
        title: "Plurals Basics",
        description: "Form and recognize plural nouns",
        difficulty: "Medium",
        xpReward: 140,
        questions: [
          {
            type: "fill_in_blank",
            question: "The plural of 'kujera' (chair) is ____",
            correctAnswer: "kujeru",
            vocabulary: [
              { word: "Kujera", translation: "Chair", pronunciation: "koo-jeh-rah" },
              { word: "Kujeru", translation: "Chairs", pronunciation: "koo-jeh-roo" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Simple Pronouns & Possession",
    description: "Master pronouns, possessives, and demonstratives",
    language: "Hausa",
    icon: "Lightbulb",
    order: 5,
    lessons: [
      {
        title: "Subject Pronouns",
        description: "Learn personal pronouns as sentence subjects",
        difficulty: "Easy",
        xpReward: 150,
        questions: [
          {
            type: "multiple_choice",
            question: "Which pronoun means 'I' in Hausa?",
            options: ["Kai", "Ni", "Shi", "Ita"],
            correctAnswer: "Ni",
            vocabulary: [
              { word: "Ni", translation: "I", pronunciation: "nee" },
              { word: "Kai", translation: "You (male)", pronunciation: "kah-ee" },
              { word: "Ke", translation: "You (female)", pronunciation: "keh" },
              { word: "Shi", translation: "He", pronunciation: "shee" },
              { word: "Ita", translation: "She", pronunciation: "ee-tah" },
            ],
          },
        ],
      },
      {
        title: "Possessive Pronouns",
        description: "Express ownership with possessive pronouns",
        difficulty: "Medium",
        xpReward: 150,
        questions: [
          {
            type: "fill_in_blank",
            question: "'Mine' in Hausa is ____",
            correctAnswer: "Nawa",
            vocabulary: [
              { word: "Nawa", translation: "Mine", pronunciation: "nah-wah" },
              { word: "Naka", translation: "Yours (male)", pronunciation: "nah-kah" },
              { word: "Naki", translation: "Yours (female)", pronunciation: "nah-kee" },
              { word: "Nashi", translation: "His", pronunciation: "nah-shee" },
              { word: "Nata", translation: "Hers", pronunciation: "nah-tah" },
            ],
          },
        ],
      },
      {
        title: "Reflexive Pronouns",
        description: "Use reflexive forms for emphasis or self-reference",
        difficulty: "Medium",
        xpReward: 140,
        questions: [
          {
            type: "fill_in_blank",
            question: "'Myself' in Hausa is ____",
            correctAnswer: "Kaina",
            vocabulary: [
              { word: "Kaina", translation: "Myself", pronunciation: "kah-ee-nah" },
              { word: "Kanka", translation: "Yourself (male)", pronunciation: "kahn-kah" },
              { word: "Kanta", translation: "Herself", pronunciation: "kahn-tah" },
            ],
          },
        ],
      },
      {
        title: "Demonstratives (This/That)",
        description: "Point out specific items with this and that",
        difficulty: "Easy",
        xpReward: 130,
        questions: [
          {
            type: "multiple_choice",
            question: "How do you say 'this' in Hausa?",
            options: ["Wancan", "Wannan", "Wace", "Waye"],
            correctAnswer: "Wannan",
            vocabulary: [
              { word: "Wannan", translation: "This", pronunciation: "wahn-nahn" },
              { word: "Wancan", translation: "That", pronunciation: "wahn-chahn" },
            ],
          },
        ],
      },
      {
        title: "Interrogatives (Who/What/Where)",
        description: "Ask questions with interrogative pronouns",
        difficulty: "Medium",
        xpReward: 150,
        questions: [
          {
            type: "fill_in_blank",
            question: "To ask 'Who?' (male), you say: ____",
            correctAnswer: "Waye",
            vocabulary: [
              { word: "Waye", translation: "Who (male)", pronunciation: "wah-yeh" },
              { word: "Wace", translation: "Who (female)", pronunciation: "wah-cheh" },
              { word: "Me", translation: "What", pronunciation: "meh" },
              { word: "Ina", translation: "Where", pronunciation: "ee-nah" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Daily Routines",
    description: "Describe everyday activities and present tense verbs",
    language: "Hausa",
    icon: "Activity",
    order: 6,
    lessons: [
      {
        title: "Routine Verbs",
        description: "Essential action verbs for daily activities",
        difficulty: "Easy",
        xpReward: 160,
        questions: [
          {
            type: "fill_in_blank",
            question: "'To wash' in Hausa continuous form is: Ina ____",
            correctAnswer: "wankewanke",
            vocabulary: [
              { word: "Ina wankewanke", translation: "Washing dishes", pronunciation: "ee-nah wahn-keh-wahn-keh" },
              { word: "Ina shara", translation: "Sweeping", pronunciation: "ee-nah shah-rah" },
              { word: "Ina barci", translation: "Sleeping", pronunciation: "ee-nah bahr-chee" },
            ],
          },
        ],
      },
      {
        title: "Present Tense (Ina...)",
        description: "Form present continuous tense with Ina",
        difficulty: "Medium",
        xpReward: 160,
        questions: [
          {
            type: "multiple_choice",
            question: "'I am sitting' in Hausa is:",
            options: ["Ina tseua", "Ina zaune", "Ina cin", "Ina barci"],
            correctAnswer: "Ina zaune",
            vocabulary: [
              { word: "Ina zaune", translation: "I am sitting", pronunciation: "ee-nah zah-oo-neh" },
              { word: "Ina cin abinci", translation: "I am eating", pronunciation: "ee-nah cheen ah-bee-nchee" },
            ],
          },
        ],
      },
      {
        title: "Basic Sentences",
        description: "Construct simple sentences about routines",
        difficulty: "Easy",
        xpReward: 140,
        questions: [
          {
            type: "fill_in_blank",
            question: "Complete: Ni ina ____ (bathing)",
            correctAnswer: "wanka",
            vocabulary: [
              { word: "Ina wanka", translation: "I am bathing", pronunciation: "ee-nah wahn-kah" },
            ],
          },
        ],
      },
      {
        title: "Questions in Routines",
        description: "Ask about daily activities",
        difficulty: "Medium",
        xpReward: 150,
        questions: [
          {
            type: "fill_in_blank",
            question: "To ask someone what they're doing, you say: Me ke ____?",
            correctAnswer: "yi",
            vocabulary: [
              { word: "Me ke yi?", translation: "What are you doing?", pronunciation: "meh keh yee" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Food & Shopping Basics",
    description: "Shop at markets and discuss food and prices",
    language: "Hausa",
    icon: "ShoppingBag",
    order: 7,
    lessons: [
      {
        title: "Food Nouns",
        description: "Essential food vocabulary",
        difficulty: "Easy",
        xpReward: 170,
        questions: [
          {
            type: "multiple_choice",
            question: "What is 'rice' in Hausa?",
            options: ["Nama", "Shinkafa", "Ruwa", "Gida"],
            correctAnswer: "Shinkafa",
            vocabulary: [
              { word: "Shinkafa", translation: "Rice", pronunciation: "sheen-kah-fah" },
              { word: "Nama", translation: "Meat", pronunciation: "nah-mah" },
              { word: "Namomi", translation: "Meats (plural)", pronunciation: "nah-moh-mee" },
              { word: "Ruwa", translation: "Water", pronunciation: "roo-wah" },
            ],
          },
        ],
      },
      {
        title: "Market Greetings & Questions",
        description: "Market etiquette and asking questions about items",
        difficulty: "Easy",
        xpReward: 160,
        questions: [
          {
            type: "fill_in_blank",
            question: "To ask 'How many?', you say: ____",
            correctAnswer: "Guda nawa?",
            vocabulary: [
              { word: "Guda nawa?", translation: "How many?", pronunciation: "goo-dah nah-wah" },
              { word: "Nawane?", translation: "How much?", pronunciation: "nah-wah-neh" },
            ],
          },
        ],
      },
      {
        title: "Bargaining Phrases",
        description: "Negotiate prices at the market",
        difficulty: "Medium",
        xpReward: 170,
        questions: [
          {
            type: "fill_in_blank",
            question: "To ask 'reduce the price', you say: ____",
            correctAnswer: "A rege mana",
            vocabulary: [
              { word: "A rege mana", translation: "Reduce the price (for me)", pronunciation: "ah reh-geh mah-nah" },
            ],
          },
        ],
      },
      {
        title: "Quantities & Prices",
        description: "Specify amounts and discuss costs",
        difficulty: "Medium",
        xpReward: 160,
        questions: [
          {
            type: "multiple_choice",
            question: "To ask 'How much is this?', you say:",
            options: ["Guda nawa?", "Nawane?", "Nawa kiye?", "Me ce?"],
            correctAnswer: "Nawane?",
            vocabulary: [
              { word: "Nawane?", translation: "How much? / What's the price?", pronunciation: "nah-wah-neh" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Directions & Places",
    description: "Navigate and ask for directions confidently",
    language: "Hausa",
    icon: "MapPin",
    order: 8,
    lessons: [
      {
        title: "Place Nouns",
        description: "Learn common place names and locations",
        difficulty: "Easy",
        xpReward: 140,
        questions: [
          {
            type: "multiple_choice",
            question: "What is 'market' in Hausa?",
            options: ["Gida", "Kasuwa", "Jiya", "Kofa"],
            correctAnswer: "Kasuwa",
            vocabulary: [
              { word: "Kasuwa", translation: "Market", pronunciation: "kah-soo-wah" },
              { word: "Gida", translation: "House", pronunciation: "gee-dah" },
              { word: "Aiki", translation: "Work/Office", pronunciation: "ah-ee-kee" },
            ],
          },
        ],
      },
      {
        title: "Asking Directions",
        description: "Request and understand directions",
        difficulty: "Medium",
        xpReward: 150,
        questions: [
          {
            type: "fill_in_blank",
            question: "To ask 'Where is the house?', you say: ____",
            correctAnswer: "Ina gidan?",
            vocabulary: [
              { word: "Ina gidan?", translation: "Where is the house?", pronunciation: "ee-nah gee-dahn" },
            ],
          },
        ],
      },
      {
        title: "Basic Commands",
        description: "Give and understand simple directions",
        difficulty: "Easy",
        xpReward: 140,
        questions: [
          {
            type: "fill_in_blank",
            question: "To say 'Go right', you say: ____",
            correctAnswer: "Je dama",
            vocabulary: [
              { word: "Je dama", translation: "Go right", pronunciation: "jeh dah-mah" },
              { word: "Je hagu", translation: "Go left", pronunciation: "jeh hah-goo" },
              { word: "Je gaba", translation: "Go forward", pronunciation: "jeh gah-bah" },
            ],
          },
        ],
      },
    ],
  },
  {
    name: "Weather & Seasons",
    description: "Discuss weather conditions and seasonal changes",
    language: "Hausa",
    icon: "Cloud",
    order: 9,
    lessons: [
      {
        title: "Weather Phrases",
        description: "Common expressions for different weather",
        difficulty: "Easy",
        xpReward: 130,
        questions: [
          {
            type: "fill_in_blank",
            question: "To say 'It is cold', you say: ____",
            correctAnswer: "Ya sanyi",
            vocabulary: [
              { word: "Ya sanyi", translation: "It is cold", pronunciation: "yah sahn-yee" },
              { word: "Ya zafi", translation: "It is hot", pronunciation: "yah zah-fee" },
              { word: "Ya ruwan sama", translation: "It is rainy", pronunciation: "yah roo-wahn sah-mah" },
            ],
          },
        ],
      },
      {
        title: "Seasons Vocabulary",
        description: "Learn the four seasons in Hausa",
        difficulty: "Easy",
        xpReward: 120,
        questions: [
          {
            type: "multiple_choice",
            question: "What is the dry season called in Hausa?",
            options: ["Lokacin ruwa", "Lokacin sanyi", "Lokacin zafi", "Damina"],
            correctAnswer: "Lokacin sanyi",
            vocabulary: [
              { word: "Lokacin sanyi", translation: "Dry/cold season", pronunciation: "loh-kah-cheen sahn-yee" },
              { word: "Lokacin ruwa", translation: "Rainy season", pronunciation: "loh-kah-cheen roo-wah" },
            ],
          },
        ],
      },
      {
        title: "Weather Descriptions",
        description: "Describe weather conditions in detail",
        difficulty: "Medium",
        xpReward: 130,
        questions: [
          {
            type: "fill_in_blank",
            question: "The weather today is ____ (hot)",
            correctAnswer: "ya zafi",
            vocabulary: [
              { word: "Yau", translation: "Today", pronunciation: "yau" },
            ],
          },
        ],
      },
    ],
  },
];
