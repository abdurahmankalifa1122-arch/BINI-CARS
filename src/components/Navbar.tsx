import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { getLogoAssetUrl } from '../data/dealershipConfig';

interface NavbarProps {
  onNavigateSection: (sectionId: string, category?: 'All' | 'SUVs' | 'Sedans' | 'Luxury Collection') => void;
  onOpenWhatsApp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onNavigateSection, onOpenWhatsApp }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const navItems: { label: string; sectionId: string; category?: 'All' | 'SUVs' | 'Sedans' | 'Luxury Collection' }[] = [
    { label: 'Home', sectionId: 'home' },
    { label: 'Vehicles', sectionId: 'vehicles', category: 'All' },
    { label: 'About', sectionId: 'about' },
    { label: 'Why Us', sectionId: 'why-us' },
    { label: 'Contact', sectionId: 'contact' },
  ];

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    sectionId: string,
    category?: 'All' | 'SUVs' | 'Sedans' | 'Luxury Collection'
  ) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigateSection(sectionId, category);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-[#E5DFD3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10 h-[72px] flex items-center justify-between gap-8">
        {/* Zone 1: Official BINI CARS Logo */}
        <a
          href="#home"
          onClick={(e) => handleLinkClick(e, 'home')}
          className="flex items-center shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8934A] rounded-sm"
          aria-label="BINI CARS Home"
        >
          {!logoError ? (
            <img
              src={getLogoAssetUrl()}
              alt="BINI CARS official logo"
              referrerPolicy="no-referrer"
              onError={() => setLogoError(true)}
              className="h-12 sm:h-14 w-auto object-contain select-none"
            />
          ) : (
            <span className="font-editorial text-2xl font-semibold tracking-wider text-[#0D0D0C] whitespace-nowrap">
              BINI CARS
            </span>
          )}
        </a>

        {/* Zone 2: 5 concise single-line navigation links */}
        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary Navigation">
          {navItems.map((item) => (
            <a
              key={item.sectionId}
              href={`#${item.sectionId}`}
              onClick={(e) => handleLinkClick(e, item.sectionId, item.category)}
              className="relative py-1 text-sm font-medium text-[#2A2825] hover:text-[#0D0D0C] transition-colors whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-0 after:h-[1.5px] after:bg-[#B8934A] hover:after:w-full after:transition-all after:duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8934A]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenWhatsApp}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-xs font-semibold tracking-[0.12em] uppercase bg-[#0D0D0C] text-[#FAF8F4] border border-[#0D0D0C] hover:bg-[#1C1B19] hover:border-[#B8934A] transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8934A]"
          >
            Inquire Now
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-11 h-11 text-[#0D0D0C] border border-[#E5DFD3] bg-[#FAF8F4] hover:border-[#B8934A] transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8934A]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5DFD3] bg-white px-4 py-6 space-y-5">
          <nav className="flex flex-col space-y-3" aria-label="Mobile Navigation">
            {navItems.map((item) => (
              <a
                key={item.sectionId}
                href={`#${item.sectionId}`}
                onClick={(e) => handleLinkClick(e, item.sectionId, item.category)}
                className="py-2.5 px-2 text-base font-medium text-[#1C1B19] border-b border-[#F3EFE6] hover:text-[#8E6D2F] transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-2 grid grid-cols-3 gap-2">
              {(['SUVs', 'Sedans', 'Luxury Collection'] as const).map((cat) => (
                <a
                  key={cat}
                  href={`#${cat === 'SUVs' ? 'suvs' : cat === 'Sedans' ? 'sedans' : 'luxury'}`}
                  onClick={(e) => handleLinkClick(e, 'vehicles', cat)}
                  className="py-2 px-2 text-center text-xs font-medium text-[#2A2825] bg-[#FAF8F4] border border-[#E5DFD3] hover:border-[#B8934A] transition-colors"
                >
                  {cat === 'Luxury Collection' ? 'Luxury' : cat}
                </a>
              ))}
            </div>
          </nav>

          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenWhatsApp();
            }}
            className="w-full py-3 px-5 text-xs font-semibold tracking-[0.14em] uppercase bg-[#0D0D0C] text-[#FAF8F4] hover:bg-[#1C1B19] transition-colors cursor-pointer"
          >
            Inquire on WhatsApp
          </button>
        </div>
      )}
    </header>
  );
};
