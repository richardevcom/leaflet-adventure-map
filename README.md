# 🗺️ Leaflet Adventures Destinations

Interactive map component displaying adventure destinations with territory highlighting. Built with TypeScript, Leaflet.js, and Vite for integration into TribeTravel.eu.

![Version](https://img.shields.io/badge/version-1.0.0-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green)

---

## ✨ Features

- **Interactive Territory Highlighting**: Click and hover on country/city boundaries
- **Three Visual States**: Default (light gray) → Hover (black) → Active (accent color)
- **Smart Selection**: Single-select mode with click-to-toggle functionality
- **Auto-zoom**: Automatically fits map to show all destinations
- **Destination Labels**: Display names on active selection
- **Smooth Transitions**: CSS-powered animations for state changes
- **Type-safe**: Built with TypeScript strict mode
- **Lightweight**: Minimal dependencies, optimized for web
- **Unminified Build**: Readable output for easy integration and debugging

---

## � Debugging

The map includes a comprehensive debugging toolbar to help diagnose issues during development.

### Enable Debug Mode

Add `?debug=true` to the URL:
```
http://localhost:5173/?debug=true
http://yourdomain.com/map?debug=true
```

Or enable programmatically in the browser console:
```javascript
localStorage.setItem('leaflet_debug', JSON.stringify({enabled: true}));
location.reload();
```

### Debug Toolbar Features

- **Verbose Logging**: See detailed console output for all operations
- **Log GeoJSON**: Validate GeoJSON structure and geometry data
- **Log Events**: Track hover, click, and other map interactions
- **Log Styles**: Monitor style changes (hover, active states)
- **Clear Logs**: Reset the debug console
- **Export Logs**: Download complete debug session as JSON
- **Disable Debug**: Turn off debug mode and reload

### Common Issues

**"Invalid GeoJSON object" error:**
- Check if `destinations.geojson` has `geometry` property for all features
- Regenerate GeoJSON: `bun src/utils/generateGeoJSON.ts`
- Enable debug mode to see which feature is missing geometry

**Map not showing territories:**
- Open debug toolbar and check "Log GeoJSON" 
- Verify all features have valid `geometry.coordinates`
- Check browser console for error details

**Styles not applying:**
- Enable "Log Styles" in debug toolbar
- Check if styles are being applied to correct layers
- Verify CSS is loaded (check Network tab)

## �🚀 Quick Start

### Development

```bash
# Install dependencies
bun install

# Start dev server
bun run dev

# Open browser
# http://localhost:5173
```

### Production Build

```bash
# Build unminified output
bun run build

# Preview build
bun run preview
```

### Type Checking

```bash
# Run TypeScript type check
bun run type-check
```

---

## 📦 Installation

### Prerequisites

- **Bun** 1.3+ (or Node.js 18+)
- Modern browser with ES2022 support

### Clone & Install

```bash
git clone <repository-url>
cd leaflet-adventures-destinations
bun install
```

---

## 🎨 Integration

### Option 1: Direct Script Include

```html
<!-- Include CSS -->
<link rel="stylesheet" href="dist/assets/main.css">

<!-- Map container -->
<div id="map"></div>

<!-- Include JS -->
<script type="module" src="dist/assets/main.js"></script>
```

### Option 2: Copy to WordPress Theme

```bash
# Copy dist files to theme assets
cp -r dist/* /path/to/wp-content/themes/your-theme/assets/map/
```

Then include in your theme:

```php
<!-- In your template file -->
<link rel="stylesheet" href="<?php echo get_template_directory_uri(); ?>/assets/map/assets/main.css">
<div id="map"></div>
<script type="module" src="<?php echo get_template_directory_uri(); ?>/assets/map/assets/main.js"></script>
```

### Option 3: CDN Hosting

Upload `dist/` folder to your CDN and reference via absolute URLs.

---

## 🎯 Destinations

Current adventure destinations (10 countries):

1. 🇮🇸 **Iceland** (IS) — Northern lights, glaciers
2. 🇳🇴 **Norway** (NO) — Fjords, wilderness  
3. 🇳🇿 **New Zealand** (NZ) — Mountains, adventure sports
4. 🇨🇷 **Costa Rica** (CR) — Rainforests, wildlife
5. 🇯🇵 **Japan** (JP) — Cultural adventures
6. 🇲🇦 **Morocco** (MA) — Sahara desert, Atlas mountains
7. 🇵🇪 **Peru** (PE) — Machu Picchu, Andes
8. 🇹🇿 **Tanzania** (TZ) — Safaris, Kilimanjaro
9. 🇵🇹 **Portugal** (PT) — Coastal adventures
10. 🇬🇷 **Greece** (GR) — Islands, Mediterranean

### Adding More Destinations

Edit `src/utils/generateGeoJSON.ts` and add countries:

```typescript
const destinations = [
  { name: 'Iceland', code: 'IS', type: 'country' as const },
  { name: 'YourCountry', code: 'XX', type: 'country' as const },
  // ... add more
];
```

Then regenerate GeoJSON:

```bash
bun run src/utils/generateGeoJSON.ts
```

---

## 🎨 Customization

### Colors

Edit `src/utils/mapHelpers.ts`:

```typescript
export const COLORS = {
  accent: '#ff6b35',      // Active state color
  darkGray: '#2c3e50',    // Border color
  lightGray: '#ecf0f1',   // Default background
  black: '#000000',       // Hover background
  white: '#ffffff',       // Contrast
} as const;
```

### Map Configuration

Edit `src/utils/mapHelpers.ts`:

```typescript
export const MAP_CONFIG = {
  center: [20, 0] as [number, number],  // Initial center
  zoom: 2,                              // Initial zoom
  minZoom: 2,                           // Minimum zoom
  maxZoom: 8,                           // Maximum zoom
  padding: [50, 50] as [number, number], // Fit bounds padding
} as const;
```

### Styling

Edit `src/styles/main.scss` to customize appearance.

---

## 📁 Project Structure

```
leaflet-adventures-destinations/
├── .github/
│   ├── copilot-instructions.md    # AI assistant configuration
│   └── persona.md                  # Tone & style guide
├── docs/
│   ├── whitepaper.md               # Architecture documentation
│   ├── TODO.md                     # Development tasks
│   └── CHANGELOG.md                # Version history
├── src/
│   ├── data/
│   │   └── destinations.geojson    # GeoJSON boundary data
│   ├── styles/
│   │   └── main.scss               # Map styles
│   ├── types/
│   │   ├── index.ts                # TypeScript interfaces
│   │   └── geojson.d.ts            # GeoJSON module declaration
│   ├── utils/
│   │   ├── mapHelpers.ts           # Helper functions & config
│   │   └── generateGeoJSON.ts      # GeoJSON generator script
│   ├── map.ts                      # Core map logic
│   └── main.ts                     # Entry point
├── public/
│   └── index.html                  # Development HTML
├── dist/                           # Build output (unminified)
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| **Leaflet** | 1.9.4 | Map rendering & GeoJSON layers |
| **TypeScript** | 5.9.3 | Type-safe development |
| **Vite** | 7.1.x | Dev server & build tool |
| **SCSS** | 1.93.x | Styling |
| **Bun** | 1.3.x | Package manager & runtime |
| **world-geojson** | 3.4.0 | Country boundary data |

---

## 📚 Documentation

- **[Whitepaper](./docs/whitepaper.md)** — Architecture & design decisions
- **[TODO](./docs/TODO.md)** — Development roadmap
- **[CHANGELOG](./docs/CHANGELOG.md)** — Version history
- **[Copilot Instructions](./.github/copilot-instructions.md)** — AI assistant guide

---

## 🌐 External References

### Official Documentation
- [Leaflet 2.0 API](https://leafletjs.com/reference-2.0.0.html)
- [Leaflet Choropleth Tutorial](https://leafletjs.com/examples/choropleth/)
- [TypeScript + Leaflet](https://docs.maptiler.com/leaflet/examples/ts-get-started/)
- [Vite Guide](https://vite.dev/guide/)
- [SCSS Documentation](https://sass-lang.com/documentation/syntax/)

### GeoJSON Data Sources
- [Natural Earth](https://www.naturalearthdata.com/)
- [geoBoundaries](https://www.geoboundaries.org/)
- [world-geojson NPM](https://www.npmjs.com/package/world-geojson)

---

## 🔧 Build Configuration

### Unminified Output

Vite is configured to produce unminified, readable JavaScript:

```typescript
// vite.config.ts
export default defineConfig({
  build: {
    minify: false,           // Keep code readable
    sourcemap: true,         // Generate source maps
    rollupOptions: {
      output: {
        format: 'es',        // ES modules
      },
    },
  },
});
```

### Output Structure

```
dist/
├── assets/
│   ├── main.js         # Unminified JavaScript
│   ├── main.css        # Compiled CSS
│   └── *.geojson       # GeoJSON data
└── index.html
```

---

## 🎯 Usage Example

```typescript
// Initialize map
import { initializeMap } from './map';

// Create map in #map container
const map = initializeMap('map');

// Map is now interactive:
// - Hover over territories to see hover state (black)
// - Click to select (accent color) and show label
// - Click again to deselect
// - Only one territory can be active at a time
```

---

## 🐛 Troubleshooting

### Map not displaying

- Check that `#map` container exists in HTML
- Verify Leaflet CSS is loaded
- Check browser console for errors

### GeoJSON not loading

- Ensure `destinations.geojson` exists in `src/data/`
- Run `bun run src/utils/generateGeoJSON.ts` to regenerate

### TypeScript errors

- Run `bun run type-check` to see all errors
- Ensure `@types/leaflet` and `@types/node` are installed

### Build issues

- Clear `node_modules` and reinstall: `rm -rf node_modules && bun install`
- Clear dist: `rm -rf dist && bun run build`

---

## 📝 License

MIT

---

## 👤 Author

**richardevcom**  
- GitHub: [@richardevcom](https://github.com/richardevcom)
- Project: TribeTravel.eu

---

## 🙏 Acknowledgments

- **Leaflet.js** — Amazing open-source mapping library
- **Natural Earth** — Free geographic data
- **geoBoundaries** — Country boundary datasets
- **CartoDB** — Free tile layers

---

## 🚧 Roadmap

See [TODO.md](./docs/TODO.md) for planned features:

- [ ] Multi-select mode
- [ ] Search/filter functionality
- [ ] Tooltips on hover
- [ ] Database integration
- [ ] API endpoint for dynamic loading
- [ ] React component version

---

**Built with 🖤 for adventure seekers worldwide**
