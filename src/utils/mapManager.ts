/**
 * Map Manager - Handles Leaflet map initialization and operations
 */

import L, { type Map, type Layer } from 'leaflet';
import type { 
  Adventure, 
  MapConfig, 
  PriceMarkerData, 
  NaturalEarthProperties 
} from '../types/index.js';
import { formatPrice, getDisplayPrice } from './searchManager.js';

const DEFAULT_MAP_CONFIG: MapConfig = {
  center: [45, 10],
  zoom: 3,
  minZoom: 2,
  scrollWheelZoom: true,
  zoomControl: false,
  maxBounds: [[-90, -180], [90, 180]]
};

const NATURAL_EARTH_LAND_URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_land.geojson';
const NATURAL_EARTH_COUNTRIES_URL = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson';

/**
 * Initialize Leaflet map
 */
export function initializeMap(
  containerId: string,
  config: Partial<MapConfig> = {}
): Map {
  const mapConfig = { ...DEFAULT_MAP_CONFIG, ...config };
  
  const map = L.map(containerId, {
    center: mapConfig.center,
    zoom: mapConfig.zoom,
    zoomControl: mapConfig.zoomControl,
    scrollWheelZoom: mapConfig.scrollWheelZoom,
    minZoom: mapConfig.minZoom,
    maxBounds: mapConfig.maxBounds,
    maxBoundsViscosity: 1.0
  });
  
  // Add zoom control to top-right
  L.control.zoom({
    position: 'topright'
  }).addTo(map);
  
  return map;
}

/**
 * Load and add land layer (white continents on gray ocean)
 */
export async function addLandLayer(map: Map): Promise<Layer> {
  const response = await fetch(NATURAL_EARTH_LAND_URL);
  const data = await response.json();
  
  const layer = L.geoJson(data, {
    style: {
      fillColor: '#ffffff',
      fillOpacity: 1,
      color: '#ffffff',
      weight: 0,
      opacity: 0,
    },
    interactive: false,
    pane: 'tilePane'
  }).addTo(map);
  
  return layer;
}

/**
 * Load and add territory layer (country polygons for countries with adventures)
 */
export async function addTerritoryLayer(
  map: Map,
  adventureCountries: string[],
  onTerritoryClick: (countryCode: string) => void
): Promise<Layer> {
  const response = await fetch(NATURAL_EARTH_COUNTRIES_URL);
  const data = await response.json();
  
  const layer = L.geoJson(data, {
    filter: (feature) => {
      const properties = feature.properties as NaturalEarthProperties;
      const iso = properties?.ISO_A2;
      
      return iso ? adventureCountries.includes(iso) : false;
    },
    style: {
      fillColor: '#EA5B10',
      fillOpacity: 0.15,
      color: '#EA5B10',
      weight: 1.5,
      opacity: 0.6,
    },
    interactive: true,
    pane: 'overlayPane',
    onEachFeature: (feature, territoryLayer) => {
      const properties = feature.properties as NaturalEarthProperties;
      const iso = properties?.ISO_A2;
      
      // Click territory to filter by that country only
      territoryLayer.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        
        if (iso) {
          onTerritoryClick(iso);
        }
      });
    }
  }).addTo(map);
  
  return layer;
}

/**
 * Create custom price marker icon
 */
export function createPriceMarkerIcon(adventure: Adventure): L.DivIcon {
  const displayPrice = getDisplayPrice(adventure);
  const formattedPrice = formatPrice(displayPrice);
  
  return L.divIcon({
    className: 'price-pin-icon',
    html: `<div class="price-pin">${formattedPrice}</div>`,
    iconSize: [80, 35],
    iconAnchor: [40, 40]
  });
}

/**
 * Add price markers for adventures
 */
export function addPriceMarkers(
  map: Map,
  adventures: Adventure[],
  onMarkerClick: (adventureId: string) => void
): PriceMarkerData[] {
  const markerData: PriceMarkerData[] = [];
  
  adventures.forEach(adventure => {
    const icon = createPriceMarkerIcon(adventure);
    
    const marker = L.marker([adventure.lat, adventure.lng], {
      icon: icon,
      zIndexOffset: adventure.onSale ? 1000 : 0
    }).addTo(map);
    
    marker.on('click', () => {
      onMarkerClick(adventure.id);
    });
    
    markerData.push({
      marker,
      adventure,
      isActive: false
    });
  });
  
  return markerData;
}

/**
 * Update price markers (show/hide based on filtered adventures)
 */
export function updatePriceMarkers(
  map: Map,
  markerData: PriceMarkerData[],
  filteredAdventures: Adventure[]
): void {
  const filteredIds = new Set(filteredAdventures.map(a => a.id));
  
  markerData.forEach(data => {
    if (filteredIds.has(data.adventure.id)) {
      if (!map.hasLayer(data.marker)) {
        data.marker.addTo(map);
      }
    } else {
      if (map.hasLayer(data.marker)) {
        map.removeLayer(data.marker);
      }
    }
  });
}

/**
 * Set active marker (highlight)
 */
export function setActiveMarker(
  markerData: PriceMarkerData[],
  adventureId: string | null
): void {
  markerData.forEach(data => {
    const isActive = data.adventure.id === adventureId;
    data.isActive = isActive;
    
    const pinElement = data.marker.getElement()?.querySelector('.price-pin') as HTMLElement;
    if (pinElement) {
      if (isActive) {
        pinElement.classList.add('active');
      } else {
        pinElement.classList.remove('active');
      }
    }
  });
}

/**
 * Fit map to show all markers
 */
export function fitMapToMarkers(map: Map, markerData: PriceMarkerData[]): void {
  const visibleMarkers = markerData.filter(data => map.hasLayer(data.marker));
  
  if (visibleMarkers.length === 0) {
    // No markers, show world view
    map.setView([45, 10], 3);
    return;
  }
  
  if (visibleMarkers.length === 1) {
    // Single marker, zoom to it
    const marker = visibleMarkers[0];
    map.setView([marker.adventure.lat, marker.adventure.lng], 5);
    return;
  }
  
  // Multiple markers, fit bounds
  const bounds = L.latLngBounds(
    visibleMarkers.map(data => [data.adventure.lat, data.adventure.lng])
  );
  
  map.fitBounds(bounds, {
    padding: [50, 50],
    maxZoom: 6
  });
}

/**
 * Smart zoom based on result count
 */
export function smartZoom(map: Map, resultCount: number, markerData: PriceMarkerData[]): void {
  if (resultCount === 0) {
    map.setView([45, 10], 3);
  } else if (resultCount === 1) {
    fitMapToMarkers(map, markerData);
  } else if (resultCount <= 5) {
    fitMapToMarkers(map, markerData);
  } else {
    fitMapToMarkers(map, markerData);
  }
}
