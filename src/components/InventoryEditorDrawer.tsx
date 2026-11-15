import React, { useState } from 'react';
import { Check, Download, Plus, RotateCcw, Trash2, X } from 'lucide-react';
import {
  SHOWCASE_IMAGES,
  Vehicle,
  VehicleAvailability,
  VehicleCategory,
} from '../data/vehicles';

interface InventoryEditorDrawerProps {
  isOpen: boolean;
  vehicles: Vehicle[];
  onClose: () => void;
  onSaveVehicles: (nextVehicles: Vehicle[]) => void;
  onResetDefaults: () => void;
}

const EMPTY_FORM = {
  category: 'SUVs' as VehicleCategory,
  manufacturer: '',
  model: '',
  year: '',
  transmission: 'Automatic',
  fuelType: 'Hybrid / Petrol',
  engineCapacity: '',
  mileage: '',
  priceETB: '',
  availability: 'Available' as VehicleAvailability,
  summary: '',
  imageKey: 'suv' as keyof typeof SHOWCASE_IMAGES,
};

export const InventoryEditorDrawer: React.FC<InventoryEditorDrawerProps> = ({
  isOpen,
  vehicles,
  onClose,
  onSaveVehicles,
  onResetDefaults,
}) => {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(EMPTY_FORM);
  const [exported, setExported] = useState(false);

  if (!isOpen) return null;

  const startEditing = (vehicle: Vehicle) => {
    setEditingId(vehicle.id);
    setForm({
      category: vehicle.category,
      manufacturer: vehicle.manufacturer,
      model: vehicle.model,
      year: vehicle.year,
      transmission: vehicle.transmission,
      fuelType: vehicle.fuelType,
      engineCapacity: vehicle.engineCapacity,
      mileage: vehicle.mileage,
      priceETB: vehicle.priceETB,
      availability: vehicle.availability,
      summary: vehicle.summary,
      imageKey:
        vehicle.category === 'Sedans'
          ? 'sedan'
          : vehicle.category === 'Luxury Collection'
            ? 'luxury'
            : 'suv',
    });
  };

  const handleSaveEntry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.manufacturer.trim() || !form.model.trim()) return;

    const selectedPhoto = SHOWCASE_IMAGES[form.imageKey];

    if (editingId) {
      const updated = vehicles.map((v) =>
        v.id === editingId
          ? {
              ...v,
              isSamplePlaceholder: false,
              category: form.category,
              manufacturer: form.manufacturer.trim(),
              model: form.model.trim(),
              year: form.year.trim() || 'TBD',
              transmission: form.transmission.trim() || 'Automatic',
              fuelType: form.fuelType.trim() || 'Petrol',
              engineCapacity: form.engineCapacity.trim() || 'TBD',
              mileage: form.mileage.trim() || '0 km',
              priceETB: form.priceETB.trim() || 'ETB — Upon Inquiry',
              availability: form.availability,
              summary:
                form.summary.trim() ||
                `${form.manufacturer.trim()} ${form.model.trim()} available through BINI CARS Ethiopia.`,
            }
          : v
      );
      onSaveVehicles(updated);
      setEditingId(null);
      setForm(EMPTY_FORM);
      return;
    }

    const newVehicle: Vehicle = {
      id: `vehicle-${Date.now()}`,
      category: form.category,
      isSamplePlaceholder: false,
      manufacturer: form.manufacturer.trim(),
      model: form.model.trim(),
      year: form.year.trim() || '2025',
      transmission: form.transmission.trim() || 'Automatic',
      fuelType: form.fuelType.trim() || 'Petrol',
      engineCapacity: form.engineCapacity.trim() || 'TBD',
      mileage: form.mileage.trim() || '0 km',
      priceETB: form.priceETB.trim() || 'ETB — Upon Inquiry',
      availability: form.availability,
      summary:
        form.summary.trim() ||
        `${form.manufacturer.trim()} ${form.model.trim()} available through BINI CARS Ethiopia.`,
      highlights: ['Direct BINI CARS showroom listing'],
      images: [
        { url: selectedPhoto, caption: `${form.manufacturer.trim()} ${form.model.trim()}` },
        { url: SHOWCASE_IMAGES.interior, caption: 'Interior cabin view' },
      ],
    };

    onSaveVehicles([newVehicle, ...vehicles]);
    setForm(EMPTY_FORM);
  };

  const handleDelete = (id: string) => {
    onSaveVehicles(vehicles.filter((v) => v.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm(EMPTY_FORM);
    }
  };

  const handleExportJson = () => {
    const dataStr = JSON.stringify(vehicles, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'bini-cars-inventory.json';
    link.click();
    URL.revokeObjectURL(url);
    setExported(true);
    setTimeout(() => setExported(false), 2000);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#0D0D0C]/70 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="inventory-editor-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl h-full bg-[#FAF8F4] border-l border-[#E5DFD3] flex flex-col overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 bg-white border-b border-[#E5DFD3] flex items-center justify-between gap-4">
          <div>
            <h2 id="inventory-editor-title" className="font-editorial text-2xl font-semibold text-[#0D0D0C]">
              Manage Vehicle Listings
            </h2>
            <p className="text-xs text-[#6E685E]">
              Update sample placeholders locally or export JSON for repository updates.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close inventory manager"
            className="p-2 text-[#1C1B19] hover:bg-[#F3EFE6] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Add / Edit Form */}
          <form onSubmit={handleSaveEntry} className="p-5 bg-white border border-[#E5DFD3] space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#8E6D2F]">
                {editingId ? 'Edit Listing' : 'Add New Vehicle Listing'}
              </h3>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(EMPTY_FORM);
                  }}
                  className="text-xs text-[#5C574F] hover:text-[#0D0D0C] cursor-pointer"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="block text-xs text-[#5C574F] mb-1">Category</label>
                <select
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value as VehicleCategory }))
                  }
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F4] border border-[#D9D1C3]"
                >
                  <option value="SUVs">SUVs</option>
                  <option value="Sedans">Sedans</option>
                  <option value="Luxury Collection">Luxury Collection</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#5C574F] mb-1">Availability Status</label>
                <select
                  value={form.availability}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      availability: e.target.value as VehicleAvailability,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F4] border border-[#D9D1C3]"
                >
                  <option value="Available">Available</option>
                  <option value="In Transit">In Transit</option>
                  <option value="Reserved">Reserved</option>
                  <option value="Sample Placeholder">Sample Placeholder</option>
                </select>
              </div>
              <div>
                <label className="block text-xs text-[#5C574F] mb-1">Manufacturer *</label>
                <input
                  type="text"
                  required
                  value={form.manufacturer}
                  onChange={(e) => setForm((f) => ({ ...f, manufacturer: e.target.value }))}
                  placeholder="e.g. Toyota"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F4] border border-[#D9D1C3]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#5C574F] mb-1">Model *</label>
                <input
                  type="text"
                  required
                  value={form.model}
                  onChange={(e) => setForm((f) => ({ ...f, model: e.target.value }))}
                  placeholder="e.g. Land Cruiser"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F4] border border-[#D9D1C3]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#5C574F] mb-1">Year</label>
                <input
                  type="text"
                  value={form.year}
                  onChange={(e) => setForm((f) => ({ ...f, year: e.target.value }))}
                  placeholder="e.g. 2024"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F4] border border-[#D9D1C3]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#5C574F] mb-1">Price in ETB</label>
                <input
                  type="text"
                  value={form.priceETB}
                  onChange={(e) => setForm((f) => ({ ...f, priceETB: e.target.value }))}
                  placeholder="e.g. ETB 12,500,000"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F4] border border-[#D9D1C3]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#5C574F] mb-1">Transmission</label>
                <input
                  type="text"
                  value={form.transmission}
                  onChange={(e) => setForm((f) => ({ ...f, transmission: e.target.value }))}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F4] border border-[#D9D1C3]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#5C574F] mb-1">Fuel Type</label>
                <input
                  type="text"
                  value={form.fuelType}
                  onChange={(e) => setForm((f) => ({ ...f, fuelType: e.target.value }))}
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F4] border border-[#D9D1C3]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#5C574F] mb-1">Engine Capacity</label>
                <input
                  type="text"
                  value={form.engineCapacity}
                  onChange={(e) => setForm((f) => ({ ...f, engineCapacity: e.target.value }))}
                  placeholder="e.g. 3,346 cc"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F4] border border-[#D9D1C3]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#5C574F] mb-1">Mileage</label>
                <input
                  type="text"
                  value={form.mileage}
                  onChange={(e) => setForm((f) => ({ ...f, mileage: e.target.value }))}
                  placeholder="e.g. 0 km"
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F4] border border-[#D9D1C3]"
                />
              </div>
            </div>

            {!editingId && (
              <div>
                <label className="block text-xs text-[#5C574F] mb-1">Default Showcase Photo</label>
                <select
                  value={form.imageKey}
                  onChange={(e) =>
                    setForm((f) => ({
                      ...f,
                      imageKey: e.target.value as keyof typeof SHOWCASE_IMAGES,
                    }))
                  }
                  className="w-full px-3 py-2 text-sm bg-[#FAF8F4] border border-[#D9D1C3]"
                >
                  <option value="suv">Executive SUV Photo</option>
                  <option value="sedan">Executive Sedan Photo</option>
                  <option value="luxury">Luxury Collection Photo</option>
                  <option value="hero">Flagship Pavilion SUV Photo</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase bg-[#0D0D0C] text-[#FAF8F4] hover:bg-[#1C1B19] transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5 text-[#D8BA7A]" />
              <span>{editingId ? 'Save Changes' : 'Add to Showroom'}</span>
            </button>
          </form>

          {/* Existing Listings */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-xs font-semibold tracking-[0.14em] uppercase text-[#5C574F]">
                Current Listings ({vehicles.length})
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleExportJson}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-[#D9D1C3] hover:border-[#0D0D0C] transition-colors cursor-pointer"
                >
                  {exported ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#8E6D2F]" />
                      <span>Exported</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-3.5 h-3.5" />
                      <span>Export JSON</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  onClick={onResetDefaults}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-white border border-[#D9D1C3] hover:border-[#0D0D0C] transition-colors cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Samples</span>
                </button>
              </div>
            </div>

            <div className="divide-y divide-[#E5DFD3] bg-white border border-[#E5DFD3]">
              {vehicles.map((v) => (
                <div key={v.id} className="p-4 flex items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-xs text-[#8E6D2F] uppercase tracking-[0.1em]">
                      {v.category} · {v.availability}
                    </p>
                    <p className="text-sm font-semibold text-[#0D0D0C] truncate">
                      {v.manufacturer} — {v.model}
                    </p>
                    <p className="text-xs text-[#6E685E] tabular-nums truncate">
                      {v.year} · {v.priceETB}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      type="button"
                      onClick={() => startEditing(v)}
                      className="px-3 py-1.5 text-xs font-medium bg-[#FAF8F4] border border-[#D9D1C3] hover:border-[#0D0D0C] transition-colors cursor-pointer"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(v.id)}
                      aria-label={`Delete ${v.model}`}
                      className="p-1.5 text-[#6E685E] hover:text-[#7A271A] transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
