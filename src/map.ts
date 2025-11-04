/**
 * Core map logic and initialization
 */

import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import type { MapState, DestinationsCollection } from './types';
import { defaultStyle, MAP_CONFIG } from './utils/mapHelpers';
import { DEFAULT_VISUAL_CONFIG } from './utils/visualConfig';
import { debugLog, debugGeoJSON, debugEvent } from './utils/debugger';
import { createSidebar, updateSidebarState } from './components/sidebar';
import mapPinSvg from './assets/map-pin.svg?raw';

// Map state
const state: MapState = {
  activeCountry: null,
  activeCity: null,
  hoveredLayer: null,
  labelText: null,
  labelLocked: false,
};

// Map of country codes to their Leaflet layers (array to handle MultiPolygon)
const countryLayers = new Map<string, L.Layer[]>();

// Map of city codes to their marker elements
const cityMarkers = new Map<string, L.Marker>();

// Destinations data (loaded once, used for labels)
let destinationsData: DestinationsCollection | null = null;

// Label element for displaying destination names
let labelElement: HTMLElement | null = null;

// Map instance (stored for zoom operations)
let mapInstance: L.Map | null = null;

// GeoJSON layer (stored for bounds calculations)
let geoJsonLayer: L.GeoJSON | null = null;

// World land layer cache (prevent garbage collection and flickering)
let worldLandLayerCache: L.GeoJSON | null = null;

/**
 * Load GeoJSON data via fetch (works in both dev and prod)
 */
async function loadGeoJSONData(): Promise<DestinationsCollection> {
  debugLog('info', 'Fetching GeoJSON data...');
  const response = await fetch('/src/data/destinations.geojson');
  if (!response.ok) {
    throw new Error(`Failed to load GeoJSON: ${response.statusText}`);
  }
  const data = await response.json();
  debugLog('success', 'GeoJSON data loaded successfully', { 
    type: data.type, 
    featureCount: data.features?.length 
  });
  return data as DestinationsCollection;
}

/**
 * Create custom map pin icon
 */
function createMapPinIcon(state: 'default' | 'white' | 'black'): L.DivIcon {
  // default: accent color, white: #ffffff, black: #000000
  const colorMap = {
    default: DEFAULT_VISUAL_CONFIG.colors.territoryFill,
    white: '#ffffff',
    black: '#000000',
  };
  const color = colorMap[state];
  const svg = mapPinSvg.replace('fill="#000"', `fill="${color}"`);
  
  return L.divIcon({
    html: `<div class="custom-marker ${state === 'black' ? 'active' : ''}">${svg}</div>`,
    className: 'map-pin-icon',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });
}

/**
 * Initialize and create the map
 */
export async function initializeMap(containerId: string): Promise<L.Map> {
  debugLog('info', '🗺️ Initializing map...', { containerId, config: MAP_CONFIG });

  // Load GeoJSON data
  destinationsData = await loadGeoJSONData();
  
  // Validate GeoJSON data before using it
  debugGeoJSON('Loaded destinations', destinationsData);

  // Create map instance
  const map = L.map(containerId, {
    center: MAP_CONFIG.center,
    zoom: MAP_CONFIG.zoom,
    minZoom: MAP_CONFIG.minZoom,
    maxZoom: MAP_CONFIG.maxZoom,
    zoomControl: true,
    attributionControl: true,
    preferCanvas: false, // Use SVG for better quality
    fadeAnimation: true,
    zoomAnimation: true,
    markerZoomAnimation: true,
    renderer: L.svg({ padding: 1.5 }), // Extra padding to prevent clipping and reduce redraws
  });

  // Store map instance for zoom operations
  mapInstance = map;

  debugLog('success', 'Map instance created', { zoom: map.getZoom(), center: map.getCenter() });

  // Add world land layer (white background for all continents)
  // Using Natural Earth 50m for higher resolution to better match destination boundaries
  debugLog('info', 'Loading world land GeoJSON...');
  try {
    const worldLandResponse = await fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_land.geojson');
    if (worldLandResponse.ok) {
      const worldLandData = await worldLandResponse.json();
      worldLandLayerCache = L.geoJson(worldLandData, {
        style: {
          fillColor: DEFAULT_VISUAL_CONFIG.colors.land,
          fillOpacity: 1,
          color: DEFAULT_VISUAL_CONFIG.colors.land,
          weight: 0,
          opacity: 0,
        },
        interactive: false,
        pane: 'tilePane', // Put in background pane to prevent flickering
        // @ts-ignore - bubblingMouseEvents is valid but not in types
        bubblingMouseEvents: false,
      }).addTo(map);
      
      // Ensure layer stays in memory and doesn't get garbage collected
      (window as any).__worldLandLayer = worldLandLayerCache;
      
      debugLog('success', 'World land layer added (white continents, 50m resolution)');
    } else {
      debugLog('warn', 'Could not load world land data, skipping white continent layer');
    }
  } catch (error) {
    debugLog('warn', 'Failed to load world land layer', { error });
  }

  // No additional tile layer - pure blank canvas
  // Ocean/water color is set via CSS on #map container (light gray)
  // Land is white (from world GeoJSON layer above)
  debugLog('info', 'Using blank canvas (no tile layer) - ocean color set via CSS');

  // Create label element
  labelElement = createLabelElement();
  document.body.appendChild(labelElement);

  debugLog('info', 'Label element created');

  try {
    // Add country territories (GeoJSON layer)
    // Load Natural Earth 10m countries data which has proper MultiPolygon support
    debugLog('info', 'Loading Natural Earth countries data for accurate geometries...');
    
    let territoriesCollection: GeoJSON.FeatureCollection | null = null;
    
    try {
      // Fetch Natural Earth 10m cultural data (countries with proper MultiPolygon)
      const countriesResponse = await fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson');
      
      if (countriesResponse.ok) {
        const worldCountries = await countriesResponse.json();
        
        // Create maps for both ISO code and name matching
        const destCountriesMap = new Map(
          destinationsData.features.map(f => [f.properties.code, f])
        );
        
        const destCountriesNameMap = new Map(
          destinationsData.features.map(f => [f.properties.name, f])
        );
        
        // Filter and merge with our destination data
        const territoryFeatures = worldCountries.features
          .filter((feature: any) => {
            const isoA2 = feature.properties.ISO_A2;
            const adminName = feature.properties.ADMIN;
            
            // Match by ISO_A2 if valid (not "-99")
            if (isoA2 && isoA2 !== '-99' && destCountriesMap.has(isoA2)) {
              return true;
            }
            
            // Fallback: match by country name (ADMIN field)
            if (adminName && destCountriesNameMap.has(adminName)) {
              return true;
            }
            
            return false;
          })
          .map((feature: any) => {
            const isoA2 = feature.properties.ISO_A2;
            const adminName = feature.properties.ADMIN;
            
            // Try to find destination feature by ISO code first
            let destFeature = (isoA2 && isoA2 !== '-99') ? destCountriesMap.get(isoA2) : null;
            
            // Fallback to name matching if ISO didn't work
            if (!destFeature && adminName) {
              destFeature = destCountriesNameMap.get(adminName);
            }
            
            // Use the code from our destinations data, not Natural Earth
            const code = destFeature?.properties.code || isoA2;
            
            return {
              type: 'Feature',
              geometry: feature.geometry, // MultiPolygon from Natural Earth
              properties: {
                code: code,
                name: destFeature?.properties.name || feature.properties.NAME,
                type: 'country',
                cities: destFeature?.properties.cities || [],
              },
            };
          });
        
        territoriesCollection = {
          type: 'FeatureCollection',
          features: territoryFeatures,
        };
        
        debugLog('success', 'Loaded Natural Earth countries with MultiPolygon support', {
          count: territoryFeatures.length
        });
      }
    } catch (error) {
      debugLog('warn', 'Failed to load Natural Earth data, using fallback', { error });
    }
    
    // Fallback to our destinations.geojson if Natural Earth fails
    if (!territoriesCollection) {
      territoriesCollection = destinationsData as GeoJSON.FeatureCollection;
      debugLog('warn', 'Using destinations.geojson as fallback (may have incomplete island coverage)');
    }

    geoJsonLayer = L.geoJson(territoriesCollection, {
      style: defaultStyle,
      pane: 'overlayPane', // Ensure proper layering
      // @ts-ignore - bubblingMouseEvents is valid but not in types
      bubblingMouseEvents: false, // Prevent event bubbling for performance
      onEachFeature: (feature, layer) => {
        const countryCode = feature.properties.code;
        
        // Store all sub-layers for this country (handles MultiPolygon)
        if (!countryLayers.has(countryCode)) {
          countryLayers.set(countryCode, []);
        }
        countryLayers.get(countryCode)!.push(layer);
        
        // Bind events
        layer.on({
          mouseover: (e) => handleCountryHover(e, countryCode),
          mouseout: handleCountryMouseOut,
          click: (e) => handleCountryClick(e, countryCode),
        });
      },
    }).addTo(map);

    debugLog('success', 'Country territories added with proper MultiPolygon support', { 
      bounds: geoJsonLayer.getBounds(),
      layerCount: countryLayers.size
    });

    // Add city markers
    debugLog('info', 'Adding city markers...');
    let cityCount = 0;
    
    destinationsData.features.forEach((feature) => {
      const { code: countryCode, cities } = feature.properties;
      if (!cities) return;

      cities.forEach((city) => {
        const marker = L.marker([city.lat, city.lng], {
          icon: createMapPinIcon('default'),
          // @ts-ignore - bubblingMouseEvents is valid but not in types
          bubblingMouseEvents: false, // Prevent event bubbling
          keyboard: false, // Disable keyboard interaction for performance
        }).addTo(map);

        marker.on('click', () => handleCityClick(city.code, countryCode));
        marker.on('mouseover', () => handleCityHover(city.code, countryCode, city.name));
        marker.on('mouseout', () => handleCityHoverEnd(city.code, countryCode));

        cityMarkers.set(city.code, marker);
        cityCount++;
      });
    });

    debugLog('success', `Added ${cityCount} city markers`);

    // Auto-fit to show all destinations with smooth initial animation
    const bounds = geoJsonLayer.getBounds();
    map.fitBounds(bounds, { 
      padding: [20, 20],
      maxZoom: MAP_CONFIG.fitBoundsMaxZoom,
      animate: false, // No animation on initial load for instant display
    });
    debugLog('success', 'Map fitted to bounds', { bounds });

    // Create and add sidebar
    const sidebar = createSidebar(destinationsData, {
      onCountryClick: (countryCode) => selectCountry(countryCode, true),
      onCityClick: (cityCode, countryCode) => selectCity(cityCode, countryCode, true),
      onCountryHover: (countryCode, countryName) => {
        // Apply hover state to territory
        const layers = countryLayers.get(countryCode);
        if (layers && state.activeCountry !== countryCode) {
          layers.forEach(layer => {
            (layer as L.Path).setStyle({
              fillOpacity: DEFAULT_VISUAL_CONFIG.hover.fillOpacity,
              color: DEFAULT_VISUAL_CONFIG.hover.borderColor,
            });
          });
          updateCityMarkers(countryCode, 'white');
        }
        showLabel(countryName, false);
      },
      onCountryHoverEnd: () => {
        // Restore default if not active
        countryLayers.forEach((layers, code) => {
          if (state.activeCountry !== code) {
            layers.forEach(layer => {
              (layer as L.Path).setStyle({
                fillOpacity: DEFAULT_VISUAL_CONFIG.territory.fillOpacity,
                color: DEFAULT_VISUAL_CONFIG.colors.territoryBorder,
              });
            });
            updateCityMarkers(code, 'default');
          }
        });
        hideLabel();
      },
      onCityHover: (cityCode, cityName) => {
        const marker = cityMarkers.get(cityCode);
        if (marker && state.activeCity !== cityCode) {
          marker.setIcon(createMapPinIcon('black'));
        }
        showLabel(cityName, false);
      },
      onCityHoverEnd: () => {
        // Restore markers based on state
        cityMarkers.forEach((marker, code) => {
          if (state.activeCity !== code) {
            const countryCode = findCityCountry(code);
            if (countryCode && state.activeCountry === countryCode) {
              marker.setIcon(createMapPinIcon('white'));
            } else if (state.activeCity !== code) {
              marker.setIcon(createMapPinIcon('default'));
            }
          }
        });
        hideLabel();
      },
    });
    document.body.appendChild(sidebar);
    debugLog('success', 'Sidebar added');

  } catch (error) {
    debugLog('error', 'Failed to initialize map layers', { 
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    throw error;
  }

  return map;
}

/**
 * Create label element for destination names
 */
function createLabelElement(): HTMLElement {
  const label = document.createElement('div');
  label.id = 'destination-label';
  label.className = 'destination-label';
  label.style.display = 'none';
  return label;
}

/**
 * Get bounds for all destinations (countries + cities)
 */
function getAllDestinationsBounds(): L.LatLngBounds | null {
  if (!geoJsonLayer) return null;
  return geoJsonLayer.getBounds();
}

/**
 * Get bounds for a specific country's mainland territory
 * Always focuses on the largest landmass (mainland) and adds proportional buffer
 * This ensures consistent zoom levels across all countries regardless of distant territories
 */
function getCountryBounds(countryCode: string): L.LatLngBounds | null {
  if (!destinationsData) {
    debugLog('error', 'No destinations data available');
    return null;
  }
  
  const country = destinationsData.features.find(f => f.properties.code === countryCode);
  const layers = countryLayers.get(countryCode);
  
  if (!layers || layers.length === 0) {
    debugLog('error', 'No layers found for country', { countryCode });
    return null;
  }
  
  // Get city locations to identify where the mainland is
  const cityLocations: L.LatLng[] = [];
  if (country?.properties.cities && country.properties.cities.length > 0) {
    country.properties.cities.forEach(city => {
      const marker = cityMarkers.get(city.code);
      if (marker) {
        cityLocations.push(marker.getLatLng());
      }
    });
  }
  
  // Find the polygon that contains or is closest to the cities (the mainland)
  let mainlandBounds: L.LatLngBounds | null = null;
  let bestScore = -Infinity;
  
  layers.forEach(layer => {
    const layerBounds = (layer as any).getBounds?.();
    if (!layerBounds) return;
    
    // Calculate area
    const latSpan = Math.abs(layerBounds.getNorth() - layerBounds.getSouth());
    const lngSpan = Math.abs(layerBounds.getEast() - layerBounds.getWest());
    const area = latSpan * lngSpan;
    
    // If we have cities, score based on how many cities are within this polygon's bounds
    // Otherwise, just use area (largest polygon wins)
    let score = area;
    
    if (cityLocations.length > 0) {
      let citiesInBounds = 0;
      cityLocations.forEach(cityLatLng => {
        if (layerBounds.contains(cityLatLng)) {
          citiesInBounds++;
        }
      });
      
      // Prioritize polygons that contain cities, even if smaller
      // Score = (cities contained * 1000) + area
      // This ensures mainland with cities beats distant territories
      score = (citiesInBounds * 1000) + area;
    }
    
    if (score > bestScore) {
      bestScore = score;
      mainlandBounds = layerBounds;
    }
  });
  
  if (!mainlandBounds) {
    debugLog('error', 'Failed to calculate mainland bounds', { countryCode });
    return null;
  }
  
  // Add smart buffer around mainland based on country dimensions
  // Elongated countries (Norway, NZ, Portugal, Japan) get smaller buffer to avoid over-expansion
  const latSpan = Math.abs((mainlandBounds as L.LatLngBounds).getNorth() - (mainlandBounds as L.LatLngBounds).getSouth());
  const lngSpan = Math.abs((mainlandBounds as L.LatLngBounds).getEast() - (mainlandBounds as L.LatLngBounds).getWest());
  
  // Calculate aspect ratio (larger value / smaller value)
  const aspectRatio = Math.max(latSpan, lngSpan) / Math.min(latSpan, lngSpan);
  
  // Adaptive buffer: smaller buffer for elongated countries, larger for compact ones
  // aspectRatio 1.0 (square) = 25% buffer
  // aspectRatio 2.0+ (elongated) = 15% buffer
  // aspectRatio 3.0+ (very elongated) = 10% buffer
  let bufferRatio: number;
  if (aspectRatio >= 3.0) {
    bufferRatio = 0.10; // Very elongated (Norway, NZ)
  } else if (aspectRatio >= 2.0) {
    bufferRatio = 0.15; // Elongated (Portugal, Japan)
  } else {
    bufferRatio = 0.25; // Compact (Iceland, Greece, etc.)
  }
  
  const bufferLat = latSpan * bufferRatio;
  const bufferLng = lngSpan * bufferRatio;
  
  // Create expanded bounds
  const finalBounds = L.latLngBounds(
    [(mainlandBounds as L.LatLngBounds).getSouth() - bufferLat, (mainlandBounds as L.LatLngBounds).getWest() - bufferLng],
    [(mainlandBounds as L.LatLngBounds).getNorth() + bufferLat, (mainlandBounds as L.LatLngBounds).getEast() + bufferLng]
  );
  
  debugLog('info', 'Mainland bounds calculated with smart buffer', {
    countryCode,
    cities: cityLocations.length,
    mainland: {
      latSpan: latSpan.toFixed(2),
      lngSpan: lngSpan.toFixed(2),
      aspectRatio: aspectRatio.toFixed(2)
    },
    buffer: {
      lat: bufferLat.toFixed(2),
      lng: bufferLng.toFixed(2),
      ratio: `${bufferRatio * 100}%`
    },
    final: {
      sw: finalBounds.getSouthWest(),
      ne: finalBounds.getNorthEast(),
      valid: finalBounds.isValid()
    }
  });
  
  return finalBounds;
}

/**
 * Zoom map to fit all destinations
 */
function zoomToAllDestinations(): void {
  if (!mapInstance) return;
  
  const bounds = getAllDestinationsBounds();
  if (bounds) {
    const currentZoom = mapInstance.getZoom();
    
    // Smooth zoom out transition
    if (currentZoom > 4) {
      // First zoom out a bit
      mapInstance.setZoom(currentZoom - 1, {
        animate: true,
        duration: 0.4,
      });
      
      // Then fit to all bounds
      setTimeout(() => {
        if (mapInstance) {
          mapInstance.fitBounds(bounds, { 
            padding: [20, 20],
            maxZoom: MAP_CONFIG.fitBoundsMaxZoom,
            animate: true,
            duration: 0.9,
            easeLinearity: 0.2,
          });
        }
      }, 450);
    } else {
      // Direct fit if already zoomed out
      mapInstance.fitBounds(bounds, { 
        padding: [20, 20],
        maxZoom: MAP_CONFIG.fitBoundsMaxZoom,
        animate: true,
        duration: 0.8,
        easeLinearity: 0.2,
      });
    }
    
    debugLog('info', 'Zoomed to all destinations');
  }
}

/**
 * Zoom map to fit a specific country with smooth transition
 * @param countryCode - Country to zoom to
 * @param smooth - If true, zoom out slightly first for smooth transition
 */
function zoomToCountry(countryCode: string, smooth: boolean = true): void {
  if (!mapInstance) return;
  
  const bounds = getCountryBounds(countryCode);
  if (!bounds) {
    debugLog('error', 'Failed to get bounds for country', { countryCode });
    return;
  }
  
  if (!bounds.isValid()) {
    debugLog('error', 'Invalid bounds for country', { 
      countryCode,
      bounds: {
        sw: bounds.getSouthWest(),
        ne: bounds.getNorthEast()
      }
    });
    return;
  }
  
  const center = bounds.getCenter();
  const currentZoom = mapInstance.getZoom();
  
  debugLog('info', 'Starting zoom to country', { 
    countryCode, 
    smooth,
    currentZoom,
    targetBounds: {
      sw: bounds.getSouthWest(),
      ne: bounds.getNorthEast()
    }
  });
  
  if (smooth && currentZoom > 3) {
    // Step 1: Zoom out slightly while panning to new location
    const intermediateZoom = Math.max(2.5, currentZoom - 1.5);
    mapInstance.flyTo(center, intermediateZoom, {
      duration: 0.6,
      easeLinearity: 0.15,
    });
    
    // Step 2: After zoom out completes, zoom back in to fit bounds
    setTimeout(() => {
      if (mapInstance) {
        mapInstance.fitBounds(bounds, {
          padding: [50, 50],
          maxZoom: MAP_CONFIG.fitBoundsMaxZoom,
          animate: true,
          duration: 0.8,
          easeLinearity: 0.2,
        });
      }
    }, 650);
  } else {
    // Direct zoom for initial load or when already zoomed out
    mapInstance.fitBounds(bounds, {
      padding: [50, 50],
      maxZoom: MAP_CONFIG.fitBoundsMaxZoom,
      animate: true,
      duration: 0.8,
      easeLinearity: 0.2,
    });
  }
  
  debugLog('info', 'Zoomed to country', { countryCode, smooth });
}

/**
 * Zoom map to center on a specific city
 * @param cityCode - City to zoom to
 * @param countryCode - Country the city belongs to
 * @param smooth - If true, zoom out slightly first for smooth transition
 */
function zoomToCity(cityCode: string, countryCode: string, smooth: boolean = true): void {
  if (!mapInstance || !destinationsData) return;
  
  // Find city coordinates
  const country = destinationsData.features.find(f => f.properties.code === countryCode);
  const city = country?.properties.cities?.find(c => c.code === cityCode);
  if (!city) return;
  
  const cityLatLng = L.latLng(city.lat, city.lng);
  const currentZoom = mapInstance.getZoom();
  const targetZoom = Math.min(MAP_CONFIG.fitBoundsMaxZoom, 7);
  
  if (smooth && currentZoom > 3) {
    // Step 1: Zoom out slightly while panning to city
    const intermediateZoom = Math.max(3, currentZoom - 1);
    mapInstance.flyTo(cityLatLng, intermediateZoom, {
      duration: 0.6,
      easeLinearity: 0.15,
    });
    
    // Step 2: Zoom in to center on city
    setTimeout(() => {
      if (mapInstance) {
        mapInstance.flyTo(cityLatLng, targetZoom, {
          duration: 0.7,
          easeLinearity: 0.2,
        });
      }
    }, 650);
  } else {
    // Direct zoom
    mapInstance.flyTo(cityLatLng, targetZoom, {
      duration: 0.8,
      easeLinearity: 0.2,
    });
  }
  
  debugLog('info', 'Zoomed to city', { cityCode, cityName: city.name, smooth });
}

/**
 * Find which country a city belongs to
 */
function findCityCountry(cityCode: string): string | null {
  if (!destinationsData) return null;
  
  const feature = destinationsData.features.find(f => 
    f.properties.cities?.some(city => city.code === cityCode)
  );
  
  return feature?.properties.code || null;
}

/**
 * Update city markers based on country state
 */
function updateCityMarkers(countryCode: string, markerState: 'default' | 'white' | 'black'): void {
  if (!destinationsData) return;
  
  const country = destinationsData.features.find(f => f.properties.code === countryCode);
  if (!country?.properties.cities) return;
  
  // Update markers with subtle stagger for smooth visual effect
  country.properties.cities.forEach((city, index) => {
    const marker = cityMarkers.get(city.code);
    if (marker && state.activeCity !== city.code) {
      // Add small delay for stagger effect (20ms per marker)
      setTimeout(() => {
        marker.setIcon(createMapPinIcon(markerState));
      }, index * 20);
    }
  });
}

/**
 * Select a country (territory)
 */
function selectCountry(countryCode: string, fromSidebar: boolean = false): void {
  const layers = countryLayers.get(countryCode);
  if (!layers) return;

  debugEvent('selectCountry', { countryCode, fromSidebar });

  // Toggle if clicking the same country
  if (state.activeCountry === countryCode) {
    // Deselect country
    layers.forEach(layer => {
      (layer as L.Path).getElement()?.classList.remove('territory-active');
      (layer as L.Path).setStyle({
        fillOpacity: DEFAULT_VISUAL_CONFIG.territory.fillOpacity,
        color: DEFAULT_VISUAL_CONFIG.colors.territoryBorder,
      });
    });
    state.activeCountry = null;
    state.activeCity = null;
    unlockLabel();
    
    // Reset all city markers to default
    cityMarkers.forEach((marker) => {
      marker.setIcon(createMapPinIcon('default'));
    });
    
    // Zoom back to all destinations
    zoomToAllDestinations();
  } else {
    // Deselect previous country
    if (state.activeCountry) {
      const prevLayers = countryLayers.get(state.activeCountry);
      if (prevLayers) {
        prevLayers.forEach(layer => {
          (layer as L.Path).getElement()?.classList.remove('territory-active');
          (layer as L.Path).setStyle({
            fillOpacity: DEFAULT_VISUAL_CONFIG.territory.fillOpacity,
            color: DEFAULT_VISUAL_CONFIG.colors.territoryBorder,
          });
        });
      }
      // Reset previous country's cities to default
      updateCityMarkers(state.activeCountry, 'default');
    }

    // Select new country
    layers.forEach(layer => {
      (layer as L.Path).getElement()?.classList.add('territory-active');
      (layer as L.Path).setStyle({
        fillOpacity: DEFAULT_VISUAL_CONFIG.active.fillOpacity,
        color: DEFAULT_VISUAL_CONFIG.active.borderColor,
      });
    });
    state.activeCountry = countryCode;
    state.activeCity = null;
    
    // Show country name label (locked)
    const feature = (layers[0] as any).feature as GeoJSON.Feature;
    showLabel(feature.properties?.name || '', true);

    // Set all cities in this country to white
    updateCityMarkers(countryCode, 'white');
    
    // Zoom to country bounds with smooth transition
    zoomToCountry(countryCode, true);
  }

  // Update sidebar state
  updateSidebarState(state.activeCountry, state.activeCity);
}

/**
 * Select a city (marker)
 */
function selectCity(cityCode: string, countryCode: string, fromSidebar: boolean = false): void {
  const marker = cityMarkers.get(cityCode);
  if (!marker) return;

  debugEvent('selectCity', { cityCode, countryCode, fromSidebar });

  // Always select the country first (this will zoom to country)
  if (state.activeCountry !== countryCode) {
    selectCountry(countryCode, false);
    // Note: selectCountry already zooms to country bounds
  }

  // Toggle if clicking the same city
  if (state.activeCity === cityCode) {
    // Deselect city - back to white (country is still active)
    marker.setIcon(createMapPinIcon('white'));
    state.activeCity = null;
    
    // Restore country label
    const countryLayers_arr = countryLayers.get(countryCode);
    if (countryLayers_arr && countryLayers_arr.length > 0) {
      const feature = (countryLayers_arr[0] as any).feature as GeoJSON.Feature;
      showLabel(feature.properties?.name || '', true);
    }
  } else {
    // Deselect previous city
    if (state.activeCity) {
      const prevMarker = cityMarkers.get(state.activeCity);
      if (prevMarker) {
        prevMarker.setIcon(createMapPinIcon('white')); // Back to white
      }
    }

    // Select new city - black
    marker.setIcon(createMapPinIcon('black'));
    state.activeCity = cityCode;
    
    // Show city name label (locked)
    if (destinationsData) {
      const cityData = destinationsData.features
        .find(f => f.properties.code === countryCode)?.properties.cities
        ?.find(c => c.code === cityCode);
      if (cityData) {
        showLabel(cityData.name, true);
      }
    }
    
    // Zoom to center on the city
    zoomToCity(cityCode, countryCode, true);
  }

  // Update sidebar state
  updateSidebarState(state.activeCountry, state.activeCity);
}

/**
 * Handle country territory hover
 */
function handleCountryHover(e: L.LeafletMouseEvent, countryCode: string): void {
  const layer = e.target as L.Path;

  debugEvent('countryHover', { countryCode });

  // Don't apply hover if this country is active
  if (state.activeCountry === countryCode) {
    return;
  }

  // Apply hover CSS class and style
  layer.getElement()?.classList.add('territory-hover');
  layer.setStyle({
    fillOpacity: DEFAULT_VISUAL_CONFIG.hover.fillOpacity,
    color: DEFAULT_VISUAL_CONFIG.hover.borderColor,
  });
  
  // Set cities in this country to white
  updateCityMarkers(countryCode, 'white');
  
  // Store hovered layer
  state.hoveredLayer = layer;

  // Show country name (temporary, not locked)
  const feature = (layer as any).feature as GeoJSON.Feature;
  showLabel(feature.properties?.name || '', false);
}

/**
 * Handle country territory mouse out
 */
function handleCountryMouseOut(e: L.LeafletMouseEvent): void {
  const layer = e.target as L.Path;
  const feature = (layer as any).feature as GeoJSON.Feature;
  const countryCode = feature.properties?.code;

  debugEvent('countryMouseOut', { countryCode });

  // Remove hover class and restore default style
  layer.getElement()?.classList.remove('territory-hover');
  layer.setStyle({
    fillOpacity: DEFAULT_VISUAL_CONFIG.territory.fillOpacity,
    color: DEFAULT_VISUAL_CONFIG.colors.territoryBorder,
  });
  
  // Reset cities to default
  if (countryCode) {
    updateCityMarkers(countryCode, 'default');
  }
  
  // Clear hovered layer
  state.hoveredLayer = null;

  // Hide label (or restore locked one)
  hideLabel();
}

/**
 * Handle city marker hover
 */
function handleCityHover(cityCode: string, countryCode: string, cityName: string): void {
  const marker = cityMarkers.get(cityCode);
  if (!marker) return;

  debugEvent('cityHover', { cityCode, countryCode });

  // Change to black on hover (unless already active)
  if (state.activeCity !== cityCode) {
    marker.setIcon(createMapPinIcon('black'));
  }

  // Show city name (temporary, not locked)
  showLabel(cityName, false);
}

/**
 * Handle city marker hover end
 */
function handleCityHoverEnd(cityCode: string, countryCode: string): void {
  const marker = cityMarkers.get(cityCode);
  if (!marker) return;

  debugEvent('cityHoverEnd', { cityCode, countryCode });

  // Restore appropriate color based on state
  if (state.activeCity === cityCode) {
    // Keep black if active
    return;
  } else if (state.activeCountry === countryCode) {
    // White if country is active
    marker.setIcon(createMapPinIcon('white'));
  } else {
    // Default accent color
    marker.setIcon(createMapPinIcon('default'));
  }

  // Hide label (or restore locked one)
  hideLabel();
}

/**
 * Handle country territory click
 */
function handleCountryClick(_e: L.LeafletMouseEvent, countryCode: string): void {
  debugEvent('countryClick', { countryCode });
  selectCountry(countryCode, false);
}

/**
 * Handle city marker click
 */
function handleCityClick(cityCode: string, countryCode: string): void {
  debugEvent('cityClick', { cityCode, countryCode });
  selectCity(cityCode, countryCode, false);
}

/**
 * Show label with destination name (respects locked state)
 */
function showLabel(name: string, lock: boolean = false): void {
  if (!labelElement) return;

  debugLog('info', `Showing label: ${name}, lock: ${lock}`);
  
  state.labelText = name;
  if (lock) {
    state.labelLocked = true;
  }
  
  labelElement.textContent = name;
  
  if (labelElement.style.display !== 'block') {
    labelElement.style.display = 'block';
    labelElement.style.opacity = '0';
    // Fade in
    setTimeout(() => {
      if (labelElement) {
        labelElement.style.opacity = '1';
      }
    }, 10);
  } else {
    // Just update text if already visible
    labelElement.textContent = name;
  }
}

/**
 * Hide label (only if not locked)
 */
function hideLabel(): void {
  if (!labelElement) return;

  // If locked, restore the locked label instead of hiding
  if (state.labelLocked && state.labelText) {
    debugLog('info', 'Label locked, restoring:', state.labelText);
    labelElement.textContent = state.labelText;
    return;
  }

  debugLog('info', 'Hiding label');
  state.labelText = null;
  labelElement.style.opacity = '0';

  // Hide after transition completes
  setTimeout(() => {
    if (labelElement && !state.labelLocked) {
      labelElement.style.display = 'none';
    }
  }, DEFAULT_VISUAL_CONFIG.animation.duration);
}

/**
 * Unlock and hide label (for deselection)
 */
function unlockLabel(): void {
  state.labelLocked = false;
  state.labelText = null;
  hideLabel();
}
