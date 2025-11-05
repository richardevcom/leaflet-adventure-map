/**
 * Mock adventure data for TribeTravel Adventures
 * This will be replaced with dynamic data from WordPress in production
 */

import type { Adventure } from '../types/index.js';

export const mockAdventures: Adventure[] = [
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
    salePrice: null,
    onSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1587595431973-160d0d94add1?w=800'
  },
  {
    id: 'thailand-001',
    name: 'Chiang Mai Elephant Sanctuary & Temples',
    country: 'Thailand',
    countryCode: 'TH',
    lat: 18.7883,
    lng: 98.9853,
    duration: 7,
    difficulty: 'Easy',
    typology: 'Vacation',
    price: 1950,
    salePrice: 1755,
    onSale: true,
    imageUrl: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800'
  },
  {
    id: 'iceland-002',
    name: 'Golden Circle & South Coast Explorer',
    country: 'Iceland',
    countryCode: 'IS',
    lat: 64.1466,
    lng: -21.9426,
    duration: 5,
    difficulty: 'Easy',
    typology: 'Vacation',
    price: 1650,
    salePrice: null,
    onSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1504893524553-b855bce32c67?w=800'
  },
  {
    id: 'norway-002',
    name: 'Fjords Kayaking Expedition',
    country: 'Norway',
    countryCode: 'NO',
    lat: 61.0,
    lng: 7.0,
    duration: 10,
    difficulty: 'Medium',
    typology: 'Sports Activities',
    price: 2650,
    salePrice: null,
    onSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1601439678777-b2d6e8e9a499?w=800'
  },
  {
    id: 'newzealand-002',
    name: 'Tongariro Alpine Crossing Trek',
    country: 'New Zealand',
    countryCode: 'NZ',
    lat: -39.1333,
    lng: 175.5833,
    duration: 7,
    difficulty: 'Medium',
    typology: 'Sports Activities',
    price: 2150,
    salePrice: null,
    onSale: false,
    imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=800'
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

/**
 * Get all unique countries from adventures
 */
export function getUniqueCountries(): string[] {
  return [...new Set(mockAdventures.map(a => a.countryCode))];
}

/**
 * Get all unique durations from adventures
 */
export function getUniqueDurations(): number[] {
  return [...new Set(mockAdventures.map(a => a.duration))].sort((a, b) => a - b);
}

/**
 * Get price range from all adventures
 */
export function getPriceRange(): { min: number; max: number } {
  const prices = mockAdventures.map(a => a.onSale && a.salePrice ? a.salePrice : a.price);
  return {
    min: Math.min(...prices),
    max: Math.max(...prices)
  };
}
