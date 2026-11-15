import heroLuxurySuv from '../assets/images/hero_luxury_suv_1794745185023.jpg';
import vehicleSuvShowcase from '../assets/images/vehicle_suv_showcase_1794745186375.jpg';
import vehicleSedanShowcase from '../assets/images/vehicle_sedan_showcase_1794745187287.jpg';
import vehicleLuxuryShowcase from '../assets/images/vehicle_luxury_showcase_1794745188541.jpg';
import vehicleInteriorDetail from '../assets/images/vehicle_interior_detail_1794745188039.jpg';

export type VehicleCategory = 'SUVs' | 'Sedans' | 'Luxury Collection';
export type VehicleAvailability =
  | 'Sample Placeholder'
  | 'Available'
  | 'In Transit'
  | 'Reserved';

export interface VehicleImage {
  url: string;
  caption: string;
}

export interface Vehicle {
  id: string;
  category: VehicleCategory;
  isSamplePlaceholder: boolean;
  manufacturer: string;
  model: string;
  year: string;
  transmission: string;
  fuelType: string;
  engineCapacity: string;
  mileage: string;
  priceETB: string;
  availability: VehicleAvailability;
  summary: string;
  highlights: string[];
  images: VehicleImage[];
}

export const SHOWCASE_IMAGES = {
  hero: heroLuxurySuv,
  suv: vehicleSuvShowcase,
  sedan: vehicleSedanShowcase,
  luxury: vehicleLuxuryShowcase,
  interior: vehicleInteriorDetail,
};

/**
 * Editable sample placeholder inventory for BINI CARS.
 * Replace these sample entries with confirmed vehicle specifications, photographs, and ETB pricing.
 */
export const DEFAULT_SAMPLE_VEHICLES: Vehicle[] = [
  {
    id: 'sample-suv-01',
    category: 'SUVs',
    isSamplePlaceholder: true,
    manufacturer: 'Sample Manufacturer',
    model: 'Executive Full-Size SUV (Sample 01)',
    year: '2024 (Sample)',
    transmission: 'Automatic (Sample)',
    fuelType: 'Hybrid / Petrol (Sample)',
    engineCapacity: '3,000 cc (Sample)',
    mileage: '0 km (Sample)',
    priceETB: 'ETB — Upon Inquiry (Sample)',
    availability: 'Sample Placeholder',
    summary:
      'Editable sample listing demonstrating an executive SUV slot prepared for Ethiopia road conditions and city driving.',
    highlights: [
      'Sample specification: All-wheel drive capability',
      'Sample specification: Multi-zone climate control',
      'Sample specification: Full import documentation checklist ready',
    ],
    images: [
      { url: vehicleSuvShowcase, caption: 'Exterior three-quarter profile (Sample visual)' },
      { url: vehicleInteriorDetail, caption: 'Cabin leather & trim presentation (Sample visual)' },
      { url: heroLuxurySuv, caption: 'Arrival forecourt perspective (Sample visual)' },
    ],
  },
  {
    id: 'sample-suv-02',
    category: 'SUVs',
    isSamplePlaceholder: true,
    manufacturer: 'Sample Manufacturer',
    model: 'All-Terrain Touring SUV (Sample 02)',
    year: '2023 (Sample)',
    transmission: 'Automatic (Sample)',
    fuelType: 'Diesel / Hybrid (Sample)',
    engineCapacity: '2,800 cc (Sample)',
    mileage: '12,000 km (Sample)',
    priceETB: 'ETB — Upon Inquiry (Sample)',
    availability: 'Sample Placeholder',
    summary:
      'Editable sample listing representing a long-distance SUV configuration suited for highway and highland travel.',
    highlights: [
      'Sample specification: Elevated ground clearance',
      'Sample specification: Adaptive suspension system',
      'Sample specification: Pre-shipment inspection slot',
    ],
    images: [
      { url: heroLuxurySuv, caption: 'Front architectural view (Sample visual)' },
      { url: vehicleSuvShowcase, caption: 'Side stance and wheel detail (Sample visual)' },
      { url: vehicleInteriorDetail, caption: 'Interior craftsmanship preview (Sample visual)' },
    ],
  },
  {
    id: 'sample-sedan-01',
    category: 'Sedans',
    isSamplePlaceholder: true,
    manufacturer: 'Sample Manufacturer',
    model: 'Executive Saloon (Sample 03)',
    year: '2024 (Sample)',
    transmission: 'Automatic (Sample)',
    fuelType: 'Petrol / Mild Hybrid (Sample)',
    engineCapacity: '2,000 cc (Sample)',
    mileage: '0 km (Sample)',
    priceETB: 'ETB — Upon Inquiry (Sample)',
    availability: 'Sample Placeholder',
    summary:
      'Editable sample listing for an executive sedan tailored for diplomatic, corporate, and private chauffeur use.',
    highlights: [
      'Sample specification: Acoustic cabin insulation',
      'Sample specification: Executive rear passenger legroom',
      'Sample specification: Driver assistance package',
    ],
    images: [
      { url: vehicleSedanShowcase, caption: 'Executive sedan exterior view (Sample visual)' },
      { url: vehicleInteriorDetail, caption: 'Ivory leather cabin presentation (Sample visual)' },
    ],
  },
  {
    id: 'sample-sedan-02',
    category: 'Sedans',
    isSamplePlaceholder: true,
    manufacturer: 'Sample Manufacturer',
    model: 'Modern Touring Sedan (Sample 04)',
    year: '2023 (Sample)',
    transmission: 'Automatic (Sample)',
    fuelType: 'Electric / Hybrid (Sample)',
    engineCapacity: '1,800 cc (Sample)',
    mileage: '8,500 km (Sample)',
    priceETB: 'ETB — Upon Inquiry (Sample)',
    availability: 'Sample Placeholder',
    summary:
      'Editable sample listing showcasing an efficient urban and intercity sedan option awaiting official stock details.',
    highlights: [
      'Sample specification: Fuel-efficient powertrain',
      'Sample specification: Digital cockpit interface',
      'Sample specification: Verified service history slot',
    ],
    images: [
      { url: vehicleSedanShowcase, caption: 'Exterior three-quarter angle (Sample visual)' },
      { url: vehicleInteriorDetail, caption: 'Steering and console detail (Sample visual)' },
    ],
  },
  {
    id: 'sample-luxury-01',
    category: 'Luxury Collection',
    isSamplePlaceholder: true,
    manufacturer: 'Sample Manufacturer',
    model: 'Flagship Showroom Edition (Sample 05)',
    year: '2025 (Sample)',
    transmission: 'Automatic (Sample)',
    fuelType: 'Hybrid / Petrol (Sample)',
    engineCapacity: '3,500 cc (Sample)',
    mileage: '0 km (Sample)',
    priceETB: 'ETB — Upon Inquiry (Sample)',
    availability: 'Sample Placeholder',
    summary:
      'Editable sample listing reserved for BINI CARS bespoke imports and special-order flagship models.',
    highlights: [
      'Sample specification: Hand-finished interior upholstery',
      'Sample specification: Panoramic glass roof',
      'Sample specification: Priority import allocation',
    ],
    images: [
      { url: vehicleLuxuryShowcase, caption: 'Showroom gallery presentation (Sample visual)' },
      { url: vehicleInteriorDetail, caption: 'Quilted ivory interior view (Sample visual)' },
      { url: heroLuxurySuv, caption: 'Evening pavilion profile (Sample visual)' },
    ],
  },
  {
    id: 'sample-luxury-02',
    category: 'Luxury Collection',
    isSamplePlaceholder: true,
    manufacturer: 'Sample Manufacturer',
    model: 'Bespoke Executive Lounge (Sample 06)',
    year: '2024 (Sample)',
    transmission: 'Automatic (Sample)',
    fuelType: 'Hybrid (Sample)',
    engineCapacity: '3,000 cc (Sample)',
    mileage: '1,200 km (Sample)',
    priceETB: 'ETB — Upon Inquiry (Sample)',
    availability: 'Sample Placeholder',
    summary:
      'Editable sample listing illustrating a curated luxury flagship slot ready to be updated with real vehicle data.',
    highlights: [
      'Sample specification: Signature exterior finish',
      'Sample specification: Premium surround audio',
      'Sample specification: Direct concierge delivery',
    ],
    images: [
      { url: heroLuxurySuv, caption: 'Flagship exterior perspective (Sample visual)' },
      { url: vehicleLuxuryShowcase, caption: 'Showroom floor lighting (Sample visual)' },
      { url: vehicleInteriorDetail, caption: 'Bespoke cockpit detail (Sample visual)' },
    ],
  },
];

const STORAGE_KEY = 'bini_cars_inventory_v1';

export function loadStoredVehicles(): Vehicle[] {
  if (typeof window === 'undefined') return DEFAULT_SAMPLE_VEHICLES;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_SAMPLE_VEHICLES;
    const parsed = JSON.parse(raw) as Vehicle[];
    if (!Array.isArray(parsed) || parsed.length === 0) {
      return DEFAULT_SAMPLE_VEHICLES;
    }
    return parsed;
  } catch {
    return DEFAULT_SAMPLE_VEHICLES;
  }
}

export function saveStoredVehicles(vehicles: Vehicle[]): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(vehicles));
  } catch {
    // Ignore storage quota errors cleanly
  }
}

export function resetStoredVehicles(): Vehicle[] {
  if (typeof window !== 'undefined') {
    window.localStorage.removeItem(STORAGE_KEY);
  }
  return DEFAULT_SAMPLE_VEHICLES;
}
