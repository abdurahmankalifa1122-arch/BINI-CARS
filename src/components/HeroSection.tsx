import React, { useState } from 'react';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { SHOWCASE_IMAGES, VehicleCategory } from '../data/vehicles';

interface HeroSectionProps {
  onViewCars: (category?: 'All' | VehicleCategory) => void;
  onInquireWhatsApp: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onViewCars,
  onInquireWhatsApp,
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <section
      id="home"
      className="relative w-full min-h-[82vh] lg:min-h-[86vh] flex items-end bg-[#0D0D0C] overflow-hidden"
    >
      {/* Background High-Resolution Photography */}
      {!imgFailed ? (
        <img
          src={SHOWCASE_IMAGES.hero}
          alt="Flagship luxury SUV parked outside a warm limestone and charcoal pavilion"
          referrerPolicy="no-referrer"
          onError={() => setImgFailed(true)}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#1C1B19] via-[#0D0D0C] to-[#2A2419]" />
      )}

      {/* Measured Contrast Scrim */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-[#0D0D0C]/95 via-[#0D0D0C]/55 to-[#0D0D0C]/30"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-[#0D0D0C]/85 via-[#0D0D0C]/35 to-transparent"
      />

      {/* Editorial Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 pt-24 pb-12 sm:pb-16 lg:pb-20">
        <div className="max-w-2xl">
          <p className="text-xs sm:text-sm font-medium tracking-[0.22em] uppercase text-[#D8BA7A] mb-4">
            BINI CARS · Ethiopia
          </p>

          <h1
            className="font-editorial text-[#FAF8F4] font-semibold tracking-tight leading-[1.03] text-balance"
            style={{ fontSize: 'clamp(2.35rem, 4.4vw, 4.15rem)' }}
          >
            YOUR NEXT JOURNEY STARTS HERE.
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[#FAF8F4]/85 leading-relaxed max-w-xl font-normal">
            Explore exceptional vehicles and discover the right car for your lifestyle in Ethiopia.
          </p>

          {/* Primary & Secondary Hero Actions */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <button
              type="button"
              onClick={() => onViewCars('All')}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase bg-[#C6A45D] text-[#0D0D0C] hover:bg-[#D8BA7A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FAF8F4]"
            >
              <span>VIEW OUR CARS</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              type="button"
              onClick={onInquireWhatsApp}
              className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs sm:text-sm font-semibold tracking-[0.14em] uppercase bg-[#0D0D0C]/70 backdrop-blur-sm text-[#FAF8F4] border border-[#D8BA7A]/60 hover:border-[#D8BA7A] hover:bg-[#1C1B19] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#D8BA7A]"
            >
              <MessageCircle className="w-4 h-4 text-[#D8BA7A]" />
              <span>INQUIRE ON WHATSAPP</span>
            </button>
          </div>
        </div>

        {/* Bottom Collection Quick Anchors */}
        <div className="mt-12 pt-6 border-t border-[#FAF8F4]/15 flex flex-wrap items-center justify-between gap-4 text-xs tracking-[0.14em] uppercase text-[#FAF8F4]/75">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <button
              type="button"
              onClick={() => onViewCars('All')}
              className="hover:text-[#D8BA7A] transition-colors cursor-pointer whitespace-nowrap"
            >
              Available Vehicles
            </button>
            <span aria-hidden="true" className="text-[#FAF8F4]/30">
              ·
            </span>
            <button
              type="button"
              onClick={() => onViewCars('SUVs')}
              className="hover:text-[#D8BA7A] transition-colors cursor-pointer whitespace-nowrap"
            >
              SUVs
            </button>
            <span aria-hidden="true" className="text-[#FAF8F4]/30">
              ·
            </span>
            <button
              type="button"
              onClick={() => onViewCars('Sedans')}
              className="hover:text-[#D8BA7A] transition-colors cursor-pointer whitespace-nowrap"
            >
              Sedans
            </button>
            <span aria-hidden="true" className="text-[#FAF8F4]/30">
              ·
            </span>
            <button
              type="button"
              onClick={() => onViewCars('Luxury Collection')}
              className="hover:text-[#D8BA7A] transition-colors cursor-pointer whitespace-nowrap"
            >
              Luxury Collection
            </button>
          </div>
          <span className="text-[#FAF8F4]/60">Direct Import &amp; Vehicle Sales</span>
        </div>
      </div>
    </section>
  );
};
