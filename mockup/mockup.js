// Sample adventure data (subset for mockup)
const mockAdventures = [
  {
    id: 'iceland-001',
    name: 'Northern Lights Photography Expedition',
    country: 'Iceland',
    countryCode: 'IS',
    lat: 64.9631,
    lng: -19.0208,
    duration: 7,
    difficulty: 'Medium',
    typology: 'Sports Activities',
    price: 1850,
    salePrice: null,
    onSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1483347756197-71ef80e95f73?w=800'
  },
  {
    id: 'norway-001',
    name: 'Lofoten Islands Winter Photography',
    country: 'Norway',
    countryCode: 'NO',
    lat: 68.2,
    lng: 13.5,
    duration: 7,
    difficulty: 'Medium',
    typology: 'Sports Activities',
    price: 2200,
    salePrice: 1980,
    onSale: true,
    imageUrl: 'https://images.unsplash.com/photo-1516214104703-d870798883c5?w=800'
  },
  {
    id: 'newzealand-001',
    name: 'Milford Sound Kayaking Adventure',
    country: 'New Zealand',
    countryCode: 'NZ',
    lat: -44.6717,
    lng: 167.9270,
    duration: 5,
    difficulty: 'Easy',
    typology: 'Sports Activities',
    price: 1650,
    salePrice: null,
    onSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1507699622108-4be3abd695ad?w=800'
  },
  {
    id: 'costarica-001',
    name: 'Rainforest Canopy & Wildlife Tour',
    country: 'Costa Rica',
    countryCode: 'CR',
    lat: 10.2735,
    lng: -84.0739,
    duration: 10,
    difficulty: 'Easy',
    typology: 'Vacation',
    price: 2450,
    salePrice: 2205,
    onSale: true,
    imageUrl: 'https://images.unsplash.com/photo-1518652448756-e53b70c0e6a5?w=800'
  },
  {
    id: 'japan-001',
    name: 'Mount Fuji Sunrise Hiking',
    country: 'Japan',
    countryCode: 'JP',
    lat: 35.3606,
    lng: 138.7274,
    duration: 5,
    difficulty: 'Challenging',
    typology: 'Sports Activities',
    price: 1450,
    salePrice: null,
    onSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1570284971394-44fbfb2e0e3a?w=800'
  },
  {
    id: 'morocco-001',
    name: 'Sahara Desert Camel Trek',
    country: 'Morocco',
    countryCode: 'MA',
    lat: 31.0546,
    lng: -4.0000,
    duration: 7,
    difficulty: 'Medium',
    typology: 'Vacation',
    price: 1750,
    salePrice: null,
    onSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800'
  },
  {
    id: 'peru-001',
    name: 'Machu Picchu Trek & Exploration',
    country: 'Peru',
    countryCode: 'PE',
    lat: -13.1631,
    lng: -72.5450,
    duration: 10,
    difficulty: 'Challenging',
    typology: 'Sports Activities',
    price: 2850,
    salePrice: 2565,
    onSale: true,
    imageUrl: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800'
  },
  {
    id: 'tanzania-001',
    name: 'Kilimanjaro Summit Expedition',
    country: 'Tanzania',
    countryCode: 'TZ',
    lat: -3.0674,
    lng: 37.3556,
    duration: 15,
    difficulty: 'Difficult',
    typology: 'Sports Activities',
    price: 3450,
    salePrice: null,
    onSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?w=800'
  },
  {
    id: 'portugal-001',
    name: 'Algarve Coastal Hiking & Surfing',
    country: 'Portugal',
    countryCode: 'PT',
    lat: 37.0194,
    lng: -7.9304,
    duration: 7,
    difficulty: 'Easy',
    typology: 'Sports Activities',
    price: 1550,
    salePrice: 1395,
    onSale: true,
    imageUrl: 'https://images.unsplash.com/photo-1555881400-74d7acaacd8b?w=800'
  },
  {
    id: 'greece-001',
    name: 'Santorini Island Hopping Experience',
    country: 'Greece',
    countryCode: 'GR',
    lat: 36.3932,
    lng: 25.4615,
    duration: 10,
    difficulty: 'Easy',
    typology: 'Vacation',
    price: 2150,
    salePrice: null,
    onSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?w=800'
  },
  {
    id: 'iceland-002',
    name: 'Golden Circle & Hot Springs Tour',
    country: 'Iceland',
    countryCode: 'IS',
    lat: 64.3078,
    lng: -20.2986,
    duration: 5,
    difficulty: 'Easy',
    typology: 'Vacation',
    price: 1750,
    salePrice: null,
    onSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1504829857797-ddff29c27927?w=800'
  },
  {
    id: 'norway-002',
    name: 'Fjords & Northern Lights Cruise',
    country: 'Norway',
    countryCode: 'NO',
    lat: 61.5949,
    lng: 6.8090,
    duration: 7,
    difficulty: 'Easy',
    typology: 'Vacation',
    price: 2650,
    salePrice: 2385,
    onSale: true,
    imageUrl: 'https://images.unsplash.com/photo-1601439678777-b2d8b1a37f85?w=800'
  },
  {
    id: 'newzealand-002',
    name: 'Queenstown Extreme Sports Package',
    country: 'New Zealand',
    countryCode: 'NZ',
    lat: -45.0312,
    lng: 168.6626,
    duration: 7,
    difficulty: 'Challenging',
    typology: 'Sports Activities',
    price: 2350,
    salePrice: null,
    onSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800'
  },
  {
    id: 'costarica-002',
    name: 'Volcano Hiking & Zip-lining Adventure',
    country: 'Costa Rica',
    countryCode: 'CR',
    lat: 10.4630,
    lng: -84.7036,
    duration: 7,
    difficulty: 'Medium',
    typology: 'Sports Activities',
    price: 1950,
    salePrice: null,
    onSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1605649487212-47bdab064df7?w=800'
  },
  {
    id: 'japan-002',
    name: 'Kyoto Temple & Gardens Discovery',
    country: 'Japan',
    countryCode: 'JP',
    lat: 35.0116,
    lng: 135.7681,
    duration: 10,
    difficulty: 'Easy',
    typology: 'Vacation',
    price: 2550,
    salePrice: 2295,
    onSale: true,
    imageUrl: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800'
  },
  {
    id: 'morocco-002',
    name: 'Atlas Mountains Berber Villages Trek',
    country: 'Morocco',
    countryCode: 'MA',
    lat: 31.2078,
    lng: -7.4926,
    duration: 7,
    difficulty: 'Medium',
    typology: 'Sports Activities',
    price: 1650,
    salePrice: null,
    onSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1569163139394-de4798aa62b2?w=800'
  }
];

// ========================================
// FILTER STATE MANAGEMENT
// ========================================

const filterState = {
  search: '',
  countries: [],
  durations: [],
  difficulties: [],
  typologies: [],
  dateFrom: null,
  dateTo: null,
  priceMin: 1350,
  priceMax: 3450
};

// Initialize all countries as selected
filterState.countries = [...new Set(mockAdventures.map(a => a.countryCode))];
filterState.durations = [5, 7, 10, 15];
filterState.difficulties = ['Easy', 'Medium', 'Challenging', 'Difficult'];
filterState.typologies = ['Sports Activities', 'Vacation'];

// ========================================
// MAP INITIALIZATION
// ========================================

const map = L.map('map', {
  center: [45, 10],
  zoom: 3,
  zoomControl: false,
  scrollWheelZoom: true,
  minZoom: 2,
  maxBounds: [[-90, -180], [90, 180]],
  maxBoundsViscosity: 1.0
});

L.control.zoom({
  position: 'topright'
}).addTo(map);

// No tile layer - using blank canvas with world land GeoJSON
// Ocean/water color is set via CSS (#ecf0f1 light gray)
// Load world land layer (white continents)
fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_50m_land.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJson(data, {
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
  });

// Load country territories for countries with adventures
const adventureCountries = [...new Set(mockAdventures.map(a => a.countryCode))];
fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_10m_admin_0_countries.geojson')
  .then(res => res.json())
  .then(data => {
    L.geoJson(data, {
      filter: (feature) => {
        const iso = feature.properties?.ISO_A2;
        const name = feature.properties?.ADMIN || feature.properties?.NAME;
        
        // Match by ISO code or country name
        return adventureCountries.includes(iso) || 
               adventureCountries.some(code => {
                 const adventure = mockAdventures.find(a => a.countryCode === code);
                 return adventure && name && name.toLowerCase().includes(adventure.country.toLowerCase());
               });
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
      onEachFeature: (feature, layer) => {
        // Click territory to filter by that country only
        layer.on('click', function(e) {
          L.DomEvent.stopPropagation(e);
          
          const iso = feature.properties?.ISO_A2;
          const name = feature.properties?.ADMIN || feature.properties?.NAME;
          
          // Find matching country code
          let selectedCountry = null;
          if (adventureCountries.includes(iso)) {
            selectedCountry = iso;
          } else {
            // Try to match by name
            selectedCountry = adventureCountries.find(code => {
              const adventure = mockAdventures.find(a => a.countryCode === code);
              return adventure && name && name.toLowerCase().includes(adventure.country.toLowerCase());
            });
          }
          
          if (selectedCountry) {
            // Set only this country in filter
            filterState.countries = [selectedCountry];
            
            // Update country checkboxes
            document.querySelectorAll('input[name="country"]').forEach(cb => {
              cb.checked = cb.value === selectedCountry;
            });
            
            // Apply filters and update UI
            updateUI();
          }
        });
      }
    }).addTo(map);
  });

const markers = [];
let activeMarkerId = null;

// Create custom price marker
function createPriceMarker(price, isOnSale, salePrice) {
  const displayPrice = isOnSale ? salePrice : price;
  const formattedPrice = new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(displayPrice);

  return L.divIcon({
    className: 'price-pin-icon',
    html: `<div class="price-pin">${formattedPrice}</div>`,
    iconSize: [80, 35],
    iconAnchor: [40, 40]
  });
}

// ========================================
// CORE FILTERING LOGIC
// ========================================

function applyFilters() {
  // AND logic: all conditions must be met
  let filtered = mockAdventures.filter(adventure => {
    // Search filter (OR within search - matches any field)
    if (filterState.search) {
      const query = filterState.search.toLowerCase();
      const matchesSearch = 
        adventure.name.toLowerCase().includes(query) ||
        adventure.country.toLowerCase().includes(query) ||
        adventure.difficulty.toLowerCase().includes(query) ||
        adventure.typology.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Country filter (must match selected countries)
    if (filterState.countries.length > 0) {
      if (!filterState.countries.includes(adventure.countryCode)) return false;
    }

    // Duration filter (must match selected durations)
    if (filterState.durations.length > 0) {
      if (!filterState.durations.includes(adventure.duration)) return false;
    }

    // Difficulty filter (must match selected difficulties)
    if (filterState.difficulties.length > 0) {
      if (!filterState.difficulties.includes(adventure.difficulty)) return false;
    }

    // Typology filter (must match selected typologies)
    if (filterState.typologies.length > 0) {
      if (!filterState.typologies.includes(adventure.typology)) return false;
    }

    // Date filter (if both dates are set)
    if (filterState.dateFrom && filterState.dateTo) {
      // For mockup, we don't have departure dates, so this is a placeholder
      // In real implementation, filter by adventure.departureDate
    }

    // Price filter
    const price = adventure.onSale ? adventure.salePrice : adventure.price;
    if (price < filterState.priceMin || price > filterState.priceMax) return false;

    // All conditions passed
    return true;
  });

  return filtered;
}

// ========================================
// UI UPDATE FUNCTIONS
// ========================================

function updateUI() {
  const filtered = applyFilters();
  
  // Update markers on map
  updateMarkers(filtered);
  
  // Update results cards
  updateResults(filtered);
  
  // Fit map to filtered markers
  if (filtered.length > 0) {
    fitMapToFilteredMarkers(filtered);
  }
  
  // Update Clear All button state
  updateClearAllButton();
}

function updateMarkers(filteredAdventures) {
  // Clear existing markers
  markers.forEach(m => map.removeLayer(m));
  markers.length = 0;
  
  // Add markers for filtered adventures
  filteredAdventures.forEach(adventure => {
    const marker = L.marker(
      [adventure.lat, adventure.lng],
      { icon: createPriceMarker(adventure.price, adventure.onSale, adventure.salePrice) }
    );

    marker.adventureId = adventure.id;
    
    marker.on('click', () => {
      handleMarkerClick(adventure.id);
    });

    marker.addTo(map);
    markers.push(marker);
  });
}

function updateResults(filteredAdventures) {
  const grid = document.getElementById('resultsGrid');
  const resultsPanel = document.getElementById('resultsPanel');
  const resultsTitle = document.querySelector('.results-title');
  
  if (filteredAdventures.length === 0) {
    // No results state
    grid.innerHTML = '';
    resultsPanel.classList.add('no-results');
    resultsPanel.classList.remove('collapsed');
    resultsTitle.innerHTML = 'No adventures match your criteria.';
    return;
  }
  
  // Remove no-results state
  resultsPanel.classList.remove('no-results');
  resultsTitle.innerHTML = `<span id="resultsCount">${filteredAdventures.length}</span> adventures found`;
  
  // Render cards with animation
  grid.innerHTML = filteredAdventures.map((adventure, index) => `
    <div class="adventure-card" data-adventure-id="${adventure.id}" style="animation-delay: ${index * 0.05}s">
      <div class="card-image">
        <img src="${adventure.imageUrl}" alt="${adventure.name}" loading="lazy">
        ${adventure.onSale ? '<div class="sale-badge">SALE</div>' : ''}
      </div>
      <div class="card-content">
        <h3 class="card-title">${adventure.name}</h3>
        <div class="card-location">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
            <circle cx="12" cy="10" r="3"></circle>
          </svg>
          <span>${adventure.country}</span>
        </div>
        <div class="card-meta">
          <div class="card-meta-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"></circle>
              <polyline points="12 6 12 12 16 14"></polyline>
            </svg>
            <span>${adventure.duration} days</span>
          </div>
          <span>•</span>
          <div class="card-meta-item">
            <span>${adventure.difficulty}</span>
          </div>
        </div>
        <div class="divider-fade card-divider"></div>
        <div class="card-footer">
          <div class="card-price">
            <span class="price-current">€${(adventure.onSale ? adventure.salePrice : adventure.price).toLocaleString()}</span>
            ${adventure.onSale ? `<span class="price-original">€${adventure.price.toLocaleString()}</span>` : ''}
          </div>
          <button class="card-button">Details</button>
        </div>
      </div>
    </div>
  `).join('');
  
  // Add click handlers to cards
  document.querySelectorAll('.adventure-card').forEach(card => {
    card.addEventListener('click', () => {
      handleMarkerClick(card.dataset.adventureId);
    });
  });
}

function handleMarkerClick(adventureId) {
  // Update active marker
  markers.forEach(m => {
    const pin = m.getElement()?.querySelector('.price-pin');
    if (pin) {
      pin.classList.remove('active');
    }
  });

  activeMarkerId = adventureId;
  const marker = markers.find(m => m.adventureId === adventureId);
  if (marker) {
    const pin = marker.getElement()?.querySelector('.price-pin');
    if (pin) {
      pin.classList.add('active');
    }
    
    // Center map on marker
    map.setView([marker.getLatLng().lat, marker.getLatLng().lng], 6, {
      animate: true
    });
  }

  // Highlight card in results
  document.querySelectorAll('.adventure-card').forEach(card => {
    card.style.outline = '';
  });
  
  const card = document.querySelector(`[data-adventure-id="${adventureId}"]`);
  if (card) {
    card.scrollIntoView({ behavior: 'smooth', block: 'start' });
    card.style.outline = '2px solid #EA5B10';
    setTimeout(() => {
      card.style.outline = '';
    }, 2000);
  }

  // Expand results panel if collapsed
  const resultsPanel = document.getElementById('resultsPanel');
  if (resultsPanel.classList.contains('collapsed')) {
    resultsPanel.classList.remove('collapsed');
  }
}

function fitMapToFilteredMarkers(filteredAdventures) {
  if (filteredAdventures.length === 0) {
    // No results - reset to world view
    map.setView([45, 10], 3, { animate: true });
    return;
  }
  
  const latLngs = filteredAdventures.map(a => [a.lat, a.lng]);
  const bounds = L.latLngBounds(latLngs);
  
  const isMobile = window.innerWidth <= 768;
  const isPortrait = window.innerHeight > window.innerWidth;
  
  // UX-optimized padding for better visibility
  let paddingTopLeft = [340, 100];
  let paddingBottomRight = [20, 20];
  
  if (isMobile) {
    paddingTopLeft = [20, 120];
    paddingBottomRight = [20, 100];
  }
  
  if (isPortrait && isMobile) {
    paddingTopLeft = [20, 100];
    paddingBottomRight = [20, 120];
  }
  
  // Smart zoom levels based on UX best practices
  let maxZoom;
  const numResults = filteredAdventures.length;
  
  if (numResults === 1) {
    // Single result - city level
    maxZoom = 8;
  } else if (numResults <= 3) {
    // Few results - regional level
    maxZoom = 6;
  } else if (numResults <= 8) {
    // Multiple results - country level
    maxZoom = isMobile ? 5 : 6;
  } else {
    // Many results - continental level
    maxZoom = isMobile ? 4 : 5;
  }
  
  map.fitBounds(bounds, {
    paddingTopLeft: paddingTopLeft,
    paddingBottomRight: paddingBottomRight,
    maxZoom: maxZoom,
    animate: true,
    duration: 0.5
  });
}

function updateClearAllButton() {
  const clearAllBtn = document.getElementById('clearAll');
  const allCountries = [...new Set(mockAdventures.map(a => a.countryCode))];
  
  // Check if all filters are in default state
  const isDefault = 
    filterState.search === '' &&
    filterState.countries.length === allCountries.length &&
    filterState.durations.length === 4 &&
    filterState.difficulties.length === 4 &&
    filterState.typologies.length === 2 &&
    filterState.dateFrom === null &&
    filterState.dateTo === null &&
    filterState.priceMin === 1350 &&
    filterState.priceMax === 3450;
  
  clearAllBtn.disabled = isDefault;
}

// ========================================
// SEARCH FUNCTIONALITY
// ========================================

const searchInput = document.getElementById('searchInput');
const searchClear = document.getElementById('searchClear');
const searchDropdown = document.getElementById('searchDropdown');

// Debounce function for search
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Search with debounce (300ms)
const debouncedSearch = debounce((query) => {
  filterState.search = query;
  updateUI();
}, 300);

searchInput.addEventListener('input', (e) => {
  const value = e.target.value;
  const hasValue = value.length > 0;
  
  // Toggle clear button visibility
  if (hasValue) {
    searchClear.classList.add('active');
  } else {
    searchClear.classList.remove('active');
  }
  
  if (hasValue && value.length >= 1) {
    // Show dropdown with matches (adventures and countries)
    const query = value.toLowerCase();
    
    // Find matching adventures
    const adventureMatches = mockAdventures.filter(a => 
      a.name.toLowerCase().includes(query) ||
      a.country.toLowerCase().includes(query)
    ).slice(0, 5);
    
    // Find unique matching countries
    const countryMatches = [...new Set(mockAdventures
      .filter(a => a.country.toLowerCase().includes(query))
      .map(a => ({ country: a.country, countryCode: a.countryCode }))
    )];
    
    const hasMatches = adventureMatches.length > 0 || countryMatches.length > 0;
    
    if (hasMatches) {
      let dropdownHTML = '';
      
      // Show country matches first
      if (countryMatches.length > 0) {
        dropdownHTML += '<div style="padding: 8px 12px; font-size: 11px; color: #666; text-transform: uppercase; font-weight: 600;">Countries</div>';
        countryMatches.forEach(c => {
          const count = mockAdventures.filter(a => a.countryCode === c.countryCode).length;
          dropdownHTML += `
            <div class="search-dropdown-item" data-type="country" data-country-code="${c.countryCode}" data-country-name="${c.country}">
              <strong>${c.country}</strong><br>
              <small>${count} adventure${count > 1 ? 's' : ''}</small>
            </div>
          `;
        });
      }
      
      // Show adventure matches
      if (adventureMatches.length > 0) {
        if (countryMatches.length > 0) {
          dropdownHTML += '<div style="padding: 8px 12px; font-size: 11px; color: #666; text-transform: uppercase; font-weight: 600; border-top: 1px solid #eee; margin-top: 4px;">Adventures</div>';
        }
        adventureMatches.forEach(a => {
          dropdownHTML += `
            <div class="search-dropdown-item" data-type="adventure" data-id="${a.id}" data-name="${a.name}">
              <strong>${a.name}</strong><br>
              <small>${a.country} • ${a.duration} days • €${(a.onSale ? a.salePrice : a.price).toLocaleString()}</small>
            </div>
          `;
        });
      }
      
      searchDropdown.innerHTML = dropdownHTML;
      searchDropdown.classList.add('active');
      
      // Add click handlers
      searchDropdown.querySelectorAll('.search-dropdown-item').forEach(item => {
        item.addEventListener('click', () => {
          const type = item.dataset.type;
          
          if (type === 'country') {
            // Country clicked - filter by this country only
            const countryCode = item.dataset.countryCode;
            const countryName = item.dataset.countryName;
            
            searchInput.value = countryName;
            filterState.search = countryName;
            filterState.countries = [countryCode];
            
            // Update country checkboxes
            document.querySelectorAll('input[name="country"]').forEach(cb => {
              cb.checked = cb.value === countryCode;
            });
            
            searchClear.classList.add('active');
            searchDropdown.classList.remove('active');
            updateUI();
          } else {
            // Adventure clicked - keep search value and zoom to marker
            const adventureName = item.dataset.name;
            searchInput.value = adventureName;
            filterState.search = adventureName;
            searchClear.classList.add('active');
            searchDropdown.classList.remove('active');
            handleMarkerClick(item.dataset.id);
            updateUI();
          }
        });
      });
    } else {
      searchDropdown.classList.remove('active');
    }
    
    // Apply search filter with debounce
    debouncedSearch(value);
  } else {
    searchDropdown.classList.remove('active');
    if (!hasValue) {
      filterState.search = '';
      updateUI();
    }
  }
});

// Handle Enter key to keep search value
searchInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    e.preventDefault();
    searchDropdown.classList.remove('active');
    filterState.search = searchInput.value;
    updateUI();
  }
});

searchClear.addEventListener('click', () => {
  searchInput.value = '';
  searchClear.classList.remove('active');
  searchDropdown.classList.remove('active');
  filterState.search = '';
  
  // Reset destinations filter to all countries
  filterState.countries = [...new Set(mockAdventures.map(a => a.countryCode))];
  document.querySelectorAll('input[name="country"]').forEach(cb => {
    cb.checked = true;
  });
  
  searchInput.focus();
  updateUI();
});

// Close dropdown when clicking outside
document.addEventListener('click', (e) => {
  if (!e.target.closest('.search-container')) {
    searchDropdown.classList.remove('active');
  }
});

// ========================================
// MOBILE SEARCH (uses same filtering logic)
// ========================================

const mobileSearchInput = document.getElementById('mobileSearchInput');
const mobileSearchClear = document.getElementById('mobileSearchClear');
const mobileSearchDropdown = document.getElementById('mobileSearchDropdown');

if (mobileSearchInput) {
  mobileSearchInput.addEventListener('input', (e) => {
    const value = e.target.value;
    const hasValue = value.length > 0;
    
    // Toggle clear button visibility
    if (hasValue) {
      mobileSearchClear.classList.add('active');
    } else {
      mobileSearchClear.classList.remove('active');
    }
    
    if (hasValue && value.length >= 1) {
      const query = value.toLowerCase();
      
      // Find matching adventures
      const adventureMatches = mockAdventures.filter(a => 
        a.name.toLowerCase().includes(query) ||
        a.country.toLowerCase().includes(query)
      ).slice(0, 5);
      
      // Find unique matching countries
      const countryMatches = [...new Set(mockAdventures
        .filter(a => a.country.toLowerCase().includes(query))
        .map(a => ({ country: a.country, countryCode: a.countryCode }))
      )];
      
      const hasMatches = adventureMatches.length > 0 || countryMatches.length > 0;
      
      if (hasMatches) {
        let dropdownHTML = '';
        
        // Show country matches first
        if (countryMatches.length > 0) {
          dropdownHTML += '<div style="padding: 8px 12px; font-size: 11px; color: #666; text-transform: uppercase; font-weight: 600;">Countries</div>';
          countryMatches.forEach(c => {
            const count = mockAdventures.filter(a => a.countryCode === c.countryCode).length;
            dropdownHTML += `
              <div class="search-dropdown-item" data-type="country" data-country-code="${c.countryCode}" data-country-name="${c.country}">
                <strong>${c.country}</strong><br>
                <small>${count} adventure${count > 1 ? 's' : ''}</small>
              </div>
            `;
          });
        }
        
        // Show adventure matches
        if (adventureMatches.length > 0) {
          if (countryMatches.length > 0) {
            dropdownHTML += '<div style="padding: 8px 12px; font-size: 11px; color: #666; text-transform: uppercase; font-weight: 600; border-top: 1px solid #eee; margin-top: 4px;">Adventures</div>';
          }
          adventureMatches.forEach(a => {
            dropdownHTML += `
              <div class="search-dropdown-item" data-type="adventure" data-id="${a.id}" data-name="${a.name}">
                <strong>${a.name}</strong><br>
                <small>${a.country} • ${a.duration} days • €${(a.onSale ? a.salePrice : a.price).toLocaleString()}</small>
              </div>
            `;
          });
        }
        
        mobileSearchDropdown.innerHTML = dropdownHTML;
        mobileSearchDropdown.classList.add('active');
        
        mobileSearchDropdown.querySelectorAll('.search-dropdown-item').forEach(item => {
          item.addEventListener('click', () => {
            const type = item.dataset.type;
            
            if (type === 'country') {
              // Country clicked - filter by this country only
              const countryCode = item.dataset.countryCode;
              const countryName = item.dataset.countryName;
              
              mobileSearchInput.value = countryName;
              filterState.search = countryName;
              filterState.countries = [countryCode];
              
              // Update country checkboxes
              document.querySelectorAll('input[name="country"]').forEach(cb => {
                cb.checked = cb.value === countryCode;
              });
              
              mobileSearchClear.classList.add('active');
              mobileSearchDropdown.classList.remove('active');
              updateUI();
            } else {
              // Adventure clicked
              const adventureName = item.dataset.name;
              mobileSearchInput.value = adventureName;
              filterState.search = adventureName;
              mobileSearchClear.classList.add('active');
              mobileSearchDropdown.classList.remove('active');
              handleMarkerClick(item.dataset.id);
              updateUI();
            }
          });
        });
      } else {
        mobileSearchDropdown.classList.remove('active');
      }
      
      debouncedSearch(value);
    } else {
      mobileSearchDropdown.classList.remove('active');
      if (!hasValue) {
        filterState.search = '';
        updateUI();
      }
    }
  });

  // Handle Enter key to keep search value
  mobileSearchInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      mobileSearchDropdown.classList.remove('active');
      filterState.search = mobileSearchInput.value;
      updateUI();
    }
  });

  mobileSearchClear.addEventListener('click', () => {
    mobileSearchInput.value = '';
    mobileSearchClear.classList.remove('active');
    mobileSearchDropdown.classList.remove('active');
    filterState.search = '';
    
    // Reset destinations filter to all countries
    filterState.countries = [...new Set(mockAdventures.map(a => a.countryCode))];
    document.querySelectorAll('input[name="country"]').forEach(cb => {
      cb.checked = true;
    });
    
    mobileSearchInput.focus();
    updateUI();
  });
}

// ========================================
// FILTER EVENT HANDLERS
// ========================================

// Country checkboxes
document.querySelectorAll('input[name="country"]').forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
      if (!filterState.countries.includes(e.target.value)) {
        filterState.countries.push(e.target.value);
      }
    } else {
      filterState.countries = filterState.countries.filter(c => c !== e.target.value);
    }
    updateUI();
  });
});

// Duration checkboxes
document.querySelectorAll('input[name="duration"]').forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    const duration = parseInt(e.target.value);
    if (e.target.checked) {
      if (!filterState.durations.includes(duration)) {
        filterState.durations.push(duration);
      }
    } else {
      filterState.durations = filterState.durations.filter(d => d !== duration);
    }
    updateUI();
  });
});

// Difficulty checkboxes
document.querySelectorAll('input[name="difficulty"]').forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
      if (!filterState.difficulties.includes(e.target.value)) {
        filterState.difficulties.push(e.target.value);
      }
    } else {
      filterState.difficulties = filterState.difficulties.filter(d => d !== e.target.value);
    }
    updateUI();
  });
});

// Typology checkboxes
document.querySelectorAll('input[name="typology"]').forEach(checkbox => {
  checkbox.addEventListener('change', (e) => {
    if (e.target.checked) {
      if (!filterState.typologies.includes(e.target.value)) {
        filterState.typologies.push(e.target.value);
      }
    } else {
      filterState.typologies = filterState.typologies.filter(t => t !== e.target.value);
    }
    updateUI();
  });
});

// Date filters
document.getElementById('dateFrom').addEventListener('change', (e) => {
  filterState.dateFrom = e.target.value;
  updateUI();
});

document.getElementById('dateTo').addEventListener('change', (e) => {
  filterState.dateTo = e.target.value;
  updateUI();
});

// Price range sliders
const priceMin = document.getElementById('priceRangeMin');
const priceMax = document.getElementById('priceRangeMax');
const priceMinDisplay = document.getElementById('priceMin');
const priceMaxDisplay = document.getElementById('priceMax');

function updatePriceDisplay() {
  let min = parseInt(priceMin.value);
  let max = parseInt(priceMax.value);
  
  // Prevent overlap
  if (min > max - 100) {
    priceMin.value = max - 100;
    min = max - 100;
  }
  if (max < min + 100) {
    priceMax.value = min + 100;
    max = min + 100;
  }
  
  priceMinDisplay.textContent = `€${min.toLocaleString()}`;
  priceMaxDisplay.textContent = `€${max.toLocaleString()}`;
  
  filterState.priceMin = min;
  filterState.priceMax = max;
}

// Debounced price update
const debouncedPriceUpdate = debounce(() => {
  updateUI();
}, 500);

priceMin.addEventListener('input', () => {
  updatePriceDisplay();
  debouncedPriceUpdate();
});

priceMax.addEventListener('input', () => {
  updatePriceDisplay();
  debouncedPriceUpdate();
});

// Clear all filters
document.getElementById('clearAll').addEventListener('click', () => {
  // Reset filter state
  filterState.countries = [...new Set(mockAdventures.map(a => a.countryCode))];
  filterState.durations = [5, 7, 10, 15];
  filterState.difficulties = ['Easy', 'Medium', 'Challenging', 'Difficult'];
  filterState.typologies = ['Sports Activities', 'Vacation'];
  filterState.dateFrom = null;
  filterState.dateTo = null;
  filterState.priceMin = 1350;
  filterState.priceMax = 3450;
  filterState.search = '';
  
  // Reset UI
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = true);
  document.getElementById('dateFrom').value = '';
  document.getElementById('dateTo').value = '';
  priceMin.value = 1350;
  priceMax.value = 3450;
  updatePriceDisplay();
  searchInput.value = '';
  searchClear.classList.remove('active');
  searchDropdown.classList.remove('active');
  
  updateUI();
});

// ========================================
// FILTER TOGGLE LOGIC
// ========================================

document.querySelectorAll('.filter-toggle').forEach(toggle => {
  toggle.addEventListener('click', () => {
    const filter = toggle.dataset.filter;
    const content = document.querySelector(`[data-content="${filter}"]`);
    const filterBox = toggle.closest('.filter-box');
    const isExpanded = content.classList.contains('expanded');
    
    content.classList.toggle('expanded');
    toggle.setAttribute('aria-expanded', !isExpanded);
    
    if (content.classList.contains('expanded')) {
      filterBox.classList.add('expanded');
    } else {
      filterBox.classList.remove('expanded');
    }
  });

  // Set initial state
  const filter = toggle.dataset.filter;
  const content = document.querySelector(`[data-content="${filter}"]`);
  const filterBox = toggle.closest('.filter-box');
  const isExpanded = content.classList.contains('expanded');
  
  toggle.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
  
  if (isExpanded) {
    filterBox.classList.add('expanded');
  }
});

// ========================================
// RESULTS PANEL
// ========================================

document.getElementById('resultsHeader').addEventListener('click', () => {
  const resultsPanel = document.getElementById('resultsPanel');
  if (!resultsPanel.classList.contains('no-results')) {
    resultsPanel.classList.toggle('collapsed');
  }
});

document.getElementById('resultsExpand').addEventListener('click', (e) => {
  e.stopPropagation();
  const resultsPanel = document.getElementById('resultsPanel');
  if (!resultsPanel.classList.contains('no-results')) {
    resultsPanel.classList.toggle('collapsed');
  }
});

// ========================================
// MOBILE CONTROLS
// ========================================

const mobileFilterBtn = document.getElementById('mobileFilterBtn');
const sidebar = document.querySelector('.sidebar');
const mobileSearchContainer = document.querySelector('.mobile-controls .search-container');
const mobileControlsContainer = document.querySelector('.mobile-controls');

// Mobile search expand on focus
if (mobileSearchContainer && mobileSearchInput) {
  mobileSearchInput.addEventListener('focus', () => {
    // Add search-active class to mobile-controls
    if (mobileControlsContainer) {
      mobileControlsContainer.classList.add('search-active');
      mobileControlsContainer.classList.remove('filter-active');
    }
    
    // Close filter if open
    if (sidebar.classList.contains('mobile-open')) {
      sidebar.classList.remove('mobile-open');
      mobileFilterBtn.classList.remove('active');
      // Reset button to filter icon
      mobileFilterBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <line x1="4" y1="6" x2="20" y2="6" stroke-width="2"/>
          <line x1="4" y1="12" x2="20" y2="12" stroke-width="2"/>
          <line x1="4" y1="18" x2="20" y2="18" stroke-width="2"/>
        </svg>
        <span>Filters</span>
      `;
    }
  });
  
  // Clear button in mobile search also collapses search
  if (mobileSearchClear) {
    mobileSearchClear.addEventListener('click', (e) => {
      if (mobileControlsContainer) {
        mobileControlsContainer.classList.remove('search-active');
      }
    });
  }
  
  // Blur event to collapse search if empty
  mobileSearchInput.addEventListener('blur', () => {
    setTimeout(() => {
      if (!mobileSearchInput.value && mobileControlsContainer) {
        mobileControlsContainer.classList.remove('search-active');
      }
    }, 200);
  });
}

mobileFilterBtn.addEventListener('click', () => {
  const isOpen = sidebar.classList.contains('mobile-open');
  
  sidebar.classList.toggle('mobile-open');
  mobileFilterBtn.classList.toggle('active');
  
  // Change button content based on state
  if (!isOpen) {
    // Opening filter - add filter-active class
    if (mobileControlsContainer) {
      mobileControlsContainer.classList.add('filter-active');
      mobileControlsContainer.classList.remove('search-active');
    }
    
    // Changing to close button
    mobileFilterBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 16 16" fill="none" stroke="currentColor">
        <path d="M12 4L4 12M4 4l8 8" stroke-width="2" stroke-linecap="round"/>
      </svg>
    `;
    
    // Hide mobile search when filter opens
    if (mobileSearchInput) {
      mobileSearchInput.blur();
    }
  } else {
    // Closing filter - remove filter-active class
    if (mobileControlsContainer) {
      mobileControlsContainer.classList.remove('filter-active');
    }
    
    // Changing back to filter button
    mobileFilterBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <line x1="4" y1="6" x2="20" y2="6" stroke-width="2"/>
        <line x1="4" y1="12" x2="20" y2="12" stroke-width="2"/>
        <line x1="4" y1="18" x2="20" y2="18" stroke-width="2"/>
      </svg>
      <span>Filters</span>
    `;
  }
});

document.getElementById('map').addEventListener('click', () => {
  if (window.innerWidth <= 768) {
    sidebar.classList.remove('mobile-open');
    mobileFilterBtn.classList.remove('active');
    
    // Remove filter-active class
    if (mobileControlsContainer) {
      mobileControlsContainer.classList.remove('filter-active');
      mobileControlsContainer.classList.remove('search-active');
    }
    
    // Reset button to filter icon
    mobileFilterBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <line x1="4" y1="6" x2="20" y2="6" stroke-width="2"/>
        <line x1="4" y1="12" x2="20" y2="12" stroke-width="2"/>
        <line x1="4" y1="18" x2="20" y2="18" stroke-width="2"/>
      </svg>
      <span>Filters</span>
    `;
  }
});

// Mobile close button in filter header (for small screens)
const mobileCloseBtn = document.getElementById('mobileCloseBtn');
if (mobileCloseBtn) {
  mobileCloseBtn.addEventListener('click', () => {
    sidebar.classList.remove('mobile-open');
    mobileFilterBtn.classList.remove('active');
    
    // Remove filter-active class
    if (mobileControlsContainer) {
      mobileControlsContainer.classList.remove('filter-active');
    }
    
    // Reset button to filter icon
    mobileFilterBtn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <line x1="4" y1="6" x2="20" y2="6" stroke-width="2"/>
        <line x1="4" y1="12" x2="20" y2="12" stroke-width="2"/>
        <line x1="4" y1="18" x2="20" y2="18" stroke-width="2"/>
      </svg>
      <span>Filters</span>
    `;
  });
}

// ========================================
// SCROLL INDICATOR
// ========================================

const sidebarElement = document.getElementById('sidebar');
const scrollIndicator = document.getElementById('scrollIndicator');

function updateScrollIndicator() {
  if (!sidebarElement || !scrollIndicator) return;
  
  const isAtTop = sidebarElement.scrollTop < 50;
  const hasScroll = sidebarElement.scrollHeight > sidebarElement.clientHeight;
  
  if (isAtTop && hasScroll) {
    scrollIndicator.classList.add('visible');
  } else {
    scrollIndicator.classList.remove('visible');
  }
}

sidebarElement.addEventListener('scroll', updateScrollIndicator);
window.addEventListener('resize', updateScrollIndicator);

// ========================================
// INITIALIZATION
// ========================================

// Initial render
updateUI();

// Update scroll indicator
setTimeout(() => {
  updateScrollIndicator();
}, 500);

console.log('🗺️ TribeTravel Adventures Map - Real-time Filtering Enabled');
console.log(`📍 ${mockAdventures.length} adventures loaded`);
console.log('✅ Search, filters, map, and results fully synchronized');
