/**
 * Centralized visual configuration for the map
 * Customize all colors, styles, and visual effects here
 */

export interface MapVisualConfig {
  // Base colors
  colors: {
    ocean: string;           // Water/ocean background color
    land: string;            // Land/continent background color (not used with tile layer removed)
    territoryFill: string;   // Default territory fill color
    territoryBorder: string; // Territory border color
    labelBackground: string; // Label background color
    labelText: string;       // Label text color
  };
  
  // Territory styles
  territory: {
    fillOpacity: number;     // Territory fill opacity (0-1)
    borderWeight: number;    // Border thickness in pixels
    borderOpacity: number;   // Border opacity (0-1)
  };
  
  // Hover effects
  hover: {
    enabled: boolean;        // Enable/disable hover effects
    shadowBlur: number;      // Shadow blur radius in pixels
    shadowOpacity: number;   // Shadow opacity (0-1)
    scale: number;           // Scale multiplier (1.0 = no scale, 1.005 = 0.5% larger)
    fillOpacity: number;     // Fill opacity on hover
    borderColor: string;     // Border color on hover
  };
  
  // Active/selected state effects
  active: {
    glowBlur: number;        // Glow blur radius in pixels
    glowOpacity: number;     // Glow opacity (0-1)
    glowSpread: number;      // Glow spread in pixels
    fillOpacity: number;     // Fill opacity when active
    borderColor: string;     // Border color when active
  };
  
  // Label configuration
  label: {
    fontSize: number;        // Font size in pixels
    fontWeight: number;      // Font weight (400 = normal, 600 = semi-bold, 700 = bold)
    padding: {
      vertical: number;      // Vertical padding in pixels
      horizontal: number;    // Horizontal padding in pixels
    };
    borderRadius: number;    // Border radius in pixels
    shadowBlur: number;      // Shadow blur radius in pixels
    shadowOpacity: number;   // Shadow opacity (0-1)
  };
  
  // Map behavior
  map: {
    center: [number, number]; // Initial map center [lat, lng]
    zoom: number;             // Initial zoom level
    minZoom: number;          // Minimum zoom level
    maxZoom: number;          // Maximum zoom level
    fitBoundsPadding: [number, number]; // Padding when fitting bounds [x, y]
    fitBoundsMaxZoom: number; // Maximum zoom when fitting bounds
  };
  
  // Animation settings
  animation: {
    duration: number;        // Animation duration in milliseconds
    easing: string;          // CSS easing function (e.g., 'ease', 'ease-in-out', 'cubic-bezier(...)')
  };
}

// Default visual configuration
export const DEFAULT_VISUAL_CONFIG: MapVisualConfig = {
  colors: {
    ocean: '#ecf0f1',        // Light gray ocean
    land: '#ffffff',         // White land (not used when no tile layer)
    territoryFill: '#ff6b35', // Orange accent color for territories
    territoryBorder: '#ff6b35', // Orange border (matches fill)
    labelBackground: '#000000', // Black label background
    labelText: '#ffffff',    // White label text
  },
  
  territory: {
    fillOpacity: 0.42,
    borderWeight: 2,
    borderOpacity: 1,
  },
  
  hover: {
    enabled: true,
    shadowBlur: 4,
    shadowOpacity: 0.08,
    scale: 1.005,
    fillOpacity: 1,
    borderColor: '#ff6b35',
  },
  
  active: {
    glowBlur: 20,
    glowOpacity: 0.6,
    glowSpread: 4,
    fillOpacity: 1,
    borderColor: '#ff6b35',
  },
  
  label: {
    fontSize: 18,
    fontWeight: 600,
    padding: {
      vertical: 12,
      horizontal: 32,
    },
    borderRadius: 8,
    shadowBlur: 12,
    shadowOpacity: 0.2,
  },
  
  map: {
    center: [20, 0],
    zoom: 2,
    minZoom: 1,
    maxZoom: 18,
    fitBoundsPadding: [50, 50],
    fitBoundsMaxZoom: 8,
  },
  
  animation: {
    duration: 300,
    easing: 'ease',
  },
};

// Export individual style generators
export function getTerritoryStyle(config: MapVisualConfig = DEFAULT_VISUAL_CONFIG) {
  return {
    fillColor: config.colors.territoryFill,
    fillOpacity: config.territory.fillOpacity,
    color: config.colors.territoryBorder,
    weight: config.territory.borderWeight,
    opacity: config.territory.borderOpacity,
  };
}

export function getHoverShadow(config: MapVisualConfig = DEFAULT_VISUAL_CONFIG): string {
  return `0 ${config.hover.shadowBlur / 2}px ${config.hover.shadowBlur}px rgba(0, 0, 0, ${config.hover.shadowOpacity})`;
}

export function getActiveGlow(config: MapVisualConfig = DEFAULT_VISUAL_CONFIG): string {
  // Use hardcoded accent color for glow (matches territoryFill)
  return `0 0 ${config.active.glowBlur}px ${config.active.glowSpread}px rgba(255, 107, 53, ${config.active.glowOpacity})`;
}

export function getLabelShadow(config: MapVisualConfig = DEFAULT_VISUAL_CONFIG): string {
  return `0 4px ${config.label.shadowBlur}px rgba(0, 0, 0, ${config.label.shadowOpacity})`;
}
