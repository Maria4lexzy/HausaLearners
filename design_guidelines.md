# Design Guidelines: Gamified Language Learning Platform

## Design Approach

**Boot.dev-Inspired Dark Mode Aesthetics** with gamified learning elements:
- **Boot.dev**: Developer-focused dark UI, vibrant neon accents, XP systems, skill trees, retro gaming vibes
- **Terminal/Code Aesthetic**: Monospace accents, command-line inspired elements, tech-focused design
- **Duolingo Gamification**: Progress visualization, streak tracking, achievement unlocks
- **Notion Workflows**: Intuitive content creation and contribution systems

**Core Design Principles:**
- **Dark Mode First**: Deep backgrounds with vibrant neon accents (greens, purples, blues)
- **Gamification Front & Center**: XP bars, badges, and streaks as primary UI elements
- **Retro Gaming Vibes**: Pixel-perfect icons, achievement unlocks, level-up celebrations
- **Progress Obsession**: Every action shows immediate XP gain and advancement
- **Developer-Friendly**: Clean code-like interfaces, keyboard shortcuts, power user features

---

## Color Palette - Boot.dev Dark Mode

**Primary Dark Mode (Default):**
- Background: 222 47% 11% (deep dark blue-black, like midnight code editor)
- Surface/Card: 217 33% 17% (slightly elevated dark blue panels)
- Border: 215 28% 25% (subtle blue-gray borders)

**Neon Accent Colors (High Vibrance):**
- Primary Brand: 142 76% 60% (vibrant neon green - XP, success, achievements)
- Secondary: 262 83% 58% (electric purple - badges, special features)
- Accent: 199 89% 48% (bright cyan - interactive elements, links)
- Warning: 43 96% 56% (vibrant amber - review needed, fuzzy words)
- Destructive: 0 91% 71% (bright red - errors, forgotten words)

**Text Hierarchy:**
- Text Primary: 210 40% 98% (bright near-white)
- Text Secondary: 215 20% 65% (muted blue-gray)
- Text Tertiary: 215 16% 47% (dimmer gray for metadata)

**XP & Gamification Colors:**
- XP Green: 142 76% 60% (neon green for XP gains)
- Level Gold: 48 96% 53% (golden for level-ups and rank #1)
- Streak Fire: 14 91% 60% (orange-red for streak flames)
- Badge Purple: 262 83% 58% (electric purple for achievements)

**Memory Strength System:**
- Known: 142 76% 60% (neon green border + 142 76% 60% / 0.15 background)
- Fuzzy: 43 96% 56% (vibrant amber border + 43 96% 56% / 0.15 background)
- Forgotten: 0 91% 71% (bright red border + 0 91% 71% / 0.15 background)

---

## Typography

**Font Families:**
- Headings: 'Inter', sans-serif (700, 600 weights) - modern, highly readable
- Body: 'Inter', sans-serif (400, 500 weights) - same family for cohesion
- Lesson Content: 'Inter', sans-serif (400, 600 weights) - larger sizing for readability
- Code/Special: 'JetBrains Mono', monospace (for language-specific characters if needed)

**Scale & Hierarchy:**
- Hero/Display: text-5xl to text-6xl, font-bold (skill tree titles, level-ups)
- Section Headers: text-3xl to text-4xl, font-semibold (dashboard sections)
- Card Titles: text-xl to text-2xl, font-semibold (lesson cards, contribution headers)
- Body Text: text-base to text-lg (lesson content, descriptions)
- Labels/Meta: text-sm to text-base (XP counters, streak indicators, timestamps)
- Captions: text-xs to text-sm (helper text, vocabulary metadata)

---

## Layout System

**Spacing Primitives:**
Core units: 2, 3, 4, 6, 8, 12, 16, 20 (Tailwind units)
- Micro spacing: p-2, gap-3 (within components, icon padding)
- Component spacing: p-4, p-6, gap-4 (cards, buttons, form fields)
- Section spacing: p-8, py-12, gap-8 (page sections, major containers)
- Page margins: p-16, py-20 (outer page containers on desktop)

**Grid Patterns:**
- Skill Tree: Custom grid with branching paths (CSS Grid with gap-4)
- Vocabulary Book: 1 column mobile, 2-3 columns tablet/desktop (grid-cols-1 md:grid-cols-2 lg:grid-cols-3)
- Lesson Cards: Masonry-style or uniform grid (gap-6)
- Leaderboard: Single column list with rank indicators
- Admin Dashboard: Sidebar + main content (grid-cols-[240px_1fr])

---

## Component Library

### A. Navigation & Structure
**Top Navigation Bar:**
- Sticky header with logo, user avatar, XP counter, streak flame icon
- Dark surface (surface color) with subtle border-b
- Notifications bell icon (for contribution approvals, achievements)

**Sidebar Navigation (Dashboard):**
- Fixed left sidebar on desktop, collapsible on mobile
- Icons + labels for: Learn, Vocabulary, Contribute, Leaderboard, Profile
- Active state: Primary color background with rounded corners

### B. Gamification Components
**XP Bar:**
- Horizontal progress bar showing current level progress
- Gradient fill from primary to success color
- Display: "Level X - XXX/XXX XP" inline
- Animated fill on XP gain

**Streak Counter:**
- Flame icon with number badge
- Pulsing animation on active streak days
- Gray state when streak broken, vibrant when active

**Badge Display:**
- Circular or shield-shaped icons
- Locked state: grayscale with lock icon overlay
- Unlocked: full color with subtle glow effect
- Tooltip on hover showing achievement name and criteria

**Skill Tree Nodes:**
- Circular or hexagonal lesson nodes
- States: Locked (gray, lock icon), Available (primary color, hover lift), Completed (success color, checkmark)
- Connecting lines between nodes (stroke-2, dashed when locked)
- Node size: 16-20 (64-80px) with inner padding

### C. Learning Interface
**Lesson Card:**
- Elevated surface (shadow-md) with rounded-xl corners
- Header: lesson title (text-xl font-semibold)
- Body: description (text-sm text-secondary), XP reward badge
- Footer: difficulty indicator (Easy/Medium/Hard with color coding)
- Hover: subtle lift (hover:shadow-lg, hover:-translate-y-1)

**Question Display (Lesson Player):**
- Full-screen or modal overlay for focused learning
- Question text: text-2xl font-semibold, centered
- Audio playback button (if available): rounded-full, primary color, speaker icon
- Answer options: Large touch-friendly buttons (min-h-14)
- Feedback: Instant color change (green for correct, red for incorrect)
- Next button: Appears after answer with slide-in animation

**Answer Input Types:**
- Multiple Choice: Grid of 2-4 buttons with option text
- Fill-in-blank: Large input field (text-lg) with inline blanks in sentence context
- Flashcard: Flip card animation revealing answer

### D. Vocabulary Book
**Word Card:**
- Two-column layout: Word + Translation (on mobile: stacked)
- Memory strength indicator: Color-coded left border (border-l-4)
- Metadata row: Last reviewed date (text-xs text-secondary)
- Example phrase: Collapsible section below (text-sm italic)
- Quick action: Practice button (small, outline variant)

**Filter Bar:**
- Tabs or segmented control: All / Known / Fuzzy / Forgotten
- Search input with icon (rounded-full, border)
- Sort dropdown: By date, alphabetical, frequency

### E. Contribution Interface
**Contribution Form:**
- Multi-step wizard UI with progress indicator dots
- Step 1: Track/Lesson selection (dropdown or autocomplete)
- Step 2: Content input (rich text area for questions, answers)
- Step 3: Audio upload (drag-drop zone or file input with preview)
- Step 4: Review summary before submit
- Primary CTA: "Submit for Review" (large, primary color)

**Admin Review Panel:**
- Split view: Submission preview (left) + action panel (right)
- Actions: Approve (success color), Edit (primary), Reject (error color)
- Comment textarea for feedback to contributor
- Batch actions for multiple submissions

### F. Leaderboard
**Rank List Item:**
- Row layout: Rank badge (circular) + Avatar + Username + XP/Score
- Top 3: Special highlighting (gold/silver/bronze gradients)
- Current user: Highlight with primary background (bg-opacity-10)
- Hover: Slight scale and shadow

### G. Data Display
**Stats Cards (Profile/Dashboard):**
- Card with icon, metric number (text-4xl font-bold), label (text-sm)
- Grid layout: 2-4 cards per row
- Icons from Heroicons (trophy, fire, book, users)

**Progress Chart:**
- Simple line or bar chart showing XP over time
- Minimal axis styling, primary color for data line
- Tooltip on data point hover

---

## Interactions & Animations

**Use Sparingly:**
- XP gain: Number count-up animation (duration-500)
- Badge unlock: Scale pop-in with subtle bounce (scale-105)
- Skill tree unlock: Pulse ring expanding from node (duration-700)
- Card hovers: Lift and shadow (translate-y-1, shadow-lg)
- NO scroll-triggered animations except skill tree progressive reveal

**Transitions:**
- Button states: transition-colors duration-200
- Card interactions: transition-all duration-300
- Modal/Drawer: slide-in from right/bottom (duration-300)

---

## Page-Specific Layouts

### Skill Tree Page
- Full viewport canvas with centered tree visualization
- Zoom controls (bottom-right): +/- buttons
- Current position indicator (mini-map in corner)
- Lesson details sidebar (slide-in on node click)

### Vocabulary Book Page  
- Top: Filter bar with search and tabs
- Main: Responsive grid of word cards
- Right sidebar: Quick stats (total words, breakdown by strength)

### Lesson Player
- Centered question container (max-w-2xl)
- Progress bar at top showing question N of M
- Exit button (top-left) with confirmation modal
- Fullscreen option toggle

### Contribution Page
- Left sidebar: Contribution guidelines and tips
- Main: Step-by-step form wizard
- Right preview: Live preview of lesson as user builds it

### Admin Dashboard
- Fixed sidebar navigation
- Main area: Tabs for pending/approved/rejected submissions
- Table or card grid showing submissions
- Quick action buttons per item

---

## Accessibility & Polish

- All interactive elements: min-h-11 for touch targets
- Focus states: ring-2 ring-primary ring-offset-2
- Dark mode: Consistent implementation across all components including form inputs
- Keyboard navigation: Full support with visible focus indicators
- Screen reader labels: For all gamification icons and progress indicators
- Color contrast: WCAG AA minimum for all text
- Loading states: Skeleton screens for content, spinners for actions