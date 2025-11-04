/**
 * Map helper functions and configuration
 * For visual customization, see visualConfig.ts
 */

import type { PathOptions } from 'leaflet';
import { DEFAULT_VISUAL_CONFIG, getTerritoryStyle } from './visualConfig';

export type TerritoryStyle = PathOptions;

// Re-export visual config for backward compatibility
export const COLORS = DEFAULT_VISUAL_CONFIG.colors;
export const MAP_CONFIG = DEFAULT_VISUAL_CONFIG.map;

// Territory styles (generated from visual config)
export const defaultStyle: TerritoryStyle = getTerritoryStyle();
export const hoverStyle: TerritoryStyle = getTerritoryStyle();
export const activeStyle: TerritoryStyle = getTerritoryStyle();
