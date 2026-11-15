import React, { useMemo, useState } from 'react';
import { ArrowUpRight, MessageCircle, Search, SlidersHorizontal } from 'lucide-react';
import { Vehicle, VehicleAvailability, VehicleCategory } from '../data/vehicles';

export type FilterCategory = 'All' | VehicleCategory;

interface ShowroomSectionProps {
  vehicles: Vehicle[];
  activeCategory: FilterCategory;
  onCategoryChange: (category: FilterCategory) => void;
  onSelectVehicle: (vehicle: Vehicle) => void;
  onInquireVehicle: (vehicle: Vehicle) => void;
  onOpenInventoryEditor: () => void;
}

const CATEGORIES: { id: FilterCategory; label: string; anchorId: string }[] = [
  { id: 'All', label: 'Available Vehicles', anchorId: 'vehicles-all' },
  { id: 'SUVs', label: 'SUVs', anchorId: 'suvs' },
  { id: 'Sedans', label: 'Sedans', anchorId: 'sedans' },
  { id: 'Luxury Collection', label: 'Luxury Collection', anchorId: 'luxury' },
];

export const ShowroomSection: React.FC<ShowroomSectionProps> = ({
  vehicles,
  activeCategory,
  onCategoryChange,
  onSelectVehicle,
  onInquireVehicle,
  onOpenInventoryEditor,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState<'All' | VehicleAvailability>('All');
  const [failedImages, setFailedImages] = useState<Record<string, boolean>>({});

  const filteredVehicles = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return vehicles.filter((v) => {
      const matchesCategory = activeCategory === 'All' || v.category === activeCategory;
      const matchesAvailability =
        availabilityFilter === 'All' || v.availability === availabilityFilter;
      const matchesQuery =
        !query ||
        v.manufacturer.toLowerCase().includes(query) ||
        v.model.toLowerCase().includes(query) ||
        v.year.toLowerCase().includes(query) ||
        v.fuelType.toLowerCase().includes(query) ||
        v.category.toLowerCase().includes(query);
      return matchesCategory && matchesAvailability && matchesQuery;
    });
  }, [vehicles, activeCategory, availabilityFilter, searchQuery]);

  const hasSamplePlaceholders = vehicles.some((v) => v.isSamplePlaceholder);

  return (
    <section id="vehicles" className="py-20 sm:py-24 bg-[#FAF8F4] border-b border-[#E5DFD3]">
      {/* Invisible section anchors so #suvs, #sedans, and #luxury links always resolve cleanly */}
      <span id="suvs" className="sr-only" aria-hidden="true" />
      <span id="sedans" className="sr-only" aria-hidden="true" />
      <span id="luxury" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Section Heading & Inventory Update Control */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-8 border-b border-[#E5DFD3]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8E6D2F] mb-3">
              Showroom Gallery
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#0D0D0C] leading-[1.1] text-balance">
              {activeCategory === 'All' ? 'Available Vehicles' : activeCategory}
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#4A463F] leading-relaxed">
              {hasSamplePlaceholders
                ? 'Editable sample placeholder listings are displayed below to illustrate BINI CARS specifications, photography, and ETB pricing slots until final stock is supplied.'
                : 'Select any vehicle to view its full photograph gallery, technical specifications, and Ethiopian Birr pricing.'}
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={onOpenInventoryEditor}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold tracking-[0.1em] uppercase bg-[#F3EFE6] text-[#1C1B19] border border-[#D9D1C3] hover:border-[#8E6D2F] hover:text-[#0D0D0C] transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8934A]"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8E6D2F]" />
              <span>Update Listings</span>
            </button>
          </div>
        </div>

        {/* Filter Bar: Category Tabs + Search + Availability */}
        <div className="mt-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          {/* Interactive Segmented Category Filter */}
          <div
            className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F3EFE6] border border-[#E5DFD3]"
            role="tablist"
            aria-label="Vehicle Categories"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              const count =
                cat.id === 'All'
                  ? vehicles.length
                  : vehicles.filter((v) => v.category === cat.id).length;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onCategoryChange(cat.id)}
                  className={`px-4 py-2 text-xs sm:text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8934A] ${
                    isActive
                      ? 'bg-[#0D0D0C] text-[#FAF8F4]'
                      : 'text-[#3A3732] hover:text-[#0D0D0C] hover:bg-white/60'
                  }`}
                >
                  <span>{cat.label}</span>
                  <span
                    className={`ml-2 tabular-nums text-xs ${
                      isActive ? 'text-[#D8BA7A]' : 'text-[#6E685E]'
                    }`}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search & Availability Filter */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search
                className="w-4 h-4 text-[#6E685E] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search make, model, year..."
                aria-label="Search vehicles"
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-white border border-[#E5DFD3] text-[#1C1B19] placeholder:text-[#7A746A] focus:outline-none focus:border-[#8E6D2F]"
              />
            </div>

            <select
              value={availabilityFilter}
              onChange={(e) =>
                setAvailabilityFilter(e.target.value as 'All' | VehicleAvailability)
              }
              aria-label="Filter by availability status"
              className="px-3.5 py-2.5 text-sm bg-white border border-[#E5DFD3] text-[#1C1B19] focus:outline-none focus:border-[#8E6D2F] cursor-pointer"
            >
              <option value="All">All Statuses</option>
              <option value="Sample Placeholder">Sample Placeholder</option>
              <option value="Available">Available</option>
              <option value="In Transit">In Transit</option>
              <option value="Reserved">Reserved</option>
            </select>
          </div>
        </div>

        {/* Vehicle Cards Grid */}
        {filteredVehicles.length === 0 ? (
          <div className="mt-12 py-16 px-6 text-center bg-white border border-[#E5DFD3]">
            <p className="font-editorial text-2xl text-[#0D0D0C]">
              No matching vehicles found
            </p>
            <p className="mt-2 text-sm text-[#5C574F]">
              Try clearing your search query or switching vehicle categories.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                setAvailabilityFilter('All');
                onCategoryChange('All');
              }}
              className="mt-6 px-5 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase bg-[#0D0D0C] text-[#FAF8F4] hover:bg-[#1C1B19] transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {filteredVehicles.map((vehicle) => {
              const coverImage = vehicle.images[0]?.url;
              const isImgFailed = failedImages[vehicle.id];

              return (
                <article
                  key={vehicle.id}
                  className="group bg-white border border-[#E5DFD3] hover:border-[#B8934A]/70 transition-all duration-200 hover:-translate-y-0.5 flex flex-col"
                >
                  {/* 4:3 Vehicle Photograph */}
                  <button
                    type="button"
                    onClick={() => onSelectVehicle(vehicle)}
                    className="relative aspect-[4/3] w-full overflow-hidden bg-[#1C1B19] text-left cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8934A]"
                    aria-label={`View details for ${vehicle.manufacturer} ${vehicle.model}`}
                  >
                    {coverImage && !isImgFailed ? (
                      <img
                        src={coverImage}
                        alt={`${vehicle.manufacturer} ${vehicle.model} — ${vehicle.year}`}
                        referrerPolicy="no-referrer"
                        onError={() =>
                          setFailedImages((prev) => ({ ...prev, [vehicle.id]: true }))
                        }
                        className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-[1.03]"
                      />
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-gradient-to-br from-[#1C1B19] to-[#0D0D0C]">
                        <span className="font-editorial text-xl text-[#D8BA7A]">
                          BINI CARS
                        </span>
                        <span className="mt-1 text-xs text-[#FAF8F4]/70">
                          {vehicle.model}
                        </span>
                      </div>
                    )}
                  </button>

                  {/* Card Body — Clean Unboxed Metadata */}
                  <div className="p-6 flex-1 flex flex-col">
                    {/* Single Quiet Kicker Line (No pill badge sandwich) */}
                    <div className="flex items-center justify-between gap-3 text-xs tracking-[0.12em] uppercase text-[#6E685E]">
                      <span className="truncate">{vehicle.category}</span>
                      <span className="shrink-0 font-medium text-[#8E6D2F]">
                        {vehicle.availability}
                      </span>
                    </div>

                    {/* Manufacturer & Model */}
                    <div className="mt-2.5">
                      <p className="text-xs font-medium uppercase tracking-[0.08em] text-[#5C574F]">
                        {vehicle.manufacturer}
                      </p>
                      <h3 className="mt-0.5 text-lg font-semibold text-[#0D0D0C] leading-snug">
                        <button
                          type="button"
                          onClick={() => onSelectVehicle(vehicle)}
                          className="text-left hover:text-[#8E6D2F] transition-colors cursor-pointer"
                        >
                          {vehicle.model}
                        </button>
                      </h3>
                    </div>

                    {/* Key Specifications Ledger (Clean Unboxed Grid) */}
                    <dl className="mt-4 pt-4 border-t border-[#F0ECE2] grid grid-cols-2 gap-x-4 gap-y-2.5 text-xs">
                      <div>
                        <dt className="text-[#6E685E]">Year</dt>
                        <dd className="mt-0.5 font-medium text-[#1C1B19] tabular-nums">
                          {vehicle.year}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[#6E685E]">Transmission</dt>
                        <dd className="mt-0.5 font-medium text-[#1C1B19]">
                          {vehicle.transmission}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[#6E685E]">Fuel Type</dt>
                        <dd className="mt-0.5 font-medium text-[#1C1B19]">
                          {vehicle.fuelType}
                        </dd>
                      </div>
                      <div>
                        <dt className="text-[#6E685E]">Engine Capacity</dt>
                        <dd className="mt-0.5 font-medium text-[#1C1B19] tabular-nums">
                          {vehicle.engineCapacity}
                        </dd>
                      </div>
                      <div className="col-span-2 flex items-center justify-between pt-1">
                        <dt className="text-[#6E685E]">Mileage</dt>
                        <dd className="font-medium text-[#1C1B19] tabular-nums">
                          {vehicle.mileage}
                        </dd>
                      </div>
                    </dl>

                    {/* Price & Actions Footer */}
                    <div className="mt-auto pt-5 border-t border-[#E5DFD3]">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="text-xs uppercase tracking-[0.1em] text-[#6E685E]">
                          Price (ETB)
                        </span>
                        <span className="text-sm font-semibold text-[#0D0D0C] tabular-nums text-right">
                          {vehicle.priceETB}
                        </span>
                      </div>

                      <div className="mt-4 grid grid-cols-2 gap-2.5">
                        <button
                          type="button"
                          onClick={() => onSelectVehicle(vehicle)}
                          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold tracking-[0.08em] uppercase bg-[#FAF8F4] text-[#0D0D0C] border border-[#D9D1C3] hover:border-[#0D0D0C] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8934A]"
                        >
                          <span>Gallery</span>
                          <ArrowUpRight className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onInquireVehicle(vehicle)}
                          className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 text-xs font-semibold tracking-[0.08em] uppercase bg-[#0D0D0C] text-[#FAF8F4] hover:bg-[#1C1B19] transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8934A]"
                        >
                          <MessageCircle className="w-3.5 h-3.5 text-[#D8BA7A]" />
                          <span>WhatsApp</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
