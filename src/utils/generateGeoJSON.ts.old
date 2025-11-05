/**
 * Generate destinations.geojson from world-geojson package
 * Run with: bun run src/utils/generateGeoJSON.ts
 */

import * as geoJson from 'world-geojson';
import { writeFileSync } from 'fs';
import { join } from 'path';
import type { DestinationsCollection, Destination, DestinationProperties } from '../types';

// Adventure destinations list
const destinations = [
  { name: 'Iceland', code: 'IS', type: 'country' as const },
  { name: 'Norway', code: 'NO', type: 'country' as const },
  { name: 'New Zealand', code: 'NZ', type: 'country' as const },
  { name: 'Costa Rica', code: 'CR', type: 'country' as const },
  { name: 'Japan', code: 'JP', type: 'country' as const },
  { name: 'Morocco', code: 'MA', type: 'country' as const },
  { name: 'Peru', code: 'PE', type: 'country' as const },
  { name: 'Tanzania', code: 'TZ', type: 'country' as const },
  { name: 'Portugal', code: 'PT', type: 'country' as const },
  { name: 'Greece', code: 'GR', type: 'country' as const },
];

// Generate GeoJSON FeatureCollection
const features: Destination[] = destinations.map((dest) => {
  const countryGeoJson = geoJson.forCountry(dest.name);
  
  // world-geojson returns a FeatureCollection, get the first feature's geometry
  const firstFeature = countryGeoJson.features[0];
  
  return {
    type: 'Feature',
    properties: {
      name: dest.name,
      type: dest.type,
      code: dest.code,
    } as DestinationProperties,
    geometry: firstFeature.geometry,
  };
});

const destinationsCollection: DestinationsCollection = {
  type: 'FeatureCollection',
  features,
};

// Write to file
const outputPath = join(process.cwd(), 'src', 'data', 'destinations.geojson');
writeFileSync(outputPath, JSON.stringify(destinationsCollection, null, 2));

console.log(`✅ Generated destinations.geojson with ${features.length} destinations`);
console.log(`📍 Destinations: ${destinations.map(d => d.name).join(', ')}`);
console.log(`📂 File: ${outputPath}`);
