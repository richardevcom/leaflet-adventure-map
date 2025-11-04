/**
 * Sidebar component for destination navigation
 */

import type { DestinationsCollection } from '../types';

export interface SidebarCallbacks {
  onCountryClick: (countryCode: string) => void;
  onCityClick: (cityCode: string, countryCode: string) => void;
  onCountryHover?: (countryCode: string, countryName: string) => void;
  onCountryHoverEnd?: () => void;
  onCityHover?: (cityCode: string, cityName: string) => void;
  onCityHoverEnd?: () => void;
}

/**
 * Create and initialize the sidebar
 */
export function createSidebar(
  data: DestinationsCollection,
  callbacks: SidebarCallbacks
): HTMLElement {
  const sidebar = document.createElement('div');
  sidebar.className = 'destinations-sidebar';

  // Create header
  const header = document.createElement('div');
  header.className = 'sidebar-header';
  header.innerHTML = `
    <h2>Destinations</h2>
    <p>Select a destination to explore</p>
  `;
  sidebar.appendChild(header);

  // Create scrollable content
  const content = document.createElement('div');
  content.className = 'sidebar-content';

  // Generate collapsibles for each country
  data.features.forEach((feature) => {
    const { name, code, cities } = feature.properties;
    if (!cities || cities.length === 0) return;

    // Country collapsible
    const countryItem = document.createElement('div');
    countryItem.className = 'country-item';
    countryItem.dataset.countryCode = code;

    // Country header (clickable)
    const countryHeader = document.createElement('div');
    countryHeader.className = 'country-header';
    countryHeader.innerHTML = `
      <span class="country-name">${name}</span>
      <span class="country-count">${cities.length} ${cities.length === 1 ? 'city' : 'cities'}</span>
      <svg class="chevron" width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M4 6L8 10L12 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    `;

    // Cities list (collapsible content)
    const citiesList = document.createElement('div');
    citiesList.className = 'cities-list';

    cities.forEach((city) => {
      const cityItem = document.createElement('div');
      cityItem.className = 'city-item';
      cityItem.dataset.cityCode = city.code;
      cityItem.dataset.countryCode = code;
      cityItem.innerHTML = `
        <svg class="city-icon" width="14" height="14" viewBox="0 0 24 24" fill="none">
          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="currentColor"/>
          <circle cx="12" cy="9" r="2.5" fill="white"/>
        </svg>
        <span class="city-name">${city.name}</span>
      `;

      // Click handler for city
      cityItem.addEventListener('click', (e) => {
        e.stopPropagation();
        callbacks.onCityClick(city.code, code);
      });
      
      // Hover handlers for label
      cityItem.addEventListener('mouseenter', () => {
        if (callbacks.onCityHover) {
          callbacks.onCityHover(city.code, city.name);
        }
      });
      
      cityItem.addEventListener('mouseleave', () => {
        if (callbacks.onCityHoverEnd) {
          callbacks.onCityHoverEnd();
        }
      });

      citiesList.appendChild(cityItem);
    });

    // Toggle collapsible on country header click
    countryHeader.addEventListener('click', () => {
      const isExpanded = countryItem.classList.contains('expanded');
      
      // Close all other countries
      content.querySelectorAll('.country-item').forEach((item) => {
        item.classList.remove('expanded');
      });

      // Toggle this country
      if (!isExpanded) {
        countryItem.classList.add('expanded');
      }

      // Also trigger country selection
      callbacks.onCountryClick(code);
    });
    
    // Show label on hover
    countryHeader.addEventListener('mouseenter', () => {
      if (callbacks.onCountryHover) {
        callbacks.onCountryHover(code, name);
      }
    });
    
    countryHeader.addEventListener('mouseleave', () => {
      if (callbacks.onCountryHoverEnd) {
        callbacks.onCountryHoverEnd();
      }
    });

    countryItem.appendChild(countryHeader);
    countryItem.appendChild(citiesList);
    content.appendChild(countryItem);
  });

  sidebar.appendChild(content);
  return sidebar;
}

/**
 * Update sidebar active state
 */
export function updateSidebarState(
  activeCountry: string | null,
  activeCity: string | null
): void {
  // Remove all active states
  document.querySelectorAll('.country-item.active').forEach((el) => {
    el.classList.remove('active');
  });
  document.querySelectorAll('.city-item.active').forEach((el) => {
    el.classList.remove('active');
  });

  // Set active country
  if (activeCountry) {
    const countryEl = document.querySelector(
      `.country-item[data-country-code="${activeCountry}"]`
    );
    if (countryEl) {
      countryEl.classList.add('active');
      // Auto-expand active country
      countryEl.classList.add('expanded');
    }
  }

  // Set active city
  if (activeCity) {
    const cityEl = document.querySelector(
      `.city-item[data-city-code="${activeCity}"]`
    );
    if (cityEl) {
      cityEl.classList.add('active');
    }
  }
}
