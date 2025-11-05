<div align="center">

# 🗺️ Leaflet Adventure Map

**Beautiful, minimal interactive map for exploring adventure travel destinations**

[![Version](https://img.shields.io/badge/version-1.0.0-orange?style=flat-square)](https://github.com/richardevcom/leaflet-adventure-map/releases)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green?style=flat-square&logo=leaflet)](https://leafletjs.com/)
[![License](https://img.shields.io/badge/license-MIT-blue?style=flat-square)](LICENSE)
[![Build](https://img.shields.io/badge/build-passing-brightgreen?style=flat-square)](https://github.com/richardevcom/leaflet-adventure-map)

**[Live Demo](#) • [Documentation](#-table-of-contents) • [Report Bug](https://github.com/richardevcom/leaflet-adventure-map/issues) • [Request Feature](https://github.com/richardevcom/leaflet-adventure-map/issues)**

![Adventure Map Preview](preview.gif)

</div>

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🎯 Why This Project](#-why-this-project)
- [🚀 Quick Start](#-quick-start)
- [📦 Installation](#-installation)
- [🏗️ Project Structure](#️-project-structure)
- [🎨 Design System](#-design-system)
- [🔧 Configuration](#-configuration)
- [🔌 Integration](#-integration)
- [🛠️ Development](#️-development)
- [📊 Performance](#-performance)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [👤 Author](#-author)

---

## ✨ Features

### 🎯 Core Functionality

- **🔍 Real-time Search** - Instant search with dropdown suggestions for countries and adventures
- **🗺️ Interactive Map** - Click territories to filter destinations, with smooth zoom animations
- **💰 Price Markers** - Dynamic price pins with sale badges and hover states
- **⚡ Smart Filtering** - AND logic across multiple filter dimensions
- **📱 Mobile First** - Responsive design with sidebar slide-in and bottom collapsible panel
- **🎭 Beautiful UI** - Minimalist design with floating containers and soft shadows

### 🎛️ Advanced Filters

| Filter Type | Options | Logic |
|------------|---------|-------|
| **Destinations** | 8+ countries with item counts | Multi-select AND |
| **Duration** | 5, 7, 10, 15+ days | Multi-select AND |
| **Difficulty** | Easy → Difficult (4 levels) | Multi-select AND |
| **Activity Type** | Sports / Vacation | Multi-select AND |
| **Price Range** | Dual-slider with live preview | Range filter |
| **Date Range** | From/To date picker | Date filter |

### 🎨 UI/UX Highlights

- ✅ Debounced search (300ms) and price sliders (500ms)
- ✅ Collapsible filter sections with smooth animations
- ✅ Adventure cards with images, metadata, and pricing
- ✅ Empty states with helpful messaging
- ✅ Scroll indicators for long content
- ✅ Opacity transitions on hover (0.85 → 1.0)
- ✅ Bottom panel collapse/expand (72px ↔ 91.6vh)

---

## 🎯 Why This Project

This project demonstrates:

- 🏗️ **Clean Architecture** - Modular TypeScript with separation of concerns
- 🎨 **Design Systems** - SCSS variables, consistent spacing, professional polish
- ♿ **Accessibility** - Semantic HTML, ARIA labels, keyboard navigation
- 📱 **Responsive Design** - Mobile-first approach with adaptive layouts
- ⚡ **Performance** - Debounced interactions, optimized builds, lazy rendering
- 🔧 **Developer Experience** - TypeScript strict mode, clear documentation, easy setup

Perfect for:
- 🌍 Travel booking platforms
- 🏔️ Adventure tourism websites
- 📍 Destination discovery apps
- 🗺️ Interactive location browsers

---

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun 1.3+
- Modern browser with ES2020+ support

### Installation

```bash
# Clone repository
git clone https://github.com/richardevcom/leaflet-adventure-map.git
cd leaflet-adventure-map

# Install dependencies
bun install
# or: npm install

# Start development server
bun run dev
# or: npm run dev

# Open browser to http://localhost:5173
```

### Build for Production

```bash
# Type check
bun run type-check

# Build optimized bundle
bun run build

# Preview production build
bun run preview
```

---

## 📦 Installation

### Option 1: Package Manager

```bash
# Using Bun (recommended)
bun install

# Using npm
npm install

# Using yarn
yarn install

# Using pnpm
pnpm install
```

### Option 2: CDN (Coming Soon)

```html
<link rel="stylesheet" href="https://cdn.example.com/leaflet-adventure-map.css">
<script src="https://cdn.example.com/leaflet-adventure-map.js"></script>
```

---

## 🏗️ Project Structure

```
leaflet-adventure-map/
├── src/
│   ├── data/
│   │   └── mockAdventures.ts       # Adventure data (replace with API)
│   ├── types/
│   │   └── index.ts                # TypeScript interfaces
│   ├── utils/
│   │   ├── filterManager.ts        # Filter logic (AND conditions)
│   │   ├── searchManager.ts        # Search & debounce utilities
│   │   ├── mapManager.ts           # Leaflet operations
│   │   └── uiManager.ts            # UI rendering & updates
│   ├── styles/
│   │   ├── main.scss               # Main entry
│   │   ├── _variables.scss         # Design tokens
│   │   ├── _reset.scss             # CSS reset
│   │   ├── _search.scss            # Search component
│   │   ├── _filters.scss           # Filters sidebar
│   │   ├── _results.scss           # Results panel
│   │   ├── _map.scss               # Map & markers
│   │   └── _mobile.scss            # Responsive styles
│   ├── main.ts                     # Application entry
│   └── vite-env.d.ts              # Vite declarations
├── public/
│   └── data/
│       └── world.geojson           # Country boundaries
├── index.html                      # HTML template
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript config
└── package.json                    # Dependencies
```

### Architecture Overview

```
┌─────────────────────────────────────────┐
│            main.ts (Entry)              │
├─────────────────────────────────────────┤
│  ┌──────────┐  ┌──────────┐  ┌────────┐│
│  │ Filter   │  │ Search   │  │   Map  ││
│  │ Manager  │  │ Manager  │  │Manager ││
│  └─────┬────┘  └─────┬────┘  └────┬───┘│
│        │             │              │   │
│        └─────────────┴──────────────┘   │
│                      │                  │
│               ┌──────▼──────┐           │
│               │ UI Manager  │           │
│               └─────────────┘           │
└─────────────────────────────────────────┘
```

---

## 🎨 Design System

### Color Palette

```scss
// Brand Colors
$color-accent: #EA5B10;           // Primary orange
$color-accent-hover: #d14f0a;     // Darker orange

// Text Colors
$color-text: #000000;             // Primary
$color-text-muted: #6e6e6e;      // Secondary
$color-text-light: #999999;      // Tertiary

// Background Colors
$color-bg: #ffffff;               // White
$color-bg-secondary: #fafafa;    // Off-white
$color-disabled: #f5f5f5;        // Light gray
```

### Typography

```scss
// Font Families
$font-body: 'Inter', sans-serif;        // UI text
$font-heading: 'Teko', sans-serif;      // Headings
$font-decorative: 'Caveat', cursive;    // Accents

// Font Sizes
Body: 15px | Heading: 22px | Small: 13-14px
```

### Spacing Scale (4px base)

```scss
$space-xs:  4px   // Tight spacing
$space-sm:  8px   // Small gaps
$space-md:  16px  // Medium spacing
$space-lg:  24px  // Large gaps
$space-xl:  32px  // Extra large
$space-2xl: 48px  // Maximum
```

### Shadows

```scss
$shadow-sm: 0 1px 2px rgba(0,0,0,0.04), 0 1px 4px rgba(0,0,0,0.04)
$shadow-md: 0 2px 4px rgba(0,0,0,0.04), 0 4px 8px rgba(0,0,0,0.06)
$shadow-lg: 0 4px 8px rgba(0,0,0,0.04), 0 8px 16px rgba(0,0,0,0.08)
$shadow-xl: 0 8px 16px rgba(0,0,0,0.04), 0 16px 32px rgba(0,0,0,0.1)
```

---

## 🔧 Configuration

### Update Adventure Data

Edit `src/data/mockAdventures.ts`:

```typescript
import type { Adventure } from '../types/index.js';

export const mockAdventures: Adventure[] = [
  {
    id: 'unique-id',
    name: 'Iceland Aurora Trek',
    country: 'Iceland',
    countryCode: 'IS',      // ISO 2-letter code
    lat: 64.9631,           // Latitude
    lng: -19.0208,          // Longitude
    duration: 7,            // Days
    difficulty: 'Medium',   // Easy|Medium|Challenging|Difficult
    typology: 'Sports Activities',  // Sports Activities|Vacation
    price: 1850,            // EUR
    salePrice: 1650,        // EUR or null
    onSale: true,
    imageUrl: 'https://example.com/image.jpg'
  },
  // ... more adventures
];
```

### Customize Styling

Edit `src/styles/_variables.scss`:

```scss
// Change brand color
$color-accent: #EA5B10;

// Adjust spacing
$space-base: 4px;

// Modify breakpoints
$breakpoint-mobile: 480px;
$breakpoint-tablet: 768px;
$breakpoint-desktop: 1024px;
```

### Vite Configuration

Edit `vite.config.ts` for custom build settings:

```typescript
export default defineConfig({
  base: '/custom-path/',  // Set base path
  build: {
    outDir: 'custom-dist', // Change output directory
    sourcemap: true,       // Enable source maps
  },
});
```

---

## 🔌 Integration

### WordPress Integration

#### Step 1: Build for Production

```bash
bun run build
```

#### Step 2: Copy to Theme

```bash
cp -r dist/* /path/to/wp-content/themes/your-theme/assets/adventure-map/
```

#### Step 3: Enqueue Assets

```php
// functions.php
function enqueue_adventure_map() {
    $version = '1.0.0';
    
    wp_enqueue_style(
        'adventure-map-css',
        get_template_directory_uri() . '/assets/adventure-map/assets/index.css',
        [],
        $version
    );
    
    wp_enqueue_script(
        'adventure-map-js',
        get_template_directory_uri() . '/assets/adventure-map/assets/index.js',
        [],
        $version,
        true
    );
}
add_action('wp_enqueue_scripts', 'enqueue_adventure_map');
```

#### Step 4: Add to Template

```php
<!-- page-adventures.php -->
<?php get_header(); ?>

<div class="adventures-page">
    <!-- Map container -->
    <div class="map-wrapper">
        <div id="map"></div>
    </div>
    
    <!-- Rest of markup is generated by JS -->
</div>

<?php get_footer(); ?>
```

### React/Vue Integration

```jsx
// Coming soon
import AdventureMap from 'leaflet-adventure-map';

function App() {
  return <AdventureMap adventures={data} />;
}
```

---

## 🛠️ Development

### Available Scripts

```bash
# Development
bun run dev          # Start dev server (http://localhost:5173)
bun run type-check   # Run TypeScript type checker
bun run build        # Build for production
bun run preview      # Preview production build
```

### Code Quality

```bash
# Type checking
bun run type-check

# Format code (manual)
# Add prettier if needed
```

### Environment Variables

Create `.env` file (optional):

```env
VITE_API_URL=https://api.example.com
VITE_MAP_TILES=https://tiles.example.com
```

---

## 📊 Performance

### Build Stats

| Metric | Value |
|--------|-------|
| **CSS Bundle** | 42.78 KB (11.85 KB gzip) |
| **JS Bundle** | 419.59 KB (88.08 KB gzip) |
| **HTML** | 8.43 KB (1.78 KB gzip) |
| **Total** | ~471 KB (~102 KB gzip) |

### Optimizations

- ✅ Debounced search (300ms)
- ✅ Debounced price sliders (500ms)
- ✅ Lazy card rendering
- ✅ Efficient DOM updates
- ✅ Tree-shaken builds
- ✅ CSS purging (automatic)
- ✅ Gzip compression ready

### Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Mobile browsers (iOS 14+, Android 90+)

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

### How to Contribute

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

### Contribution Guidelines

- Follow existing code style
- Add TypeScript types for all new code
- Update documentation for new features
- Test on multiple browsers
- Keep commits atomic and well-described

### Code of Conduct

Please be respectful and constructive in all interactions.

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 richardevcom

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

## 👤 Author

<div align="center">

**richardevcom**

[![Website](https://img.shields.io/badge/Website-richardev.com-orange?style=flat-square&logo=google-chrome)](https://richardev.com)
[![GitHub](https://img.shields.io/badge/GitHub-richardevcom-black?style=flat-square&logo=github)](https://github.com/richardevcom)
[![Twitter](https://img.shields.io/badge/Twitter-@richardevcom-1DA1F2?style=flat-square&logo=twitter)](https://twitter.com/richardevcom)

</div>

---

## 🙏 Acknowledgments

- [Leaflet.js](https://leafletjs.com/) - Interactive map library
- [Natural Earth](https://www.naturalearthdata.com/) - GeoJSON boundary data
- [Shields.io](https://shields.io/) - Badge generation
- [Keep a Changelog](https://keepachangelog.com/) - Changelog format

---

<div align="center">

**⭐ Star this repo if you find it helpful!**

**Built with ❤️ for adventure seekers worldwide**

[Back to Top](#-leaflet-adventure-map)

</div>
