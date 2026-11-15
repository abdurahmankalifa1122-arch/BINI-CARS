import React, { useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight, MessageCircle, X } from 'lucide-react';
import { Vehicle } from '../data/vehicles';

interface VehicleDetailModalProps {
  vehicle: Vehicle | null;
  onClose: () => void;
  onInquireWhatsApp: (vehicle: Vehicle) => void;
  onRequestViewing: (vehicle: Vehicle) => void;
}

export const VehicleDetailModal: React.FC<VehicleDetailModalProps> = ({
  vehicle,
  onClose,
  onInquireWhatsApp,
  onRequestViewing,
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [imgError, setImgError] = useState<Record<number, boolean>>({});

  useEffect(() => {
    setActiveImageIndex(0);
    setImgError({});
  }, [vehicle?.id]);

  useEffect(() => {
    if (!vehicle) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight' && vehicle.images.length > 1) {
        setActiveImageIndex((prev) => (prev + 1) % vehicle.images.length);
      } else if (e.key === 'ArrowLeft' && vehicle.images.length > 1) {
        setActiveImageIndex((prev) =>
          prev === 0 ? vehicle.images.length - 1 : prev - 1
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [vehicle, onClose]);

  if (!vehicle) return null;

  const images = vehicle.images;
  const currentImage = images[activeImageIndex] ?? images[0];

  const handlePrev = () => {
    setActiveImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveImageIndex((prev) => (prev + 1) % images.length);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D0C]/80 backdrop-blur-sm p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vehicle-detail-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-6xl bg-[#FAF8F4] border border-[#E5DFD3] shadow-2xl my-auto overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Modal Bar */}
        <div className="flex items-center justify-between gap-4 px-5 sm:px-8 py-4 bg-white border-b border-[#E5DFD3]">
          <div className="flex items-center gap-3 text-xs tracking-[0.14em] uppercase text-[#6E685E] min-w-0">
            <span className="truncate">{vehicle.category}</span>
            <span aria-hidden="true">·</span>
            <span className="font-semibold text-[#8E6D2F] shrink-0">
              {vehicle.availability}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close vehicle presentation"
            className="inline-flex items-center justify-center w-10 h-10 text-[#1C1B19] hover:text-[#0D0D0C] hover:bg-[#F3EFE6] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8934A]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Main 2-Column Editorial Detail Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left: Large Image Gallery */}
          <div className="lg:col-span-7 bg-[#0D0D0C] p-4 sm:p-6 flex flex-col justify-between">
            <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#1C1B19]">
              {currentImage && !imgError[activeImageIndex] ? (
                <img
                  src={currentImage.url}
                  alt={`${vehicle.manufacturer} ${vehicle.model} — ${currentImage.caption}`}
                  referrerPolicy="no-referrer"
                  onError={() =>
                    setImgError((prev) => ({ ...prev, [activeImageIndex]: true }))
                  }
                  className="w-full h-full object-cover object-center"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center text-center p-8">
                  <span className="font-editorial text-2xl text-[#D8BA7A]">
                    BINI CARS
                  </span>
                  <span className="mt-2 text-xs text-[#FAF8F4]/70">
                    {vehicle.model}
                  </span>
                </div>
              )}

              {images.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={handlePrev}
                    aria-label="Previous photograph"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#0D0D0C]/75 text-[#FAF8F4] border border-[#FAF8F4]/20 hover:border-[#D8BA7A] transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    type="button"
                    onClick={handleNext}
                    aria-label="Next photograph"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center bg-[#0D0D0C]/75 text-[#FAF8F4] border border-[#FAF8F4]/20 hover:border-[#D8BA7A] transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Caption & Counter + Thumbnails */}
            <div className="mt-4">
              <div className="flex items-center justify-between gap-4 text-xs text-[#FAF8F4]/75">
                <span className="truncate">{currentImage?.caption}</span>
                <span className="font-mono tabular-nums shrink-0 text-[#D8BA7A]">
                  {String(activeImageIndex + 1).padStart(2, '0')} /{' '}
                  {String(images.length).padStart(2, '0')}
                </span>
              </div>

              {images.length > 1 && (
                <div className="mt-3 grid grid-cols-4 sm:grid-cols-5 gap-2.5">
                  {images.map((img, idx) => (
                    <button
                      key={`${vehicle.id}-thumb-${idx}`}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      aria-label={`View image ${idx + 1}: ${img.caption}`}
                      className={`relative aspect-[4/3] overflow-hidden border transition-all cursor-pointer ${
                        idx === activeImageIndex
                          ? 'border-[#D8BA7A] opacity-100'
                          : 'border-[#FAF8F4]/15 opacity-55 hover:opacity-90'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right: Specification Ledger & Inquiry Actions */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-[#FAF8F4]">
            <div>
              <p className="text-xs font-semibold tracking-[0.16em] uppercase text-[#8E6D2F]">
                {vehicle.manufacturer}
              </p>
              <h2
                id="vehicle-detail-title"
                className="mt-1.5 font-editorial text-2xl sm:text-3xl font-semibold text-[#0D0D0C] leading-tight"
              >
                {vehicle.model}
              </h2>

              <p className="mt-3 text-sm text-[#4A463F] leading-relaxed">
                {vehicle.summary}
              </p>

              {/* Price Display */}
              <div className="mt-6 p-4 bg-white border border-[#E5DFD3] flex items-center justify-between gap-4">
                <span className="text-xs uppercase tracking-[0.14em] text-[#6E685E]">
                  Price (Ethiopian Birr)
                </span>
                <span className="text-base font-semibold text-[#0D0D0C] tabular-nums">
                  {vehicle.priceETB}
                </span>
              </div>

              {/* Specification Table */}
              <dl className="mt-6 divide-y divide-[#E5DFD3] border-y border-[#E5DFD3] text-sm">
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-[#6E685E]">Manufacturer</dt>
                  <dd className="font-medium text-[#1C1B19] text-right">
                    {vehicle.manufacturer}
                  </dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-[#6E685E]">Model</dt>
                  <dd className="font-medium text-[#1C1B19] text-right">
                    {vehicle.model}
                  </dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-[#6E685E]">Year</dt>
                  <dd className="font-medium text-[#1C1B19] tabular-nums text-right">
                    {vehicle.year}
                  </dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-[#6E685E]">Transmission</dt>
                  <dd className="font-medium text-[#1C1B19] text-right">
                    {vehicle.transmission}
                  </dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-[#6E685E]">Fuel Type</dt>
                  <dd className="font-medium text-[#1C1B19] text-right">
                    {vehicle.fuelType}
                  </dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-[#6E685E]">Engine Capacity</dt>
                  <dd className="font-medium text-[#1C1B19] tabular-nums text-right">
                    {vehicle.engineCapacity}
                  </dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-[#6E685E]">Mileage</dt>
                  <dd className="font-medium text-[#1C1B19] tabular-nums text-right">
                    {vehicle.mileage}
                  </dd>
                </div>
                <div className="py-2.5 flex items-center justify-between gap-4">
                  <dt className="text-[#6E685E]">Availability</dt>
                  <dd className="font-semibold text-[#8E6D2F] text-right">
                    {vehicle.availability}
                  </dd>
                </div>
              </dl>

              {/* Highlights */}
              {vehicle.highlights.length > 0 && (
                <div className="mt-5">
                  <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#6E685E] mb-2">
                    Key Highlights
                  </p>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-[#3A3732]">
                    {vehicle.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-[#8E6D2F] select-none">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* CTAs */}
            <div className="mt-8 pt-6 border-t border-[#E5DFD3] flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => onInquireWhatsApp(vehicle)}
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase bg-[#0D0D0C] text-[#FAF8F4] hover:bg-[#1C1B19] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#D8BA7A]" />
                <span>Inquire on WhatsApp</span>
              </button>
              <button
                type="button"
                onClick={() => onRequestViewing(vehicle)}
                className="flex-1 inline-flex items-center justify-center px-5 py-3.5 text-xs font-semibold tracking-[0.12em] uppercase bg-[#C6A45D] text-[#0D0D0C] hover:bg-[#D8BA7A] transition-colors cursor-pointer"
              >
                Request Information
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
