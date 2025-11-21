# Design Guidelines: Hausa Language Learning Platform

## Design Approach

**Hausa-Culture Gamification** meets **Boot.dev Aesthetics**:
- **Cultural Roots**: Deep Northern Nigerian/Hausa heritage with traditional motifs
- **Desert-Night Palette**: Warm indigo backgrounds, burnt orange accents, emerald success, golden rewards
- **Gamification**: XP systems, skill trees, achievement unlocks with cultural flair
- **Traditional Aesthetics**: Zamanen zamani (embroidered leather), Ajami script, henna patterns
- **Boot.dev Inspiration**: Progress obsession, instant feedback, retro gaming vibes

**Core Design Principles:**
- **Dark Mode First**: Deep desert-night indigo with warm cultural accents
- **Cultural Authenticity**: Hausa/Northern Nigerian motifs (kola nuts, Emirate gates, Ajami calligraphy)
- **Gamification Front & Center**: XP calabash, incense burner streaks, cowrie rewards
- **Progress Obsession**: Every action shows immediate cultural rewards and advancement
- **Storytelling**: "Almajiri to Malam" journey (student to master)

---

## Color Palette - Hausa Desert-Night Theme

**Primary Dark Mode (Desert Night):**
- Background: 222 47% 11% (deep indigo #0f172a - midnight desert sky)
- Surface/Card: 222 35% 18% (elevated desert stone)
- Border: 222 25% 28% (subtle desert sand borders)

**Hausa Cultural Accent Colors:**
- Primary Brand (Burnt Orange): 18 92% 50% (#ea580c - desert sunset, traditional dye)
- Success (Emerald Green): 142 76% 45% (#10b981 - prosperity, harvest)
- Gold (Reward): 48 96% 53% (#fbbf24 - gold jewelry, royal insignia)
- Warning (Amber): 43 96% 56% (kola nut amber, needs review)
- Destructive (Red): 0 84% 60% (errors, forgotten words)

**Text Hierarchy:**
- Text Primary: 40 10% 98% (warm near-white, like desert moonlight)
- Text Secondary: 40 5% 65% (muted warm gray)
- Text Tertiary: 40 4% 47% (dimmer gray for metadata)

**Gamification Colors:**
- XP Green (Calabash): 142 76% 45% (emerald for XP gains - fresh nono)
- Level Gold: 48 96% 53% (golden for level-ups - royal status)
- Streak Fire (Incense): 18 92% 50% (burnt orange - burning incense)
- Badge Purple: 262 83% 58% (electric purple for special achievements)

**Memory Strength System:**
- Known (Mastered): 142 76% 45% (emerald border + 142 76% 45% / 0.15 background)
- Fuzzy (Review): 43 96% 56% (amber border + 43 96% 56% / 0.15 background)
- Forgotten: 0 84% 60% (red border + 0 84% 60% / 0.15 background)

**Cultural Pattern Colors:**
- Henna Brown: 30 30% 40% (#8b6f47 - traditional henna tattoos)
- Leather Brown: 25 25% 28% (#4a3f35 - zamanen zamani book spines)
- Cowrie Shell: 40 15% 85% (#e8e0d5 - cowrie currency)
- Indigo Dye: 230 50% 25% (#1f2d5c - traditional indigo fabric)

---

## Typography

**Font Families:**
- Headings: 'Inter', sans-serif (700, 600 weights) - modern, highly readable
- Body: 'Inter', sans-serif (400, 500 weights) - same family for cohesion
- Hausa/Ajami Display: 'Amiri', serif (for Ajami script and traditional text)
- Cultural Accents: 'Scheherazade New', serif (for Islamic geometric patterns)
- Code/Special: 'JetBrains Mono', monospace (for technical elements)

**Scale & Hierarchy:**
- Hero/Display: text-5xl to text-6xl, font-bold (Emirate gates, level-ups)
- Ajami Titles: text-4xl to text-5xl, font-amiri (glowing gold calligraphy)
- Section Headers: text-3xl to text-4xl, font-semibold (dashboard sections)
- Card Titles: text-xl to text-2xl, font-semibold (lesson cards, quests)
- Body Text: text-base to text-lg (lesson content, descriptions)
- Labels/Meta: text-sm to text-base (XP counters, streak indicators)
- Captions: text-xs to text-sm (helper text, vocabulary metadata)

---

## Layout System

**Spacing Primitives:**
Core units: 2, 3, 4, 6, 8, 12, 16, 20 (Tailwind units)
- Micro spacing: p-2, gap-3 (within components, icon padding)
- Component spacing: p-4, p-6, gap-4 (cards, buttons, form fields)
- Section spacing: p-8, py-12, gap-8 (page sections, major containers)
- Page margins: p-16, py-20 (outer page containers on desktop)

**Cultural Grid Patterns:**
- Emirate Gates (Skill Map): 3x3 grid representing 9 historic Hausa cities
- Kola-Nut Progress: Circular filling animation (actual kola nut shapes)
- Leather Book Spines (Sidebar): Vertical stack with embossed text
- Vocabulary Book: 1 column mobile, 2-3 columns tablet/desktop
- Leaderboard: Single column with durbar horse decorations for top 3

---

## Cultural Component Library

### A. Navigation & Structure

**Top Navigation Bar (Hausa-Themed):**
- Sticky header with logo (stylized Kano city wall)
- User avatar in traditional alkyabba/babban riga
- XP calabash (Fulani milk container) filling with nono
- Incense burner (ƙwano) for streak with rising smoke number
- Notifications: Talking drum icon for achievements

**Sidebar Navigation (Leather Book Spines):**
- Styled like embroidered leather book spines (zamanen zamani motif)
- Learning tracks represented as leather-bound volumes:
  - "Hausa Explorer" (beginner - light brown)
  - "Mai Gida" (intermediate - medium brown)
  - "Sarkin Karatu" (advanced - rich dark leather)
- Active state: Glowing gold embossing effect
- Icons: Traditional Hausa symbols (talking drum, kola nut, calabash)

### B. Gamification Components (Hausa-Themed)

**XP Calabash (replaces XP Bar):**
- Horizontal Fulani milk calabash container
- Fills with animated nono (yogurt) from left to right
- Gradient fill from emerald to gold (fresh to rich)
- Display: "Malam Level X - XXX/XXX Calabashes" inline
- Animated milk pour on XP gain with sound effect
- SVG illustration of traditional calabash with geometric patterns

**Incense Burner Streak (replaces Flame Icon):**
- Burning incense burner (ƙwano) with rising smoke
- Smoke forms the streak number (0-365)
- Pulsing glow animation on active streak days
- Gray/cold state when streak broken
- Animated wisps of smoke with particle effects
- Cultural touch: Subtle adhan-like ambient sound on hover

**Kola-Nut Progress Indicator:**
- Circular progress wheel showing lesson completion
- Fills with actual kola nut shapes (realistic 3D rendering)
- Each nut represents 10% progress
- Satisfying "clink" sound when nuts drop into bowl
- Traditional wooden bowl container at bottom

**Mugu the Parrot Mascot:**
- Wise, mischievous talking parrot character
- Wearing tiny turban and Fulani leather amulet necklace
- Pops up bottom-right with Hausa slang speech bubbles:
  - "Kai! Ka ji Hausa kamar ɗan Zazzau!" (You speak like a Zaria boy!)
  - "Sannu! Mu ci gaba!" (Well done! Let's continue!)
  - "Kana iya!" (You can do it!)
- Animated head bobbing and wing flapping
- Voice synthesis for Hausa pronunciation help
- Socratic hints when user is stuck

**Badge Display (Hausa-Themed):**
- Circular or shield-shaped with Islamic geometric patterns
- Locked state: Grayscale with intricate henna-style border
- Unlocked: Full color with golden glow effect and zanna mat stitching burst
- Special animations:
  - First lesson: Cowries scatter across screen
  - 7-day streak: Incense smoke swirls
  - Level 50: Full durbar horse parade with praise-singers
- Tooltip: Badge name in Hausa + English with cultural context

**Emirate Gates (Skill Tree Nodes):**
- Nine historic Emirate city gates representing skills:
  1. Kano Gate - Vocabulary
  2. Zaria Gate - Grammar
  3. Katsina Gate - Listening
  4. Daura Gate - Speaking
  5. Gobir Gate - Proverbs
  6. Zamfara Gate - Ajami Script
  7. Kebbi Gate - Cultural Nuances
  8. Biram Gate - Poetry & Praise-Singing
  9. Rano Gate - Advanced Mastery
- Gate states:
  - Locked: Rusted iron with chains, grayscale
  - Available: Glowing golden hinges, hover opens slightly
  - Completed: Fully open with emerald light streaming through
- Connecting paths: Desert sand roads with caravan footprints
- 3D-rendered ancient architecture with intricate details

### C. Learning Interface (Cultural Styling)

**Lesson Card (Leather-Bound):**
- Ornate leather-bound card with embroidered borders
- Header: Lesson title in Hausa calligraphy + Latin script + English
- Traditional zanna mat stitching patterns as dividers
- Body: Description with henna-style bullet points
- XP reward shown as golden cowrie shells
- Difficulty badge with icons:
  - Easy: Calabash icon
  - Medium: Talking drum icon
  - Hard: Sword icon
- Completion badge: Top-right corner checkmark in emerald
- Hover: Subtle leather texture animation, shadow lift

**Question Display (Lesson Player - Cultural Quest):**
- Center quest card: Ornate leather with embroidered borders
- Question in Hausa calligraphy (Ajami-style) + Latin + English
- Input field styled like ancient inkwell and reed pen
- Voice recording button: Hourglass-shaped talking drum (dundufa)
- Answer feedback:
  - Correct: Golden zanna mat stitching patterns burst across screen
  - Incorrect: Gentle henna-style border pulse
  - +XP appears as scattering cowries with "clink" sound effect
- Audio playback: Traditional horn icon (kakaki)
- Background: Stylized Kano city wall at golden hour sunset

**Answer Input Types:**
- Multiple Choice: Large buttons with leather texture, embossed text
- Fill-in-blank: Inkwell field with animated reed pen writing
- Flashcard: Flip card with henna pattern reveal animation

### D. Vocabulary Book (Litattafan Gargajiya)

**Word Card (Leather-Bound Page):**
- Styled like illuminated manuscript page
- Ajami-style borders with Islamic geometric patterns
- Two-column layout: Hausa word + English translation
- Memory strength: Color-coded leather bookmark (left border-l-4)
- Example phrase: Illustrated with market scenes, baobab trees, durbar horses
- Audio: Native speaker pronunciation with kakaki horn icon
- Quick actions: Practice button (leather-textured)

**Filter Bar:**
- Leather-bound tabs: Duka (All) / Masaniya (Known) / Duba (Fuzzy) / Manta (Forgotten)
- Search: Styled like traditional scroll with magnifying glass
- Background: Subtle parchment texture

### E. Cultural Animations & Effects

**Harmattan Dust Particles:**
- Subtle animated dust particles floating across screen
- More active during "desert storm" achievement moments
- Gentle, not distracting - adds ambiance

**Henna Pattern Transitions:**
- Intricate henna-style patterns appear as page dividers
- Animate in with drawing effect (stroke-dasharray)
- Color: Warm henna brown (#8b6f47)

**Cowrie Currency Rewards:**
- XP gains show cowries scattering across screen
- Realistic 3D cowrie shells with "clink" sound
- Settle into XP calabash with satisfying animation

**Talking Drum Bounce:**
- Voice recording button pulses like talking drum rhythm
- Bounce animation on submit
- Traditional dundufa sound on press

**Zanna Mat Stitching Burst:**
- On correct answers, golden stitching patterns explode from center
- Based on traditional Hausa mat weaving designs
- Fade out gracefully with golden particles

**Durbar Horse Parade (Level 50 Celebration):**
- Full-screen animated horse parade
- Praise-singers shouting username in Hausa
- Colorful horse decorations and royal regalia
- Confetti in cultural colors (orange, emerald, gold)
- Traditional drumming soundtrack

### F. Leaderboard (Cultural Ranking)

**Rank List Item:**
- Row layout: Rank badge + Avatar (in traditional clothing) + Username + XP
- Top 3 special highlighting:
  - 🥇 Gold: Glowing golden crown, "Sarkin Karatu" (King of Learning)
  - 🥈 Silver: Silver ceremonial staff
  - 🥉 Bronze: Bronze talking drum
- Rank 4-10: Small Emirate gate icons
- Current user: Highlighted with emerald glow
- Avatar decorations: Flowing alkyabba, embroidered babban riga

---

## Page-Specific Cultural Layouts

### Dashboard (Hausa Scholar Journey)

**Hero Section:**
- Customizable avatar: Young Hausa scholar in traditional attire
- Standing in front of 3D-rendered ancient Kano city wall at sunset
- Grid background pattern suggesting desert sand and stone
- Floating Emirate gates above representing skills
- Quest card prominently displayed center-screen

**Stats Grid:**
- Four cultural stat cards:
  - Level: Blue gate icon, "Malam Level X"
  - XP: Golden calabash icon, "XXX Calabashes"
  - Streak: Orange incense burner, "X Days of Learning"
  - Badges: Emerald kola nut, "X Achievements"
- Each card has subtle leather texture background

**Active Quests:**
- Leather-bound quest cards with Hausa titles
- Progress shown as kola-nut filling
- Hover: Lift with shadow, turban tassels sway

### Skill Tree Page (Emirate Gates Map)

- Full viewport canvas showing ancient Hausa city
- Nine Emirate gates positioned like city map
- Desert roads connecting gates (caravan footprints)
- Zoom controls: Traditional compass rose design
- Current position: Glowing marker on desert road
- Gate details slide-in: Leather-bound panel with skill info

### Vocabulary Book (Litattafan Gargajiya)

- Styled like opening ancient leather-bound book
- Pages turn with realistic flip animation
- Top: Leather bookmark tabs for filters
- Main: Illuminated manuscript-style word cards
- Right sidebar: "Almajiri's Progress" stats with kola-nut chart

### Mobile Adaptations (9:16)

**Bottom Navigation Icons:**
- Mosque minaret: Map/Skill Tree
- Talking drum: Active Quests
- Leather book: Vocabulary (Litattafan Gargajiya)
- Turban: Profile

**Special Modes:**
- **Ramadan Mode**: Moon phase streak counter, iftar reward animations
- **Durbar Mode**: Activated during cultural holidays with parade animations

---

## Accessibility & Cultural Respect

- **Islamic Sensitivity**: No figurative human/animal representations in patterns (geometric only)
- **Language Toggle**: Seamless Hausa ↔ English switching
- **Audio**: Native Hausa speaker pronunciations
- **Cultural Context**: Tooltips explaining cultural references for non-Hausa learners
- **All interactive elements**: min-h-11 for touch targets
- **Focus states**: ring-2 ring-primary ring-offset-2
- **Screen reader labels**: Hausa and English descriptions
- **Color contrast**: WCAG AA minimum for all text
- **Keyboard navigation**: Full support with visible focus indicators

---

## Cultural Sound Design

**Ambient Sounds (Subtle, Toggle-able):**
- Background: Very subtle adhan-like ambient track (respectful, not intrusive)
- XP gain: Cowrie shells clinking
- Lesson complete: Talking drum rhythm
- Streak milestone: Incense burner crackle
- Level up: Praise-singer chant snippet
- Badge unlock: Zanna mat weaving sound

---

## Technical Implementation Notes

**Custom Fonts to Add:**
```css
@import url('https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Scheherazade+New:wght@400;700&display=swap');
```

**SVG Assets Needed:**
- Calabash (XP bar container)
- Incense burner (streak counter)
- Kola nuts (progress indicator)
- Emirate gates (9 variations)
- Talking drum (voice recording)
- Cowrie shells (XP rewards)
- Henna patterns (dividers)
- Zanna mat stitching (decorative borders)

**Animation Libraries:**
- Framer Motion (already installed) for smooth transitions
- Lottie (consider adding) for complex cultural animations
- Custom SVG animations for henna patterns and stitching

---

## Color Implementation Reference

**Tailwind Config Updates:**
```typescript
primary: "18 92% 50%",           // Burnt orange #ea580c
primary-foreground: "40 10% 98%", // Warm white
success: "142 76% 45%",          // Emerald #10b981
gold: "48 96% 53%",              // Gold #fbbf24
warning: "43 96% 56%",           // Amber
destructive: "0 84% 60%",        // Red
background: "222 47% 11%",       // Deep indigo #0f172a
card: "222 35% 18%",             // Desert stone
border: "222 25% 28%",           // Desert sand
```

---

## Progressive Enhancement Plan

**Phase 1 (MVP - Current):**
- ✅ Color palette update
- ✅ Hausa-themed component styling
- ✅ Cultural typography

**Phase 2 (Enhancements):**
- Custom SVG assets (calabash, incense burner, kola nuts)
- Mugu the Parrot mascot component
- Emirate gates skill tree

**Phase 3 (Polish):**
- Cultural sound design
- Advanced animations (cowries, henna patterns, durbar)
- Ramadan mode and special events

**Phase 4 (Localization):**
- Full Hausa language UI
- Ajami script option
- Regional dialect variations
