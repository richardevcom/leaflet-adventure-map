/**
 * TribeTravel Adventures Map - Main Entry Point
 * Systematic TypeScript implementation with full type safety
 */

import './styles/main.scss';
import 'leaflet/dist/leaflet.css';

import type { FilterState, PriceMarkerData, UIState } from './types/index.js';
import { mockAdventures } from './data/mockAdventures.js';
import {
  createFilterState,
  applyFilters,
  setSearchFilter,
  setPriceRangeFilter,
  resetFilters,
  filterByCountry
} from './utils/filterManager.js';
import {
  debounce,
  searchAdventures,
  formatPrice
} from './utils/searchManager.js';
import {
  initializeMap,
  addLandLayer,
  addTerritoryLayer,
  addPriceMarkers,
  updatePriceMarkers,
  setActiveMarker,
  smartZoom
} from './utils/mapManager.js';
import {
  createUIState,
  renderAdventureCards,
  updateResultsCount,
  renderFilterCheckboxes,
  setupFilterSections,
  setupMobilePanels,
  setupResultsPanel,
  updatePriceDisplay,
  getCountryName
} from './utils/uiManager.js';

// ========================================
// APPLICATION STATE
// ========================================

let filterState: FilterState;
let uiState: UIState;
let markerData: PriceMarkerData[] = [];
let map: L.Map;

// ========================================
// INITIALIZATION
// ========================================

async function initializeApp(): Promise<void> {
  try {
    // Initialize state
    filterState = createFilterState();
    uiState = createUIState();

    // Initialize map
    map = initializeMap('map');

    // Load map layers
    await addLandLayer(map);
    await addTerritoryLayer(
      map,
      filterState.countries,
      handleTerritoryClick
    );

    // Initialize UI
    initializeFilters();
    initializeSearch();
    initializePriceRanges();
    setupFilterSections();
    setupMobilePanels(uiState);
    setupResultsPanel();

    // Initial render
    updateUI();
  } catch (error) {
    throw new Error(`Failed to initialize map: ${error}`);
  }
}

// ========================================
// FILTER INITIALIZATION
// ========================================

function initializeFilters(): void {
  // Render country checkboxes
  const countryItems = filterState.countries.map(code => ({
    value: code,
    label: getCountryName(mockAdventures, code),
    checked: true
  }));
  renderFilterCheckboxes('destinationsContent', countryItems, (value, checked) => {
    updateCountryFilter(value as string, checked);
  });

  // Render duration checkboxes
  const durationItems = filterState.durations.map(days => ({
    value: days,
    label: `${days} days`,
    checked: true
  }));
  renderFilterCheckboxes('durationContent', durationItems, (value, checked) => {
    updateDurationFilter(value as number, checked);
  });

  // Render difficulty checkboxes
  const difficultyItems = filterState.difficulties.map(level => ({
    value: level,
    label: level,
    checked: true
  }));
  renderFilterCheckboxes('difficultyContent', difficultyItems, (value, checked) => {
    updateDifficultyFilter(value as string, checked);
  });

  // Render typology checkboxes
  const typologyItems = filterState.typologies.map(type => ({
    value: type,
    label: type,
    checked: true
  }));
  renderFilterCheckboxes('typologyContent', typologyItems, (value, checked) => {
    updateTypologyFilter(value as string, checked);
  });

  // Setup reset button
  const resetBtn = document.getElementById('clearAll');
  if (resetBtn) {
    resetBtn.addEventListener('click', handleResetFilters);
  }
}

// ========================================
// SEARCH INITIALIZATION
// ========================================

function initializeSearch(): void {
  // Desktop search
  setupSearchInput('searchInput', 'searchClear', 'searchDropdown');
  
  // Mobile search
  setupSearchInput('mobileSearchInput', 'mobileSearchClear', 'mobileSearchDropdown');
}

function setupSearchInput(inputId: string, clearId: string, dropdownId: string): void {
  const searchInput = document.getElementById(inputId) as HTMLInputElement;
  const searchClear = document.getElementById(clearId);
  const searchDropdown = document.getElementById(dropdownId);

  if (!searchInput) return;

  // Debounced search function
  const debouncedSearch = debounce((query: string) => {
    if (query.length >= 1 && searchDropdown) {
      const results = searchAdventures(mockAdventures, query, 8);
      
      if (results.length > 0) {
        searchDropdown.innerHTML = results.map(result => {
          if (result.type === 'country') {
            return `
              <div class="search-dropdown-item" data-type="country" data-country-code="${result.countryCode}">
                <strong>${result.countryName}</strong><br>
                <small>${result.count} adventure${result.count !== 1 ? 's' : ''}</small>
              </div>
            `;
          } else {
            const adv = result.adventure!;
            return `
              <div class="search-dropdown-item" data-type="adventure" data-adventure-id="${adv.id}">
                <strong>${adv.name}</strong><br>
                <small>${adv.country} • ${adv.duration} days • ${formatPrice(adv.price)}</small>
              </div>
            `;
          }
        }).join('');
        
        searchDropdown.classList.add('active');
        
        // Add click handlers
        searchDropdown.querySelectorAll('.search-dropdown-item').forEach(item => {
          item.addEventListener('click', () => {
            const type = item.getAttribute('data-type');
            if (type === 'country') {
              const countryCode = item.getAttribute('data-country-code');
              if (countryCode) {
                handleCountrySelect(countryCode);
                searchInput.value = getCountryName(mockAdventures, countryCode);
              }
            } else if (type === 'adventure') {
              const adventureId = item.getAttribute('data-adventure-id');
              if (adventureId) {
                handleAdventureSelect(adventureId);
                const adventure = mockAdventures.find(a => a.id === adventureId);
                if (adventure) {
                  searchInput.value = adventure.name;
                }
              }
            }
            searchDropdown.classList.remove('active');
          });
        });
      }
    }
  }, 300);

  // Input handler
  searchInput.addEventListener('input', (e) => {
    const value = (e.target as HTMLInputElement).value;
    
    if (searchClear) {
      if (value.length > 0) {
        searchClear.classList.add('active');
      } else {
        searchClear.classList.remove('active');
      }
    }

    if (value.length >= 1) {
      debouncedSearch(value);
    } else {
      if (searchDropdown) {
        searchDropdown.classList.remove('active');
      }
      filterState = setSearchFilter(filterState, '');
      updateUI();
    }
  });

  // Clear button
  if (searchClear) {
    searchClear.addEventListener('click', () => {
      searchInput.value = '';
      searchClear.classList.remove('active');
      if (searchDropdown) {
        searchDropdown.classList.remove('active');
      }
      filterState = setSearchFilter(filterState, '');
      updateUI();
    });
  }

  // Close dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchInput.contains(e.target as Node) && searchDropdown) {
      searchDropdown.classList.remove('active');
    }
  });
}

// ========================================
// PRICE RANGE INITIALIZATION
// ========================================

function initializePriceRanges(): void {
  const minSlider = document.getElementById('priceRangeMin') as HTMLInputElement;
  const maxSlider = document.getElementById('priceRangeMax') as HTMLInputElement;

  if (!minSlider || !maxSlider) return;

  // Debounced price update
  const debouncedPriceUpdate = debounce(() => {
    const min = parseInt(minSlider.value);
    const max = parseInt(maxSlider.value);
    
    if (min <= max) {
      filterState = setPriceRangeFilter(filterState, min, max);
      updateUI();
    }
  }, 500);

  minSlider.addEventListener('input', () => {
    const min = parseInt(minSlider.value);
    const max = parseInt(maxSlider.value);
    
    if (min > max) {
      minSlider.value = max.toString();
    }
    
    updatePriceDisplay(parseInt(minSlider.value), parseInt(maxSlider.value));
    debouncedPriceUpdate();
  });

  maxSlider.addEventListener('input', () => {
    const min = parseInt(minSlider.value);
    const max = parseInt(maxSlider.value);
    
    if (max < min) {
      maxSlider.value = min.toString();
    }
    
    updatePriceDisplay(parseInt(minSlider.value), parseInt(maxSlider.value));
    debouncedPriceUpdate();
  });
}

// ========================================
// FILTER UPDATE HANDLERS
// ========================================

function updateCountryFilter(countryCode: string, checked: boolean): void {
  if (checked) {
    if (!filterState.countries.includes(countryCode)) {
      filterState.countries.push(countryCode);
    }
  } else {
    filterState.countries = filterState.countries.filter(c => c !== countryCode);
  }
  updateUI();
}

function updateDurationFilter(duration: number, checked: boolean): void {
  if (checked) {
    if (!filterState.durations.includes(duration)) {
      filterState.durations.push(duration);
    }
  } else {
    filterState.durations = filterState.durations.filter(d => d !== duration);
  }
  updateUI();
}

function updateDifficultyFilter(difficulty: string, checked: boolean): void {
  if (checked) {
    if (!filterState.difficulties.includes(difficulty as any)) {
      filterState.difficulties.push(difficulty as any);
    }
  } else {
    filterState.difficulties = filterState.difficulties.filter(d => d !== difficulty);
  }
  updateUI();
}

function updateTypologyFilter(typology: string, checked: boolean): void {
  if (checked) {
    if (!filterState.typologies.includes(typology as any)) {
      filterState.typologies.push(typology as any);
    }
  } else {
    filterState.typologies = filterState.typologies.filter(t => t !== typology);
  }
  updateUI();
}

function handleResetFilters(): void {
  filterState = resetFilters();
  
  // Reset all checkboxes
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => {
    (cb as HTMLInputElement).checked = true;
  });
  
  // Reset price sliders
  const minSlider = document.getElementById('priceRangeMin') as HTMLInputElement;
  const maxSlider = document.getElementById('priceRangeMax') as HTMLInputElement;
  if (minSlider && maxSlider) {
    minSlider.value = filterState.priceMin.toString();
    maxSlider.value = filterState.priceMax.toString();
    updatePriceDisplay(filterState.priceMin, filterState.priceMax);
  }
  
  // Clear search
  const searchInputs = ['searchInput', 'mobileSearchInput'];
  searchInputs.forEach(id => {
    const input = document.getElementById(id) as HTMLInputElement;
    if (input) {
      input.value = '';
    }
  });
  
  updateUI();
}

// ========================================
// EVENT HANDLERS
// ========================================

function handleTerritoryClick(countryCode: string): void {
  filterState = filterByCountry(filterState, countryCode);
  
  // Update country checkboxes
  document.querySelectorAll('input[type="checkbox"][value]').forEach(cb => {
    const checkbox = cb as HTMLInputElement;
    checkbox.checked = checkbox.value === countryCode;
  });
  
  updateUI();
}

function handleCountrySelect(countryCode: string): void {
  filterState = filterByCountry(filterState, countryCode);
  
  // Update checkboxes
  document.querySelectorAll('input[type="checkbox"][value]').forEach(cb => {
    const checkbox = cb as HTMLInputElement;
    checkbox.checked = checkbox.value === countryCode;
  });
  
  updateUI();
}

function handleAdventureSelect(adventureId: string): void {
  uiState.activeAdventureId = adventureId;
  setActiveMarker(markerData, adventureId);
  renderAdventureCards(uiState.filteredAdventures, adventureId, handleAdventureSelect);
  
  // Zoom to marker
  const adventure = mockAdventures.find(a => a.id === adventureId);
  if (adventure) {
    map.setView([adventure.lat, adventure.lng], 6);
  }
}

function handleMarkerClick(adventureId: string): void {
  handleAdventureSelect(adventureId);
}

// ========================================
// MAIN UI UPDATE FUNCTION
// ========================================

function updateUI(): void {
  // Apply filters
  const filtered = applyFilters(mockAdventures, filterState);
  uiState.filteredAdventures = filtered;

  // Update results count
  updateResultsCount(filtered.length);

  // Render adventure cards
  renderAdventureCards(filtered, uiState.activeAdventureId, handleAdventureSelect);

  // Update map markers
  if (markerData.length === 0) {
    // First time - create markers
    markerData = addPriceMarkers(map, mockAdventures, handleMarkerClick);
  }
  updatePriceMarkers(map, markerData, filtered);

  // Smart zoom
  smartZoom(map, filtered.length, markerData.filter(m => 
    filtered.some(a => a.id === m.adventure.id)
  ));
}

// ========================================
// START APPLICATION
// ========================================

initializeApp();
