# UI Refactor Plan: Adventure Booking Map Interface

## Research Insights

### Key Findings from Industry Leaders (Airbnb, Booking.com, G Adventures)

1. **Filter-First Approach**: Filters apply instantly without "Apply" button for immediate feedback
2. **Left Sidebar Standard**: Industry standard is left-side filter panel (better for LTR languages)
3. **Search + Filters Combo**: Search bar at top, filters below in collapsible sections
4. **Results Counter**: Always visible count of matching items
5. **Map-List Toggle**: Option to view results as list or map pins
6. **Mobile-First**: Filters in drawer/modal on mobile, sidebar on desktop

## Current State Analysis

### What We Have ✅
- Interactive Leaflet map with country territories
- Hover/active states with visual feedback
- Smooth zoom transitions
- City markers (custom SVG pins)
- Right sidebar navigation
- Country → City hierarchy
- Label system for names

### What Needs to Change 🔄

#### Data Structure
- ❌ Current: Country → Cities (2 levels)
- ✅ New: Country → Adventures/Packages (2 levels, more flexible)
- Remove cities, add adventure packages with:
  - `id`, `name`, `countryCode`
  - `lat`, `lng` (exact location)
  - `duration` (days)
  - `difficulty` (Easy/Medium/Challenging/Difficult)
  - `typology` (Sports Activities/Vacation)
  - `startDate`, `endDate` (date range when available)
  - `price` (EUR)
  - `url` (link to package page)

#### UI Components to Remove
- ❌ Floating label (replace with search bar value)
- ❌ City selection logic
- ❌ Right sidebar positioning

#### UI Components to Add
- ✅ Top search bar (country/adventure search)
- ✅ Left sidebar with filters:
  - Search input (synced with map selection)
  - Destinations (countries, collapsible)
  - Duration checkboxes
  - Difficulty checkboxes
  - Typology checkboxes
  - Date range picker (from/to)
  - Price range slider (min/max)
- ✅ Results counter badge (e.g., "24 adventures found")
- ✅ Results list (collapsible panel or bottom sheet)
- ✅ Adventure cards (quick preview with image, name, price, duration)

## Proposed Architecture

### File Structure
```
src/
├── components/
│   ├── searchBar.ts          # Top search with autocomplete
│   ├── filterSidebar.ts       # Left sidebar with all filters
│   ├── resultsPanel.ts        # Results list/cards
│   ├── adventureCard.ts       # Individual adventure preview
│   └── dateRangePicker.ts     # Custom date picker
├── data/
│   └── adventures.json        # Adventure packages data
├── types/
│   └── index.ts               # TypeScript interfaces
├── utils/
│   ├── filterEngine.ts        # Filter logic
│   └── searchEngine.ts        # Search/autocomplete logic
├── styles/
│   ├── searchBar.scss
│   ├── filterSidebar.scss
│   ├── resultsPanel.scss
│   └── adventureCard.scss
└── map.ts                     # Core map logic (refactored)
```

### New Data Model

```typescript
interface Adventure {
  id: string;
  name: string;
  countryCode: string;
  countryName: string;
  lat: number;
  lng: number;
  duration: number; // days
  difficulty: 'Easy' | 'Medium' | 'Challenging' | 'Difficult';
  typology: 'Sports Activities' | 'Vacation';
  startDate: string; // ISO format
  endDate: string;   // ISO format
  price: number;     // EUR
  image?: string;    // Optional thumbnail
  url: string;       // Link to package page
  description?: string;
}
```

### Filter State

```typescript
interface FilterState {
  search: string;
  countries: string[];           // Selected country codes
  durations: number[];           // [5, 7, 10, 15]
  difficulties: string[];        // ['Easy', 'Medium', etc.]
  typologies: string[];          // ['Sports Activities', 'Vacation']
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  priceRange: {
    min: number;
    max: number;
  };
}
```

## UI Layout Specification

### Desktop (>1024px)
```
┌─────────────────────────────────────────────────────┐
│ [Search: "Norway hiking..."]         [24 adventures]│ ← Top Bar
├──────────────┬──────────────────────────────────────┤
│              │                                      │
│  FILTERS     │           MAP                        │
│  ────────    │                                      │
│              │        [Pin] [Pin]                   │
│  🔍 Search   │           [Pin]                      │
│              │                                      │
│  📍 Destin.  │                                      │
│  ☐ Iceland   │                                      │
│  ☐ Norway    │                                      │
│              │                                      │
│  ⏱ Duration  │                                      │
│  ☐ 5 days    │                                      │
│  ☐ 1 week    │                                      │
│              │                                      │
│  ⚡ Diff.    │                                      │
│  💰 Price    │                                      │
│  📅 Dates    │                                      │
│              │                                      │
│  [Scrollable]│                                      │
└──────────────┴──────────────────────────────────────┘
    320px            Rest of viewport
```

### Mobile (<768px)
```
┌─────────────────────────────┐
│ [Search]  [Filters] [24]    │ ← Sticky header
├─────────────────────────────┤
│                             │
│         MAP                 │
│                             │
│      [Pin] [Pin]            │
│         [Pin]               │
│                             │
│                             │
├─────────────────────────────┤
│ ↑ 24 adventures ↑           │ ← Draggable sheet
│ ─────────────────           │
│ [Card] [Card] [Card]        │
│                             │
└─────────────────────────────┘
```

## Implementation Phases

### Phase 1: Data Migration ✅ TODO
1. Create `adventures.json` with 3 adventures per country (30 total)
2. Update TypeScript interfaces
3. Remove city-related code
4. Add adventure marker rendering

### Phase 2: Search Bar 🔨 TODO
1. Create top search bar component
2. Implement autocomplete (countries + adventures)
3. Sync with map selection
4. Add results counter

### Phase 3: Left Sidebar 🔨 TODO
1. Move sidebar from right to left
2. Add collapsible filter sections
3. Implement multi-select checkboxes
4. Add date range picker
5. Add price slider

### Phase 4: Filter Engine 🔨 TODO
1. Create filter logic
2. Real-time filtering (no "Apply" button)
3. Update map pins based on filters
4. Update results counter

### Phase 5: Results Panel 🔨 TODO
1. Create adventure card component
2. Build results list (grid or list view)
3. Add click → redirect to package URL
4. Mobile: draggable bottom sheet

### Phase 6: WordPress Integration Prep 🔮 FUTURE
1. Expose configuration API
2. Add initialization options
3. Create WordPress plugin structure
4. Elementor widget wrapper

## Questions & Suggestions

### Questions for You:

1. **Adventure Data**: Do you have real adventure data, or should I generate realistic dummy data?

2. **Date Filtering Logic**: Should adventures match if:
   - A) Adventure dates fall entirely within filter range?
   - B) Adventure dates overlap with filter range at all?
   - C) Adventure can start within filter range?

3. **Results Display**: Prefer:
   - A) Grid of cards (3 columns desktop, 1 mobile)
   - B) List view (1 column, more details)
   - C) Both with toggle?

4. **Mobile Experience**: 
   - A) Bottom sheet that slides up
   - B) Separate full-screen list page
   - C) Modal overlay?

5. **Price Currency**: EUR only, or multi-currency?

6. **Map Interaction**: When adventure pin clicked:
   - A) Show popup on map
   - B) Highlight in results list
   - C) Both?

### Suggestions:

✅ **Keep Territory Highlighting**: Still show country fill on hover/active (visual anchor)

✅ **Pin Clustering**: For countries with many adventures, cluster pins at low zoom

✅ **Quick Filters**: Add "Popular" pre-set filters (e.g., "1 Week Adventures", "Under €1000")

✅ **Sorting**: Add sort options (Price, Duration, Difficulty, Date)

✅ **Favorites**: Add heart icon to save adventures (localStorage)

✅ **Share**: Generate shareable URL with filter state

## Next Steps

**Once you answer the questions above, I'll proceed with:**

1. ✅ Generate realistic adventure data (30 packages)
2. ✅ Create new TypeScript interfaces
3. ✅ Build search bar component
4. ✅ Refactor sidebar to left with filters
5. ✅ Implement filter engine
6. ✅ Create adventure cards
7. ✅ Wire everything together

**Or would you like me to make reasonable assumptions and start implementing immediately?**

---

## Technical Notes

- **Bundle Size**: Adding date picker + slider will increase bundle (~30KB)
- **Performance**: Filter 30-100 items should be instant (<16ms)
- **Accessibility**: All filters keyboard navigable, ARIA labels
- **RTL Support**: Can be added later if needed
- **Dark Mode**: Can be added with CSS variables

