/**
 * Debugging utilities and toolbar
 */

export interface DebugConfig {
  enabled: boolean;
  verboseLogging: boolean;
  showToolbar: boolean;
  logGeoJSON: boolean;
  logEvents: boolean;
  logStyles: boolean;
}

// Debug configuration - controlled by URL params or localStorage
const DEBUG_KEY = 'leaflet_debug';

class MapDebugger {
  private config: DebugConfig;
  private toolbar: HTMLElement | null = null;
  private logContainer: HTMLElement | null = null;
  private logs: Array<{ type: string; message: string; timestamp: Date; data?: any }> = [];

  constructor() {
    // Check URL params first, then localStorage
    const urlParams = new URLSearchParams(window.location.search);
    const debugParam = urlParams.get('debug');
    
    const storedConfig = localStorage.getItem(DEBUG_KEY);
    const defaultConfig: DebugConfig = {
      enabled: debugParam === 'true' || debugParam === '1',
      verboseLogging: false,
      showToolbar: true,
      logGeoJSON: true,
      logEvents: true,
      logStyles: true,
    };

    this.config = storedConfig ? { ...defaultConfig, ...JSON.parse(storedConfig) } : defaultConfig;

    // Enable debug mode via URL param
    if (debugParam) {
      this.config.enabled = true;
      this.saveConfig();
    }

    if (this.config.enabled) {
      this.init();
    }
  }

  private init(): void {
    this.log('info', '🐛 Debug mode enabled', { config: this.config });
    
    if (this.config.showToolbar) {
      this.createToolbar();
    }

    // Add global error handler
    window.addEventListener('error', (e) => {
      this.log('error', `Global error: ${e.message}`, {
        error: e.error,
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
      });
    });

    // Add unhandled rejection handler
    window.addEventListener('unhandledrejection', (e) => {
      this.log('error', `Unhandled promise rejection: ${e.reason}`, { reason: e.reason });
    });
  }

  private createToolbar(): void {
    this.toolbar = document.createElement('div');
    this.toolbar.id = 'debug-toolbar';
    this.toolbar.className = 'debug-toolbar';
    
    this.toolbar.innerHTML = `
      <div class="debug-toolbar-header">
        <span class="debug-toolbar-title">🐛 Debug Toolbar</span>
        <button class="debug-btn debug-btn-close" data-action="toggle">_</button>
      </div>
      <div class="debug-toolbar-content">
        <div class="debug-section">
          <h4>Debug Options</h4>
          <label>
            <input type="checkbox" id="debug-verbose" ${this.config.verboseLogging ? 'checked' : ''}>
            Verbose Logging
          </label>
          <label>
            <input type="checkbox" id="debug-geojson" ${this.config.logGeoJSON ? 'checked' : ''}>
            Log GeoJSON
          </label>
          <label>
            <input type="checkbox" id="debug-events" ${this.config.logEvents ? 'checked' : ''}>
            Log Events
          </label>
          <label>
            <input type="checkbox" id="debug-styles" ${this.config.logStyles ? 'checked' : ''}>
            Log Styles
          </label>
        </div>
        <div class="debug-section">
          <h4>Actions</h4>
          <button class="debug-btn" data-action="clear">Clear Logs</button>
          <button class="debug-btn" data-action="export">Export Logs</button>
          <button class="debug-btn" data-action="disable">Disable Debug</button>
        </div>
        <div class="debug-section debug-logs">
          <h4>Console Logs <span class="debug-log-count">(0)</span></h4>
          <div id="debug-log-container" class="debug-log-container"></div>
        </div>
      </div>
    `;

    document.body.appendChild(this.toolbar);
    this.logContainer = document.getElementById('debug-log-container');

    // Bind events
    this.toolbar.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      const action = target.dataset.action;

      if (action === 'toggle') {
        this.toolbar?.classList.toggle('collapsed');
      } else if (action === 'clear') {
        this.clearLogs();
      } else if (action === 'export') {
        this.exportLogs();
      } else if (action === 'disable') {
        this.disable();
      }
    });

    // Bind checkboxes
    document.getElementById('debug-verbose')?.addEventListener('change', (e) => {
      this.config.verboseLogging = (e.target as HTMLInputElement).checked;
      this.saveConfig();
    });
    document.getElementById('debug-geojson')?.addEventListener('change', (e) => {
      this.config.logGeoJSON = (e.target as HTMLInputElement).checked;
      this.saveConfig();
    });
    document.getElementById('debug-events')?.addEventListener('change', (e) => {
      this.config.logEvents = (e.target as HTMLInputElement).checked;
      this.saveConfig();
    });
    document.getElementById('debug-styles')?.addEventListener('change', (e) => {
      this.config.logStyles = (e.target as HTMLInputElement).checked;
      this.saveConfig();
    });
  }

  log(type: 'info' | 'warn' | 'error' | 'success', message: string, data?: any): void {
    if (!this.config.enabled) return;

    const logEntry = {
      type,
      message,
      timestamp: new Date(),
      data,
    };

    this.logs.push(logEntry);

    // Console output with styling
    const styles = {
      info: 'color: #3498db',
      warn: 'color: #f39c12',
      error: 'color: #e74c3c',
      success: 'color: #2ecc71',
    };

    if (this.config.verboseLogging || type === 'error') {
      console.log(`%c[DEBUG ${type.toUpperCase()}]`, styles[type], message, data || '');
    }

    // Update UI
    this.updateLogUI(logEntry);
  }

  logGeoJSON(label: string, data: any): void {
    if (!this.config.enabled || !this.config.logGeoJSON) return;

    this.log('info', `GeoJSON: ${label}`, {
      type: data.type,
      features: data.features?.length || 0,
      sample: data.features?.[0],
    });

    // Validate GeoJSON structure
    if (data.type !== 'FeatureCollection') {
      this.log('error', `Invalid GeoJSON: Expected FeatureCollection, got ${data.type}`);
    }

    data.features?.forEach((feature: any, index: number) => {
      if (!feature.geometry) {
        this.log('error', `Feature ${index} (${feature.properties?.name}) missing geometry!`, feature);
      } else if (!feature.geometry.type || !feature.geometry.coordinates) {
        this.log('error', `Feature ${index} has invalid geometry`, feature.geometry);
      }
    });
  }

  logEvent(eventName: string, data?: any): void {
    if (!this.config.enabled || !this.config.logEvents) return;
    this.log('info', `Event: ${eventName}`, data);
  }

  logStyle(label: string, style: any): void {
    if (!this.config.enabled || !this.config.logStyles) return;
    this.log('info', `Style: ${label}`, style);
  }

  private updateLogUI(entry: typeof this.logs[0]): void {
    if (!this.logContainer) return;

    const logElement = document.createElement('div');
    logElement.className = `debug-log-entry debug-log-${entry.type}`;
    
    const time = entry.timestamp.toLocaleTimeString();
    
    logElement.innerHTML = `
      <span class="debug-log-time">${time}</span>
      <span class="debug-log-type">[${entry.type.toUpperCase()}]</span>
      <span class="debug-log-message">${entry.message}</span>
      ${entry.data ? `<pre class="debug-log-data">${JSON.stringify(entry.data, null, 2)}</pre>` : ''}
    `;

    this.logContainer.appendChild(logElement);
    this.logContainer.scrollTop = this.logContainer.scrollHeight;

    // Update count
    const countElement = this.toolbar?.querySelector('.debug-log-count');
    if (countElement) {
      countElement.textContent = `(${this.logs.length})`;
    }

    // Limit log entries in UI (keep last 100)
    if (this.logContainer.children.length > 100) {
      this.logContainer.removeChild(this.logContainer.firstChild as Node);
    }
  }

  private clearLogs(): void {
    this.logs = [];
    if (this.logContainer) {
      this.logContainer.innerHTML = '';
    }
    const countElement = this.toolbar?.querySelector('.debug-log-count');
    if (countElement) {
      countElement.textContent = '(0)';
    }
    console.clear();
    this.log('success', 'Logs cleared');
  }

  private exportLogs(): void {
    const exportData = {
      timestamp: new Date().toISOString(),
      config: this.config,
      logs: this.logs,
      userAgent: navigator.userAgent,
      url: window.location.href,
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `debug-logs-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    this.log('success', 'Logs exported');
  }

  private disable(): void {
    this.config.enabled = false;
    localStorage.removeItem(DEBUG_KEY);
    this.toolbar?.remove();
    this.log('warn', 'Debug mode disabled - reload page to apply');
    setTimeout(() => {
      window.location.href = window.location.pathname;
    }, 1000);
  }

  private saveConfig(): void {
    localStorage.setItem(DEBUG_KEY, JSON.stringify(this.config));
  }

  isEnabled(): boolean {
    return this.config.enabled;
  }

  getConfig(): DebugConfig {
    return { ...this.config };
  }
}

// Singleton instance
export const mapDebugger = new MapDebugger();

// Helper functions
export const debugLog = (type: 'info' | 'warn' | 'error' | 'success', message: string, data?: any) => {
  mapDebugger.log(type, message, data);
};

export const debugGeoJSON = (label: string, data: any) => {
  mapDebugger.logGeoJSON(label, data);
};

export const debugEvent = (eventName: string, data?: any) => {
  mapDebugger.logEvent(eventName, data);
};

export const debugStyle = (label: string, style: any) => {
  mapDebugger.logStyle(label, style);
};
