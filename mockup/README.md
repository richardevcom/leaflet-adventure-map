# UI Mockup Prototype

## Overview
Interactive HTML/CSS/TS prototype demonstrating the complete TribeTravel Adventures Map UI redesign.

## Features Demonstrated

### ✅ Desktop Layout
- **Top Search Bar**: Full-width search with autocomplete placeholder, results counter badge
- **Left Sidebar Filters**: 320px wide with collapsible sections
  - Destinations (country checkboxes)
  - Duration (5/7/10/15 days)
  - Difficulty (Easy/Medium/Challenging/Difficult)
  - Activity Type (Sports/Vacation)
  - Date Range (from/to pickers)
  - Price Range (dual-handle slider €1,350-€3,450)
- **Map Container**: Leaflet map with custom price pin markers
- **Results Panel**: Collapsible bottom panel with adventure cards grid

### ✅ Mobile Responsive
- **Sticky Search**: Top search bar with vertical layout
- **Hamburger Filter**: Button toggles sidebar drawer from left
- **Bottom Sheet**: Swipe-up results panel
- **Touch-friendly**: All interactive elements 44px+ touch targets

### ✅ TribeTravel Theme
- **Colors**: Primary orange #EA5B10, proper text hierarchy
- **Shadows**: Box shadows on cards, markers, panels
- **Borders**: Rounded corners (5-12px radius)
- **Typography**: Font weights 600-700 for headings

### ✅ Interactive Features
- **Price Markers**: 
  - Default state: Orange background
  - Hover state: Black background
  - Active state: Black + scale transform
  - Arrow pointer below
- **Filter Sections**: Click headers to collapse/expand
- **Search Bar**: Shows clear button when typing
- **Results Panel**: Click header to collapse/expand
- **Adventure Cards**: 
  - Hover effects (lift + shadow)
  - Click to highlight on map
  - SALE badge for discounted adventures
  - Matching layout-1.php structure
- **Map-Results Sync**: Click marker → highlight card, click card → highlight marker
- **Real-time Filtering**: All filter changes logged to console (ready for implementation)

## How to View

### Option 1: Local Server (Recommended)
```bash
cd /home/richardevcom/dev/leaflet-adventures-destinations/mockup
python3 -m http.server 8080
# Open http://localhost:8080
```

### Option 2: Direct File
Open `index.html` directly in browser (may have CORS issues with some features)

### Option 3: VS Code Live Server
1. Install "Live Server" extension
2. Right-click `index.html`
3. Select "Open with Live Server"

## Sample Data
Uses 8 sample adventures from adventures.json:
- Iceland: Northern Lights Photography (€1,850)
- Norway: Lofoten Islands (€1,980 - SALE)
- New Zealand: Milford Sound Kayaking (€1,650)
- Costa Rica: Rainforest Canopy (€2,205 - SALE)
- Japan: Mount Fuji Hiking (€1,450)
- Morocco: Sahara Desert Trek (€1,750)
- Peru: Machu Picchu Trek (€2,565 - SALE)
- Tanzania: Kilimanjaro Summit (€3,450)

## Testing Checklist

### Desktop (1920x1080)
- [ ] Search bar spans width properly
- [ ] Left sidebar 320px fixed width
- [ ] Map fills remaining space
- [ ] Results panel collapses/expands
- [ ] Price markers display correctly
- [ ] Filter sections expand/collapse
- [ ] Adventure cards grid responsive

### Tablet (768x1024)
- [ ] Layout transitions properly
- [ ] Touch targets adequate size
- [ ] Sidebar still accessible

### Mobile (375x812)
- [ ] Search bar vertical layout
- [ ] Hamburger menu appears
- [ ] Sidebar slides from left
- [ ] Bottom sheet swipes up
- [ ] Cards stack vertically
- [ ] Price markers readable

### Interactions
- [ ] Click marker → highlights card
- [ ] Click card → highlights marker
- [ ] Hover marker → black background
- [ ] Filter change → console log
- [ ] Search input → shows clear button
- [ ] Clear all → resets all filters
- [ ] Mobile filter toggle → opens sidebar

## Next Steps After Approval

1. **Phase 1 Implementation** (~2 hours)
   - Remove city logic from map.ts
   - Load adventures.json
   - Implement actual price markers
   - Test with full 30 adventures

2. **Phase 2: Filters** (~6 hours)
   - Build real filter engine
   - Implement autocomplete search
   - Wire up all filter inputs
   - Real-time map + results update

3. **Phase 3: Results** (~4.5 hours)
   - Move adventure cards to component
   - Implement results panel
   - Add pagination/virtual scrolling

4. **Phase 4: Polish** (~3.5 hours)
   - Map-filter-results synchronization
   - Smooth animations
   - Loading states

5. **Phase 5: Mobile + WordPress** (~6 hours)
   - Mobile responsive refinement
   - WordPress API integration
   - Cross-browser testing

## Files
- `index.html`: Complete page structure
- `mockup.css`: TribeTravel themed styles (600+ lines)
- `mockup.js`: Interactive functionality (400+ lines)

## Notes
- Uses Leaflet 1.9.4 CDN
- All filter logic stubbed with console.log
- Price slider prevents overlap (min 100€ gap)
- Adventure card matches layout-1.php design
- Mobile breakpoints: 768px, 480px
