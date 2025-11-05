/**
 * TypeScript type definitions for Leaflet Adventures Map
 */

import type { Layer, Marker } from 'leaflet';

/**
 * Adventure package difficulty levels
 */
export type AdventureDifficulty = 'Easy' | 'Medium' | 'Challenging' | 'Difficult';

/**
 * Adventure package typology/category
 */
export type AdventureTypology = 'Sports Activities' | 'Vacation';

/**
 * Adventure package data
 */
export interface Adventure {
  /** Unique adventure identifier */
  id: string;
  /** Adventure package name */
  name: string;
  /** Country name */
  country: string;
  /** ISO country code (2 letters) */
  countryCode: string;
  /** Latitude coordinate */
  lat: number;
  /** Longitude coordinate */
  lng: number;
  /** Duration in days */
  duration: number;
  /** Difficulty level */
  difficulty: AdventureDifficulty;
  /** Adventure typology/category */
  typology: AdventureTypology;
  /** Price in EUR */
  price: number;
  /** Sale price in EUR (if on sale) */
  salePrice: number | null;
  /** Whether package is on sale */
  onSale: boolean;
  /** Thumbnail image URL */
  imageUrl?: string;
}

/**
 * Filter state for adventure search (AND logic applied)
 */
export interface FilterState {
  /** Search query (country or adventure name) */
  search: string;
  /** Selected country codes (all selected by default) */
  countries: string[];
  /** Selected durations in days */
  durations: number[];
  /** Selected difficulty levels */
  difficulties: AdventureDifficulty[];
  /** Selected typologies */
  typologies: AdventureTypology[];
  /** Date from filter (not implemented in mockup) */
  dateFrom: Date | null;
  /** Date to filter (not implemented in mockup) */
  dateTo: Date | null;
  /** Price minimum in EUR */
  priceMin: number;
  /** Price maximum in EUR */
  priceMax: number;
}

/**
 * Search result item for dropdown
 */
export interface SearchResult {
  /** Type of search result */
  type: 'country' | 'adventure';
  /** Country code (if type is country) */
  countryCode?: string;
  /** Country name (if type is country) */
  countryName?: string;
  /** Adventure object (if type is adventure) */
  adventure?: Adventure;
  /** Number of adventures in this country (for country results) */
  count?: number;
}

/**
 * Price marker data for map
 */
export interface PriceMarkerData {
  /** Leaflet marker instance */
  marker: Marker<any>;
  /** Associated adventure */
  adventure: Adventure;
  /** Whether marker is currently active */
  isActive: boolean;
}

/**
 * Map configuration options
 */
export interface MapConfig {
  /** Map center coordinates [lat, lng] */
  center: [number, number];
  /** Initial zoom level */
  zoom: number;
  /** Minimum zoom level */
  minZoom: number;
  /** Maximum zoom level */
  maxZoom?: number;
  /** Maximum bounds */
  maxBounds?: [[number, number], [number, number]];
  /** Enable scroll wheel zoom */
  scrollWheelZoom: boolean;
  /** Show zoom control */
  zoomControl: boolean;
}

/**
 * Territory (country polygon) style configuration
 */
export interface TerritoryStyle {
  fillColor: string;
  fillOpacity: number;
  color: string;
  weight: number;
  opacity: number;
}

/**
 * Map layer references
 */
export interface MapLayers {
  /** Land layer (white continents) */
  landLayer?: Layer;
  /** Territory layers (country polygons) */
  territoryLayer?: Layer;
  /** Price markers */
  markers: PriceMarkerData[];
}

/**
 * UI state tracking
 */
export interface UIState {
  /** Currently active adventure ID */
  activeAdventureId: string | null;
  /** Whether mobile view is active */
  isMobileView: boolean;
  /** Whether filters panel is open (mobile) */
  isFiltersPanelOpen: boolean;
  /** Whether results panel is open (mobile) */
  isResultsPanelOpen: boolean;
  /** Current filtered adventures */
  filteredAdventures: Adventure[];
  /** All available adventures */
  allAdventures: Adventure[];
}

/**
 * Debounce timer reference
 */
export interface DebounceTimer {
  timeoutId: number | null;
}

/**
 * GeoJSON Feature properties for Natural Earth territories
 */
export interface NaturalEarthProperties {
  /** ISO Alpha-2 code */
  ISO_A2?: string;
  /** ISO Alpha-3 code */
  ISO_A3?: string;
  /** Admin name */
  ADMIN?: string;
  /** Alternative name */
  NAME?: string;
  /** Other properties */
  [key: string]: any;
}

/**
 * Filter section configuration
 */
export interface FilterSection {
  /** Section ID */
  id: string;
  /** Section title */
  title: string;
  /** Whether section is collapsed */
  collapsed: boolean;
  /** Filter items in this section */
  items: FilterItem[];
}

/**
 * Individual filter item (checkbox)
 */
export interface FilterItem {
  /** Filter value */
  value: string | number;
  /** Display label */
  label: string;
  /** Whether item is selected */
  selected: boolean;
  /** Item count (number of matching adventures) */
  count?: number;
}
