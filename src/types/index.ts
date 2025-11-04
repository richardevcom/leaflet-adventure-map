/**
 * TypeScript type definitions for Leaflet Adventures Map
 */

import type { Layer } from 'leaflet';

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
  /** ISO country code */
  countryCode: string;
  /** Country name */
  countryName: string;
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
  /** Start date (ISO format YYYY-MM-DD) */
  startDate: string;
  /** End date (ISO format YYYY-MM-DD) */
  endDate: string;
  /** Price in EUR */
  price: number;
  /** Sale price in EUR (if on sale) */
  salePrice: number | null;
  /** Whether package is on sale */
  onSale: boolean;
  /** Thumbnail image URL */
  imageUrl?: string;
  /** Package details page URL */
  url: string;
  /** Short description */
  description?: string;
}

/**
 * GeoJSON Feature properties for adventures
 */
export interface AdventureProperties extends Adventure {
  // Extends Adventure with GeoJSON-specific props if needed
}

/**
 * GeoJSON Feature representing an adventure location
 */
export interface AdventureFeature {
  type: 'Feature';
  properties: AdventureProperties;
  geometry: {
    type: 'Point';
    coordinates: [number, number]; // [lng, lat]
  };
}

/**
 * GeoJSON FeatureCollection of all adventures
 */
export interface AdventuresCollection {
  type: 'FeatureCollection';
  features: AdventureFeature[];
}

/**
 * Country territory properties (for country polygons)
 */
export interface CountryProperties {
  /** Display name of the country */
  name: string;
  /** ISO country code */
  code: string;
  /** Type identifier */
  type: 'country';
}

/**
 * GeoJSON Feature representing a country territory
 */
export interface CountryFeature {
  type: 'Feature';
  properties: CountryProperties;
  geometry: GeoJSON.Geometry;
}

/**
 * GeoJSON FeatureCollection of country territories
 */
export interface CountriesCollection {
  type: 'FeatureCollection';
  features: CountryFeature[];
}

/**
 * Filter state for adventure search
 */
export interface FilterState {
  /** Search query (country or adventure name) */
  search: string;
  /** Selected country codes */
  countries: string[];
  /** Selected durations in days */
  durations: number[];
  /** Selected difficulty levels */
  difficulties: AdventureDifficulty[];
  /** Selected typologies */
  typologies: AdventureTypology[];
  /** Date range filter */
  dateRange: {
    from: Date | null;
    to: Date | null;
  };
  /** Price range filter (EUR) */
  priceRange: {
    min: number;
    max: number;
  };
}

/**
 * Map interaction state tracking
 */
export interface MapState {
  /** Currently active/selected country code */
  activeCountry: string | null;
  /** Currently active/selected adventure ID */
  activeAdventure: string | null;
  /** Currently hovered layer */
  hoveredLayer: Layer | null;
  /** Current filter state */
  filters: FilterState;
}

/**
 * Leaflet style configuration for territory states
 */
export interface TerritoryStyle {
  fillColor: string;
  fillOpacity: number;
  color: string;
  weight: number;
  opacity: number;
}
