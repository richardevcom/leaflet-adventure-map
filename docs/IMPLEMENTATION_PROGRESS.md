# UI Refactor Implementation Progress

## ✅ Completed (Tasks 2-3)

### 1. Adventure Data Created
- **File**: `src/data/adventures.json`
- **Content**: 30 adventure packages (3 per country)
- **Fields**: All required (id, name, country, coordinates, duration, difficulty, typology, dates, price, sale, images, URLs)
- **Quality**: Realistic data with actual Unsplash images, varied prices (€1,350-€3,450), authentic descriptions

### 2. TypeScript Interfaces Updated
- **File**: `src/types/index.ts`
- **Changes**:
  - Removed: `CityDestination`, `DestinationProperties`, `Destination`, `DestinationsCollection`
  - Added: `Adventure`, `AdventureFeature`, `AdventuresCollection`, `CountryFeature`, `FilterState`
  - Types: `AdventureDifficulty`, `AdventureTypology`
  - Updated: `MapState` (removed city, added activeAdventure + filters)

### 3. Custom Price Pin Created
- **File**: `src/assets/price-pin.svg`
- **Design**: Tag-style with price display (€100), arrow pointer
- **Colors**: TribeTravel orange (#EA5B10), white stroke
- **States**: Configurable via CSS (default/hover/active)

---

## 🔨 Next Implementation Phases

Based on research and your requirements, here's my recommended **phased approach**:

### **Phase 1: Core Refactor (Foundation)** 🏗️
*Remove old, add new data layer*

**A. Remove City Logic** (Task 11)
- Delete all city marker code
- Remove city selection handlers
- Clean up city-related state
- **Est:** 30 mins

**B. Load Adventure Data** 
- Update map.ts to load adventures.json
- Replace city markers with adventure pins
- Update pin creation with price display
- **Est:** 45 mins

**C. Basic Pin Rendering**
- Create `createAdventurePinIcon()` function
- Display price on each pin (€1,850)
- Three states: default/hover/active
- **Est:** 30 mins

**⏱️ Phase 1 Total: ~2 hours**

---

### **Phase 2: Search & Filters** 🔍
*User input and filtering*

**A. Top Search Bar** (Task 5)
- Create `src/components/searchBar.ts`
- Autocomplete dropdown (countries + adventures)
- Results counter badge
- Keyboard navigation
- **Est:** 1.5 hours

**B. Filter Sidebar** (Tasks 6-7)
- Move sidebar right → left
- Collapsible sections (Destinations, Duration, Difficulty, Typology, Date, Price)
- Multi-select checkboxes
- Date range picker component
- Price slider component
- **Est:** 3 hours

**C. Filter Engine** (Task 10)
- Create `src/utils/filterEngine.ts`
- Real-time filtering (no Apply button)
- Date logic: adventure falls within range
- Update pins + counter instantly
- **Est:** 1.5 hours

**⏱️ Phase 2 Total: ~6 hours**

---

### **Phase 3: Results Display** 📋
*Show matching adventures*

**A. Adventure Cards** (Task 8)
- Create `src/components/adventureCard.ts`
- Match layout-1.php style (image, SALE badge, title, location, price, button)
- Compact + full view modes
- Click → redirect to URL
- **Est:** 2 hours

**B. Results Panel** (Task 9)
- Desktop: Collapsed bar (count + faded preview) → expandable grid
- Mobile: Bottom sheet (swipe up)
- Sort options (price, duration, date)
- **Est:** 2.5 hours

**⏱️ Phase 3 Total: ~4.5 hours**

---

### **Phase 4: Interactivity** 🔗
*Wire everything together*

**A. Map-Filter Sync** (Task 12)
- Country click → filter by country
- Pin click → highlight card + show in search
- Filter change → update pins + results
- **Est:** 1.5 hours

**B. Styling** (Task 15)
- Create SCSS for all new components
- Match TribeTravel theme (#EA5B10, box shadows, rounded corners)
- Responsive breakpoints
- **Est:** 2 hours

**⏱️ Phase 4 Total: ~3.5 hours**

---

### **Phase 5: Mobile & Polish** 📱
*Responsive + final touches*

**A. Mobile Implementation** (Task 16)
- Filters in drawer (hamburger menu)
- Bottom sheet for results
- Sticky search header
- Touch-friendly (min 44px targets)
- **Est:** 2.5 hours

**B. WordPress API** (Task 17)
- Expose initialization options
- Event callbacks (onAdventureClick, onFilterChange)
- External filter control
- Documentation
- **Est:** 1.5 hours

**C. Testing & Accessibility** (Task 18)
- Cross-browser testing
- ARIA labels
- Keyboard navigation
- Loading/error states
- **Est:** 2 hours

**⏱️ Phase 5 Total: ~6 hours**

---

## 📊 Total Estimated Time

| Phase | Focus | Time |
|-------|-------|------|
| Phase 1 | Core Refactor | ~2 hours |
| Phase 2 | Search & Filters | ~6 hours |
| Phase 3 | Results Display | ~4.5 hours |
| Phase 4 | Interactivity | ~3.5 hours |
| Phase 5 | Mobile & Polish | ~6 hours |
| **TOTAL** | **Full Implementation** | **~22 hours** |

---

## 🤔 Decision Point

**Three options for proceeding:**

### Option A: **Full Implementation** (Recommended)
- I implement all phases sequentially
- You review after each phase
- Adjust as we go based on feedback
- **Timeline**: Could complete in 2-3 work sessions

### Option B: **MVP First** (Faster)
- Implement Phase 1 + basic Phase 2 (search + simple filters)
- Get core functionality working
- Iterate on advanced features later
- **Timeline**: 1 work session for MVP

### Option C: **You Direct** (Custom)
- Tell me which specific tasks/phases to prioritize
- I focus on those first
- More control over implementation order

---

## 💬 Questions for You

1. **Preferred Approach**: Option A, B, or C above?

2. **Design Review**: Want to see mockups/wireframes before I code, or trust the research + TribeTravel theme?

3. **Breaking Changes**: The refactor will temporarily break the existing city-based map. Should I:
   - Work in a new branch/folder?
   - Proceed with direct refactor (quicker but breaks current code)?

4. **Testing Environment**: Do you have a local dev server running where you can see changes in real-time?

---

## 🎯 My Recommendation

**Start with Option A (Full Implementation), Phase 1 NOW:**

1. I'll complete Phase 1 (remove cities, add adventure pins) - ~2 hours
2. You review the adventure pins on map
3. If good, I continue to Phase 2 (search + filters)
4. Repeat review cycle after each phase

**This approach:**
- ✅ Delivers working increments
- ✅ Allows course correction
- ✅ Minimizes risk of building wrong thing
- ✅ Gets you a functional map quickly

**Shall I proceed with Phase 1 implementation?** (Remove cities → Add adventure pins with prices)

