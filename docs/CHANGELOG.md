# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-26

### 🎉 Initial Release

#### Added
- Interactive Leaflet map with 10 adventure destinations (Iceland, Norway, New Zealand, Costa Rica, Japan, Morocco, Peru, Tanzania, Portugal, Greece)
- Dynamic GeoJSON territory highlighting with three states:
  - **Default**: Light gray (#ecf0f1) background, dark gray (#2c3e50) border
  - **Hover**: Black (#000000) background, black border
  - **Active**: Accent color (#ff6b35) background, accent border
- Single-selection toggle behavior - clicking active territory deselects, clicking new territory switches focus
- Auto-zoom to fit all destinations on map initialization
- Label display on click showing destination name with smooth fade transitions
- TypeScript implementation with strict mode enabled
- SCSS styling with TribeTravel brand colors
- Unminified build output (393.94 kB JS, 21.07 kB CSS) for easy integration
- Comprehensive documentation:
  - `.github/copilot-instructions.md` - AI assistant behavior guide
  - `.github/persona.md` - Tone and style settings
  - `docs/whitepaper.md` - Complete architecture documentation
  - `docs/TODO.md` - Development task tracker
  - `README.md` - Integration guide with 3 deployment options

#### Technical Stack
- Leaflet 1.9.4 for map rendering
- TypeScript 5.9.3 with strict type checking
- Vite 7.1.12 for development and build
- Bun 1.3.1 as package manager
- SCSS 1.93.3 for styling
- world-geojson 3.4.0 for boundary data
- CartoDB light_nolabels tiles as basemap

#### Fixed
- Motion.dev SVG incompatibility - switched to native CSS transitions (0.3s ease-in-out)
- TypeScript JSON module resolution errors - added `resolveJsonModule: true`
- SCSS deprecated `lighten()` function - replaced with predefined color variables
- Vite production build GeoJSON import errors - added @rollup/plugin-json

#### Build Configuration
- Minification disabled for debugging (`minify: false`)
- Source maps enabled (`sourcemap: true`)
- ES module format output
- JSON/GeoJSON import support via Rollup plugin

#### Integration Options
1. Direct HTML integration with script tags
2. WordPress theme integration via PHP template
3. CDN deployment (future)

---

## Future Roadmap

### Planned Features
- Database-driven destination loading via API
- Custom destination markers and icons
- Info panels with destination details
- Multi-language support (EN, DE, NL, ES)
- Mobile-optimized touch interactions
- Destination filtering by activity type
- Search functionality
- Share/embed capabilities
- Analytics integration
- Performance optimizations for 50+ destinations

### Known Limitations
- Static GeoJSON data (v1.0.0)
- Single-selection only
- No mobile-specific optimizations yet
- No backend integration

---

[1.0.0]: https://github.com/richardevcom/leaflet-adventures-destinations/releases/tag/v1.0.0
