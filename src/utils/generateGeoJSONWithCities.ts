/**
 * Generate GeoJSON with countries and their cities
 * Run with: bun src/utils/generateGeoJSONWithCities.ts
 */

import * as fs from 'fs';
import * as path from 'path';
import { forCountry } from 'world-geojson';
import type { DestinationsCollection, CityDestination } from '../types';

// Destination countries with their cities
const destinationData: { [key: string]: { name: string; cities: CityDestination[] } } = {
  IS: {
    name: 'Iceland',
    cities: [
      { name: 'Reykjavik', code: 'IS-REY', lat: 64.1466, lng: -21.9426, url: '/destinations/iceland/reykjavik' },
      { name: 'Akureyri', code: 'IS-AKU', lat: 65.6885, lng: -18.1262, url: '/destinations/iceland/akureyri' },
    ],
  },
  NO: {
    name: 'Norway',
    cities: [
      { name: 'Oslo', code: 'NO-OSL', lat: 59.9139, lng: 10.7522, url: '/destinations/norway/oslo' },
      { name: 'Bergen', code: 'NO-BER', lat: 60.3913, lng: 5.3221, url: '/destinations/norway/bergen' },
      { name: 'Tromsø', code: 'NO-TRO', lat: 69.6492, lng: 18.9553, url: '/destinations/norway/tromso' },
    ],
  },
  NZ: {
    name: 'New Zealand',
    cities: [
      { name: 'Queenstown', code: 'NZ-ZQN', lat: -45.0312, lng: 168.6626, url: '/destinations/new-zealand/queenstown' },
      { name: 'Auckland', code: 'NZ-AKL', lat: -36.8485, lng: 174.7633, url: '/destinations/new-zealand/auckland' },
    ],
  },
  CR: {
    name: 'Costa Rica',
    cities: [
      { name: 'San José', code: 'CR-SJO', lat: 9.9281, lng: -84.0907, url: '/destinations/costa-rica/san-jose' },
      { name: 'La Fortuna', code: 'CR-LAF', lat: 10.4677, lng: -84.6431, url: '/destinations/costa-rica/la-fortuna' },
    ],
  },
  JP: {
    name: 'Japan',
    cities: [
      { name: 'Tokyo', code: 'JP-TYO', lat: 35.6762, lng: 139.6503, url: '/destinations/japan/tokyo' },
      { name: 'Kyoto', code: 'JP-KYO', lat: 35.0116, lng: 135.7681, url: '/destinations/japan/kyoto' },
      { name: 'Osaka', code: 'JP-OSA', lat: 34.6937, lng: 135.5023, url: '/destinations/japan/osaka' },
    ],
  },
  MA: {
    name: 'Morocco',
    cities: [
      { name: 'Marrakech', code: 'MA-RAK', lat: 31.6295, lng: -7.9811, url: '/destinations/morocco/marrakech' },
      { name: 'Casablanca', code: 'MA-CAS', lat: 33.5731, lng: -7.5898, url: '/destinations/morocco/casablanca' },
    ],
  },
  PE: {
    name: 'Peru',
    cities: [
      { name: 'Cusco', code: 'PE-CUZ', lat: -13.5319, lng: -71.9675, url: '/destinations/peru/cusco' },
      { name: 'Lima', code: 'PE-LIM', lat: -12.0464, lng: -77.0428, url: '/destinations/peru/lima' },
    ],
  },
  TZ: {
    name: 'Tanzania',
    cities: [
      { name: 'Arusha', code: 'TZ-ARK', lat: -3.3869, lng: 36.6830, url: '/destinations/tanzania/arusha' },
      { name: 'Dar es Salaam', code: 'TZ-DAR', lat: -6.7924, lng: 39.2083, url: '/destinations/tanzania/dar-es-salaam' },
    ],
  },
  PT: {
    name: 'Portugal',
    cities: [
      { name: 'Lisbon', code: 'PT-LIS', lat: 38.7223, lng: -9.1393, url: '/destinations/portugal/lisbon' },
      { name: 'Porto', code: 'PT-OPO', lat: 41.1579, lng: -8.6291, url: '/destinations/portugal/porto' },
      { name: 'Lagos', code: 'PT-LAG', lat: 37.1028, lng: -8.6742, url: '/destinations/portugal/lagos' },
    ],
  },
  GR: {
    name: 'Greece',
    cities: [
      { name: 'Athens', code: 'GR-ATH', lat: 37.9838, lng: 23.7275, url: '/destinations/greece/athens' },
      { name: 'Santorini', code: 'GR-JTR', lat: 36.3932, lng: 25.4615, url: '/destinations/greece/santorini' },
      { name: 'Crete', code: 'GR-CHQ', lat: 35.3387, lng: 25.1442, url: '/destinations/greece/crete' },
    ],
  },
};

// Generate GeoJSON with cities
const features = Object.entries(destinationData).map(([code, data]) => {
  const countryGeoJson = forCountry(data.name);
  if (!countryGeoJson || !countryGeoJson.features || countryGeoJson.features.length === 0) {
    throw new Error(`Country ${data.name} not found in world-geojson`);
  }

  return {
    type: 'Feature' as const,
    properties: {
      name: data.name,
      type: 'country' as const,
      code: code,
      cities: data.cities,
    },
    geometry: countryGeoJson.features[0].geometry,
  };
});

const collection: DestinationsCollection = {
  type: 'FeatureCollection',
  features,
};

// Write to file
const outputPath = path.join(__dirname, '../data/destinations.geojson');
fs.writeFileSync(outputPath, JSON.stringify(collection, null, 2));

console.log('✅ Generated destinations.geojson with cities');
console.log(`   Countries: ${features.length}`);
console.log(`   Total cities: ${Object.values(destinationData).reduce((sum, d) => sum + d.cities.length, 0)}`);
