/**
 * Search Manager - Handles search functionality with debouncing and dropdown
 */

import type { Adventure, SearchResult } from '../types/index.js';

/**
 * Debounce helper for search input
 */
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  delay: number
): (...args: Parameters<T>) => void {
  let timeoutId: number | null = null;
  
  return (...args: Parameters<T>) => {
    if (timeoutId !== null) {
      clearTimeout(timeoutId);
    }
    
    timeoutId = window.setTimeout(() => {
      func(...args);
      timeoutId = null;
    }, delay);
  };
}

/**
 * Search adventures by query
 */
export function searchAdventures(
  adventures: Adventure[],
  query: string,
  maxResults: number = 5
): SearchResult[] {
  const normalizedQuery = query.toLowerCase().trim();
  
  if (!normalizedQuery) {
    return [];
  }
  
  const results: SearchResult[] = [];
  
  // Find matching adventures
  const adventureMatches = adventures.filter(a => 
    a.name.toLowerCase().includes(normalizedQuery) ||
    a.country.toLowerCase().includes(normalizedQuery)
  ).slice(0, maxResults);
  
  // Find unique matching countries
  const countryMatches = new Map<string, { country: string; countryCode: string; count: number }>();
  
  adventures.forEach(a => {
    if (a.country.toLowerCase().includes(normalizedQuery)) {
      const existing = countryMatches.get(a.countryCode);
      if (existing) {
        existing.count++;
      } else {
        countryMatches.set(a.countryCode, {
          country: a.country,
          countryCode: a.countryCode,
          count: 1
        });
      }
    }
  });
  
  // Add country results first
  countryMatches.forEach(country => {
    results.push({
      type: 'country',
      countryCode: country.countryCode,
      countryName: country.country,
      count: country.count
    });
  });
  
  // Add adventure results
  adventureMatches.forEach(adventure => {
    results.push({
      type: 'adventure',
      adventure: adventure
    });
  });
  
  return results;
}

/**
 * Format price for display
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(price);
}

/**
 * Get display price (sale price if on sale, otherwise regular price)
 */
export function getDisplayPrice(adventure: Adventure): number {
  return adventure.onSale && adventure.salePrice ? adventure.salePrice : adventure.price;
}

/**
 * Highlight matching text in search results
 */
export function highlightMatch(text: string, query: string): string {
  if (!query) return text;
  
  const regex = new RegExp(`(${escapeRegex(query)})`, 'gi');
  return text.replace(regex, '<mark>$1</mark>');
}

/**
 * Escape special regex characters
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
