/**
 * UI Manager - Handles all UI updates and rendering
 */

import type { Adventure, UIState } from '../types/index.js';
import { formatPrice, getDisplayPrice } from './searchManager.js';
import { mockAdventures } from '../data/mockAdventures.js';

/**
 * Create initial UI state
 */
export function createUIState(): UIState {
  return {
    activeAdventureId: null,
    isMobileView: window.innerWidth < 768,
    isFiltersPanelOpen: false,
    isResultsPanelOpen: false,
    filteredAdventures: [...mockAdventures],
    allAdventures: [...mockAdventures]
  };
}

/**
 * Render adventure cards in results panel
 */
export function renderAdventureCards(
  adventures: Adventure[],
  activeId: string | null,
  onCardClick: (adventureId: string) => void
): void {
  const resultsGrid = document.getElementById('resultsGrid');
  if (!resultsGrid) return;

  if (adventures.length === 0) {
    resultsGrid.innerHTML = `
      <div class="empty-state" style="grid-column: 1 / -1;">
        <div class="empty-icon">🗺️</div>
        <h3>No adventures found</h3>
        <p>Try adjusting your filters to see more results</p>
      </div>
    `;
    return;
  }

  resultsGrid.innerHTML = adventures.map(adventure => {
    const displayPrice = getDisplayPrice(adventure);
    const isActive = adventure.id === activeId;

    return `
      <div class="adventure-card ${isActive ? 'active' : ''}" data-adventure-id="${adventure.id}">
        <div class="card-image">
          ${adventure.imageUrl ? `<img src="${adventure.imageUrl}" alt="${adventure.name}" />` : ''}
          ${adventure.onSale ? '<span class="sale-badge">Sale</span>' : ''}
        </div>
        <div class="card-content">
          <h3 class="card-title">${adventure.name}</h3>
          <div class="card-location">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            <span>${adventure.country}</span>
          </div>
          <div class="card-meta">
            <div class="card-meta-item">
              <span>📅 ${adventure.duration} days</span>
            </div>
            <div class="card-meta-item">
              <span>🏔️ ${adventure.difficulty}</span>
            </div>
          </div>
          <div class="divider-fade card-divider"></div>
          <div class="card-footer">
            <div class="card-price">
              <span class="price-current">${formatPrice(displayPrice)}</span>
              ${adventure.onSale && adventure.salePrice ? `
                <span class="price-original">${formatPrice(adventure.price)}</span>
              ` : ''}
            </div>
            <button class="card-button">View</button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Add click handlers
  resultsGrid.querySelectorAll('.adventure-card').forEach(card => {
    card.addEventListener('click', () => {
      const adventureId = card.getAttribute('data-adventure-id');
      if (adventureId) {
        onCardClick(adventureId);
      }
    });
  });
}

/**
 * Update results count display
 */
export function updateResultsCount(count: number): void {
  const resultsCount = document.getElementById('resultsCount');
  const resultsPanel = document.getElementById('resultsPanel');

  if (resultsCount) {
    resultsCount.textContent = count.toString();
  }
  
  // Show no-results state if count is 0
  if (resultsPanel) {
    if (count === 0) {
      resultsPanel.classList.add('no-results');
    } else {
      resultsPanel.classList.remove('no-results');
    }
  }
}

/**
 * Render filter checkboxes
 */
export function renderFilterCheckboxes(
  containerId: string,
  items: Array<{ value: string | number; label: string; checked: boolean; count?: number }>,
  onChange: (value: string | number, checked: boolean) => void
): void {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `
    <div class="checkbox-list">
      ${items.map(item => `
        <label class="checkbox-item">
          <input 
            type="checkbox" 
            value="${item.value}" 
            ${item.checked ? 'checked' : ''}
          />
          <span>${item.label}</span>
          ${item.count !== undefined ? `<span class="item-count">${item.count}</span>` : ''}
        </label>
      `).join('')}
    </div>
  `;

  // Add change handlers
  container.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const target = e.target as HTMLInputElement;
      const value = isNaN(Number(target.value)) ? target.value : Number(target.value);
      onChange(value, target.checked);
    });
  });
}

/**
 * Setup filter section collapse/expand
 */
export function setupFilterSections(): void {
  document.querySelectorAll('.filter-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', (!isExpanded).toString());
      
      const filterId = toggle.getAttribute('data-filter');
      if (filterId) {
        const content = document.querySelector(`[data-content="${filterId}"]`) as HTMLElement;
        if (content) {
          content.classList.toggle('expanded');
        }
      }
    });
  });
}

/**
 * Setup mobile panel toggles
 */
export function setupMobilePanels(uiState: UIState): void {
  const filterBtn = document.getElementById('mobileFilterBtn');
  const closeBtn = document.getElementById('mobileCloseBtn');
  const sidebar = document.getElementById('sidebar');
  const mobileControls = document.querySelector('.mobile-controls');

  if (filterBtn && sidebar) {
    filterBtn.addEventListener('click', () => {
      uiState.isFiltersPanelOpen = !uiState.isFiltersPanelOpen;
      
      sidebar.classList.toggle('mobile-open', uiState.isFiltersPanelOpen);
      mobileControls?.classList.toggle('filter-active', uiState.isFiltersPanelOpen);
      filterBtn.classList.toggle('active', uiState.isFiltersPanelOpen);
    });
  }

  if (closeBtn && sidebar) {
    closeBtn.addEventListener('click', () => {
      uiState.isFiltersPanelOpen = false;
      sidebar.classList.remove('mobile-open');
      mobileControls?.classList.remove('filter-active');
      filterBtn?.classList.remove('active');
    });
  }

  // Close sidebar when clicking on map
  const map = document.getElementById('map');
  if (map) {
    map.addEventListener('click', () => {
      if (uiState.isFiltersPanelOpen) {
        uiState.isFiltersPanelOpen = false;
        sidebar?.classList.remove('mobile-open');
        mobileControls?.classList.remove('filter-active');
        filterBtn?.classList.remove('active');
      }
    });
  }
}

/**
 * Setup results panel collapse/expand
 */
export function setupResultsPanel(): void {
  const resultsHeader = document.getElementById('resultsHeader');
  const resultsPanel = document.getElementById('resultsPanel');
  const expandBtn = document.getElementById('resultsExpand');

  const togglePanel = () => {
    if (resultsPanel) {
      resultsPanel.classList.toggle('collapsed');
    }
  };

  if (resultsHeader) {
    resultsHeader.addEventListener('click', togglePanel);
  }

  if (expandBtn) {
    expandBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      togglePanel();
    });
  }
}

/**
 * Update price range display
 */
export function updatePriceDisplay(min: number, max: number): void {
  const minValue = document.getElementById('priceMin');
  const maxValue = document.getElementById('priceMax');

  if (minValue) {
    minValue.textContent = formatPrice(min);
  }
  
  if (maxValue) {
    maxValue.textContent = formatPrice(max);
  }
}

/**
 * Get country name from country code
 */
export function getCountryName(adventures: Adventure[], countryCode: string): string {
  const adventure = adventures.find(a => a.countryCode === countryCode);
  return adventure?.country || countryCode;
}
