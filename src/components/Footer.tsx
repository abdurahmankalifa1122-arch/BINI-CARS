import React, { useState } from 'react';
import { getLogoAssetUrl } from '../data/dealershipConfig';

interface FooterProps {
  onNavigateSection: (
    sectionId: string,
    category?: 'All' | 'SUVs' | 'Sedans' | 'Luxury Collection'
  ) => void;
  onOpenWhatsApp: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection, onOpenWhatsApp }) => {
  const [logoError, setLogoError] = useState(false);

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    category?: 'All' | 'SUVs' | 'Sedans' | 'Luxury Collection'
  ) => {
    e.preventDefault();
    onNavigateSection(sectionId, category);
  };

  return (
    <footer className="bg-[#0D0D0C] text-[#FAF8F4] border-t border-[#2A2825]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 py-14 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#FAF8F4]/12">
          {/* Official Logo Mark Preserved on Crisp White Emblem */}
          <div className="md:col-span-4 space-y-4">
            <a
              href="#home"
              onClick={(e) => handleNav(e, 'home')}
              className="inline-block bg-white p-2.5 border border-[#D8BA7A]/30"
              aria-label="BINI CARS Home"
            >
              {!logoError ? (
                <img
                  src={getLogoAssetUrl()}
                  alt="BINI CARS official logo"
                  referrerPolicy="no-referrer"
                  onError={() => setLogoError(true)}
                  className="h-14 w-auto object-contain"
                />
              ) : (
                <span className="font-editorial text-xl font-semibold text-[#0D0D0C]">
                  BINI CARS
                </span>
              )}
            </a>
            <p className="text-sm text-[#FAF8F4]/70 leading-relaxed max-w-xs">
              Car importer and vehicle sales dealership serving clients across Ethiopia.
            </p>
          </div>

          {/* Showroom Collections */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#D8BA7A] mb-4">
              Showroom
            </h3>
            <ul className="space-y-2.5 text-sm text-[#FAF8F4]/78">
              <li>
                <a
                  href="#vehicles"
                  onClick={(e) => handleNav(e, 'vehicles', 'All')}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  Available Vehicles
                </a>
              </li>
              <li>
                <a
                  href="#suvs"
                  onClick={(e) => handleNav(e, 'vehicles', 'SUVs')}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  SUVs
                </a>
              </li>
              <li>
                <a
                  href="#sedans"
                  onClick={(e) => handleNav(e, 'vehicles', 'Sedans')}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  Sedans
                </a>
              </li>
              <li>
                <a
                  href="#luxury"
                  onClick={(e) => handleNav(e, 'vehicles', 'Luxury Collection')}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  Luxury Collection
                </a>
              </li>
            </ul>
          </div>

          {/* Dealership Sections */}
          <div className="md:col-span-4">
            <h3 className="text-xs font-semibold tracking-[0.18em] uppercase text-[#D8BA7A] mb-4">
              Dealership
            </h3>
            <ul className="space-y-2.5 text-sm text-[#FAF8F4]/78">
              <li>
                <a
                  href="#home"
                  onClick={(e) => handleNav(e, 'home')}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#about"
                  onClick={(e) => handleNav(e, 'about')}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  About BINI CARS
                </a>
              </li>
              <li>
                <a
                  href="#why-us"
                  onClick={(e) => handleNav(e, 'why-us')}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  Why Choose Us
                </a>
              </li>
              <li>
                <a
                  href="#contact"
                  onClick={(e) => handleNav(e, 'contact')}
                  className="hover:text-[#FAF8F4] transition-colors"
                >
                  Contact Us
                </a>
              </li>
              <li className="pt-1">
                <button
                  type="button"
                  onClick={onOpenWhatsApp}
                  className="text-xs font-semibold tracking-[0.14em] uppercase text-[#D8BA7A] hover:text-[#FAF8F4] transition-colors cursor-pointer"
                >
                  Inquire on WhatsApp
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FAF8F4]/55">
          <p>© {new Date().getFullYear()} BINI CARS. Ethiopia.</p>
          <p>Official showroom inventory &amp; pricing subject to confirmation.</p>
        </div>
      </div>
    </footer>
  );
};
