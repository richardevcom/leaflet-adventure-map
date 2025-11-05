/**
 * Filter Manager - Handles all filtering logic with AND conditions
 */

import type { Adventure, FilterState, AdventureDifficulty, AdventureTypology } from '../types/index.js';
import { getUniqueCountries, getUniqueDurations, getPriceRange } from '../data/mockAdventures.js';

/**
 * Initialize filter state with all filters enabled
 */
export function createFilterState(): FilterState {
  const priceRange = getPriceRange();
  
  return {
    search: '',
    countries: getUniqueCountries(),
    durations: getUniqueDurations(),
    difficulties: ['Easy', 'Medium', 'Challenging', 'Difficult'] as AdventureDifficulty[],
    typologies: ['Sports Activities', 'Vacation'] as AdventureTypology[],
    dateFrom: null,
    dateTo: null,
    priceMin: priceRange.min,
    priceMax: priceRange.max
  };
}

/**
 * Apply filters to adventures using AND logic
 * All conditions must be met for an adventure to pass
 */
export function applyFilters(adventures: Adventure[], filters: FilterState): Adventure[] {
  return adventures.filter(adventure => {
    // Search filter (OR within search - matches any field)
    if (filters.search) {
      const query = filters.search.toLowerCase();
      const matchesSearch = 
        adventure.name.toLowerCase().includes(query) ||
        adventure.country.toLowerCase().includes(query) ||
        adventure.difficulty.toLowerCase().includes(query) ||
        adventure.typology.toLowerCase().includes(query);
      
      if (!matchesSearch) {
        return false; // AND logic: search must match
      }
    }
    
    // Country filter (must be in selected countries)
    if (!filters.countries.includes(adventure.countryCode)) {
      return false; // AND logic: country must match
    }
    
    // Duration filter (must be in selected durations)
    if (!filters.durations.includes(adventure.duration)) {
      return false; // AND logic: duration must match
    }
    
    // Difficulty filter (must be in selected difficulties)
    if (!filters.difficulties.includes(adventure.difficulty)) {
      return false; // AND logic: difficulty must match
    }
    
    // Typology filter (must be in selected typologies)
    if (!filters.typologies.includes(adventure.typology)) {
      return false; // AND logic: typology must match
    }
    
    // Price filter (must be within range)
    const price = adventure.onSale && adventure.salePrice ? adventure.salePrice : adventure.price;
    if (price < filters.priceMin || price > filters.priceMax) {
      return false; // AND logic: price must be in range
    }
    
    // All conditions passed
    return true;
  });
}

/**
 * Update country filter
 */
export function setCountryFilter(filters: FilterState, countryCodes: string[]): FilterState {
  return {
    ...filters,
    countries: countryCodes
  };
}

/**
 * Update duration filter
 */
export function setDurationFilter(filters: FilterState, durations: number[]): FilterState {
  return {
    ...filters,
    durations: durations
  };
}

/**
 * Update difficulty filter
 */
export function setDifficultyFilter(filters: FilterState, difficulties: AdventureDifficulty[]): FilterState {
  return {
    ...filters,
    difficulties: difficulties
  };
}

/**
 * Update typology filter
 */
export function setTypologyFilter(filters: FilterState, typologies: AdventureTypology[]): FilterState {
  return {
    ...filters,
    typologies: typologies
  };
}

/**
 * Update search filter
 */
export function setSearchFilter(filters: FilterState, search: string): FilterState {
  return {
    ...filters,
    search: search
  };
}

/**
 * Update price range filter
 */
export function setPriceRangeFilter(filters: FilterState, min: number, max: number): FilterState {
  return {
    ...filters,
    priceMin: min,
    priceMax: max
  };
}

/**
 * Reset all filters to default state
 */
export function resetFilters(): FilterState {
  return createFilterState();
}

/**
 * Filter to single country (used by territory click)
 */
export function filterByCountry(filters: FilterState, countryCode: string): FilterState {
  return {
    ...filters,
    countries: [countryCode]
  };
}
