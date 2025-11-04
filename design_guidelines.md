# Smart Agriculture Market Tracker - Design Guidelines

## Design Approach

**Selected Approach:** Material Design System with agricultural context adaptations

**Justification:** This application serves utility-focused needs with information-dense content (market data, charts, weather information, forum posts). Material Design provides excellent patterns for data tables, dashboards, and complex interactions while maintaining clarity and accessibility - essential for farmers making critical business decisions.

**Key Design Principles:**
- **Data Clarity First:** Information hierarchy prioritizes actionable data over decorative elements
- **Agricultural Trust:** Professional, grounded aesthetic that conveys reliability and authority
- **Mobile-First:** Many farmers will access from mobile devices in the field
- **Scannable Information:** Quick visual parsing of prices, trends, and weather at a glance

---

## Typography System

**Primary Font:** Inter (Google Fonts) - Clean, highly legible for data tables and dashboards
**Secondary Font:** Poppins (Google Fonts) - Friendly, approachable for headings and community features

**Type Scale:**
- **Display Headings:** text-4xl to text-5xl, font-bold (Dashboard titles, Hero sections)
- **Section Headings:** text-2xl to text-3xl, font-semibold (Module titles, Card headers)
- **Subsection Headings:** text-xl, font-semibold (Table headers, Forum post titles)
- **Body Text:** text-base, font-normal (Data entries, descriptions, forum content)
- **Supporting Text:** text-sm, font-medium (Labels, metadata, timestamps)
- **Data Points:** text-lg to text-2xl, font-bold (Prices, temperatures, key metrics)

---

## Layout System

**Spacing Primitives:** Use Tailwind units of 2, 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- **Micro spacing:** p-2, gap-2 (inside components, icon-text gaps)
- **Component spacing:** p-4, p-6, gap-4 (card padding, form fields)
- **Section spacing:** p-8, py-12, gap-8 (dashboard sections, content blocks)
- **Major sections:** py-16, py-20 (page sections, modal spacing)

**Grid System:**
- **Desktop (lg+):** max-w-7xl container with 12-column grid
- **Tablet (md):** max-w-4xl with 8-column grid
- **Mobile:** max-w-full with single column stack

**Container Strategy:**
- **Full-width sections:** w-full with inner max-w-7xl mx-auto
- **Content sections:** max-w-6xl mx-auto px-6
- **Data tables:** max-w-full with horizontal scroll on mobile
- **Form containers:** max-w-2xl mx-auto

---

## Component Library

### Navigation & Header
**Main Navigation Bar:**
- Fixed top navigation with elevated shadow
- Left: Platform logo and name "AgriMarket Tracker"
- Center (desktop): Primary navigation links (Dashboard, Market Rates, Weather, Forum, AI Advice)
- Right: User profile dropdown with role badge (Admin/Farmer), notifications icon
- Mobile: Hamburger menu with slide-out drawer
- Height: h-16, padding px-6

**Role Badge:**
- Small pill badge next to user name
- Rounded-full, px-3, py-1, text-xs, font-semibold

### Dashboard Layouts

**Admin Dashboard:**
- **Header Section:** h-24, flex justify-between items-center
  - Left: "Admin Dashboard" heading + quick stats (Total Items, Last Updated)
  - Right: Primary CTA button "Add New Item"
- **Data Table Section:** Full-width responsive table with alternating row treatments
  - Sticky header row with sortable columns
  - Columns: Item Name, Category, Current Price, Region, Date Updated, Actions
  - Action icons: Edit (pencil), Delete (trash)
  - Mobile: Card-based layout with key info stacked
- **Bulk Actions Bar:** Appears on row selection, fixed bottom with upload CSV option

**Farmer Dashboard:**
- **Three-Column Hero Section (desktop, stacks on mobile):**
  - Column 1: Quick Market Snapshot card (3-4 trending items)
  - Column 2: Today's Weather Summary card with large temp display
  - Column 3: Latest AI Advice card with icon and recommendation
- **Market Rates Section:** 
  - Search bar and filter dropdowns (by category, region)
  - Responsive grid: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 for item cards
  - Each card: Item name, price (large, bold), 7-day trend mini-chart, "View Details" link

### Data Visualization Components

**7-Day Price Trend Charts:**
- **Chart Container:** Elevated card with padding p-6, rounded-lg, shadow-md
- **Chart Header:** Vegetable name (text-xl, font-bold), date range (text-sm)
- **Chart Area:** Minimum height h-64 to h-80, responsive width
- **Chart Type:** Line chart with smooth curves, data point markers
- **Tooltip:** Shows exact price and date on hover
- **Multi-Compare Mode:** Checkbox selection interface above chart, max 3 items, different line styles

**Chart.js Implementation Notes:**
- Responsive: true, maintainAspectRatio: false
- Grid lines: subtle, not distracting
- Legend position: top for single item, bottom for comparison
- X-axis: Date labels, Y-axis: Price with currency symbol

### Weather Module

**City Weather Cards:**
- **Grid Layout:** grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4
- **Card Structure (each city):**
  - Top: City name (text-lg, font-semibold)
  - Center: Large weather icon (w-16 h-16), temperature (text-4xl, font-bold)
  - Bottom row: Humidity (droplet icon + %), Wind speed, Conditions text
  - Card size: p-6, rounded-xl, shadow-md

**Pakistan Map Visualization:**
- **Container:** Full-width section, bg-surface, py-16
- **Map Display:** max-w-4xl mx-auto, min-h-96
- **Implementation:** SVG-based Pakistan map with regional divisions
- **Legend:** Positioned top-right, shows weather condition indicators
- **Interactive:** Hover shows city details in tooltip

### AI Advice Section

**Advice Card Layout:**
- **Container:** max-w-3xl mx-auto, rounded-2xl, p-8, shadow-lg
- **Structure:**
  - Top: Icon (lightbulb/brain) + "Smart Farming Advice" heading
  - Main: Advice text (text-lg, leading-relaxed) in readable paragraph format
  - Metadata row: Weather source, Price trend indicator, Timestamp
  - Bottom: "Get New Advice" button (ghost style)
- **Multiple Advice Display:** Stacked cards with gap-6

### Community Forum

**Forum Post List:**
- **Layout:** Single column, max-w-4xl mx-auto
- **Each Post Card:**
  - Header row: Avatar (w-10 h-10, rounded-full), Username, Role badge, Timestamp
  - Title: text-xl, font-semibold, mb-2
  - Content preview: text-base, line-clamp-3 (expandable)
  - Footer row: Comment count, Like count, "View Discussion" link
  - Card spacing: p-6, mb-4, rounded-lg, shadow-sm

**Post Detail View:**
- **Full Post:** max-w-3xl mx-auto, bg-surface, p-8, rounded-xl
- **Comments Section:** Nested with left border and pl-4 for visual threading
- **Comment Form:** Sticky bottom with elevated shadow, textarea + "Post Comment" button

### Forms & Inputs

**Consistent Form Structure:**
- **Form Container:** max-w-2xl mx-auto, space-y-6
- **Input Fields:** 
  - Label: text-sm, font-medium, mb-2
  - Input: w-full, px-4, py-3, rounded-lg, border-2, focus ring treatment
  - Helper text: text-xs, mt-1
- **Field Groups:** Two-column grid for related fields (price + region)
- **Select Dropdowns:** Custom styled with chevron icon
- **Buttons:** 
  - Primary: px-6, py-3, rounded-lg, font-semibold, shadow-md
  - Secondary: px-6, py-3, rounded-lg, font-semibold, border-2
  - Destructive: Same sizing, distinct treatment for delete actions

### Authentication Pages

**Layout Strategy:**
- **Split Screen (desktop):** 
  - Left half: Hero image (agricultural field/farmer working)
  - Right half: Auth form
- **Mobile:** Full-width form, hero image as background with overlay

**Auth Form:**
- **Container:** max-w-md mx-auto px-8 py-12
- **Structure:**
  - Logo + platform name at top
  - Heading (text-3xl, font-bold)
  - Subheading with benefits
  - Role selector (Admin/Farmer) as radio button cards
  - Email/password fields
  - Remember me checkbox
  - Primary submit button (full-width)
  - Social login options (if using Replit Auth)
  - Footer link to alternate auth page

---

## Images

**Hero Images:**
1. **Authentication Pages:** High-quality image of Pakistani farmer inspecting crops or vegetable market scene (1920x1080 minimum)
2. **Farmer Dashboard Hero:** Wide banner showing agricultural landscape with vegetables/fields (1600x400)
3. **Weather Module Background:** Subtle agricultural pattern or field aerial view

**Functional Images:**
- **Weather Icons:** Use weather icon library (e.g., weather-icons.css) for consistency
- **Placeholder Avatars:** Generic user avatars for forum profiles
- **Empty States:** Friendly illustrations for "No data yet" states

**Image Treatment:**
- Hero images: Subtle overlay for text readability
- Buttons on images: Backdrop blur (backdrop-blur-md) with semi-transparent background
- Cards with images: rounded-t-lg for top image, content below

---

## Responsive Breakpoints

**Mobile (< 768px):**
- Stack all multi-column layouts vertically
- Full-width tables convert to card-based display
- Simplified navigation with drawer
- Touch-friendly tap targets (min h-12)

**Tablet (768px - 1024px):**
- 2-column layouts for cards
- Compact table views with horizontal scroll
- Sidebar navigation option

**Desktop (> 1024px):**
- Full multi-column layouts (3-4 columns)
- Side-by-side dashboard panels
- Expanded data tables with all columns visible

---

## Animation & Interaction Patterns

**Minimal, Purposeful Animations:**
- Page transitions: Fade in (200ms)
- Card hovers: Subtle lift with shadow increase (150ms)
- Chart rendering: Animate from bottom to top (400ms, ease-out)
- Form validation: Shake on error (300ms)
- Loading states: Skeleton screens, not spinners
- Modal entrance: Scale from 0.95 to 1.0 with fade (200ms)

**No Animations:**
- Background parallax effects
- Continuous rotations or pulses
- Auto-playing carousels
- Distracting scroll-triggered effects

---

## Accessibility Requirements

- **ARIA Labels:** All interactive elements, form inputs, and navigation items
- **Keyboard Navigation:** Full tab order, visible focus states (ring-2 with offset)
- **Color Independence:** Never rely solely on color to convey information
- **Text Contrast:** Maintain WCAG AA standards minimum
- **Form Labels:** Always visible, never placeholder-only
- **Screen Reader:** Proper heading hierarchy (h1 → h6), semantic HTML
- **Touch Targets:** Minimum 44x44px for all clickable elements