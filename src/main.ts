/**
 * Leaflet Adventures Destinations Map
 * Entry point
 */

import './styles/main.scss';
import { initializeMap } from './map';

// Initialize map on page load
document.addEventListener('DOMContentLoaded', async () => {
  try {
    await initializeMap('map');
  } catch (error) {
    console.error('Failed to initialize map:', error);
    document.getElementById('map')!.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; height: 100%; color: #e74c3c; font-family: sans-serif;">
        <div style="text-align: center;">
          <h2>⚠️ Map Failed to Load</h2>
          <p>${error instanceof Error ? error.message : String(error)}</p>
        </div>
      </div>
    `;
  }
});
