import React, { useState } from 'react';
import { SHOWCASE_IMAGES } from '../data/vehicles';

interface AboutAndWhySectionProps {
  onBrowseCollection: (category: 'SUVs' | 'Sedans' | 'Luxury Collection') => void;
}

const PILLARS = [
  {
    number: '01.',
    title: 'Direct International Sourcing',
    description:
      'Vehicles are sourced selectively to align with client preferences across SUVs, executive sedans, and luxury models suited for Ethiopia.',
  },
  {
    number: '02.',
    title: 'Transparent Documentation',
    description:
      'Every vehicle presentation includes clear technical specifications—year, transmission, fuel type, engine capacity, mileage, and Ethiopian Birr pricing.',
  },
  {
    number: '03.',
    title: 'Ethiopian Road Readiness',
    description:
      'Curated selection focused on durability, cabin comfort, and practical servicing considerations for city commuting and regional travel.',
  },
  {
    number: '04.',
    title: 'Direct Client Consultation',
    description:
      'Streamlined communication via direct inquiry and WhatsApp consultation so buyers receive prompt answers before scheduling a viewing.',
  },
];

export const AboutAndWhySection: React.FC<AboutAndWhySectionProps> = ({
  onBrowseCollection,
}) => {
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <>
      {/* Section 6: About BINI CARS */}
      <section id="about" className="py-20 sm:py-24 bg-[#FAF8F4] border-b border-[#E5DFD3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-stretch">
            {/* Editorial Photograph */}
            <div className="lg:col-span-6 relative min-h-[320px] lg:min-h-[460px] bg-[#1C1B19] overflow-hidden border border-[#E5DFD3]">
              {!imgFailed ? (
                <img
                  src={SHOWCASE_IMAGES.interior}
                  alt="Luxury vehicle interior craftsmanship in warm ivory leather and brushed metal trim"
                  referrerPolicy="no-referrer"
                  onError={() => setImgFailed(true)}
                  className="w-full h-full object-cover object-center lg:absolute lg:inset-0"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-10 bg-gradient-to-br from-[#1C1B19] to-[#0D0D0C]">
                  <span className="font-editorial text-2xl text-[#D8BA7A]">
                    BINI CARS · Ethiopia
                  </span>
                </div>
              )}
            </div>

            {/* Editorial Narrative */}
            <div className="lg:col-span-6 flex flex-col justify-center py-2">
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8E6D2F] mb-3">
                About BINI CARS
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#0D0D0C] leading-[1.12] text-balance">
                Curated Automotive Imports for Ethiopia
              </h2>

              <div className="mt-6 space-y-4 text-sm sm:text-base text-[#3A3732] leading-relaxed">
                <p>
                  BINI CARS is an automotive importer and vehicle sales business serving clients
                  across Ethiopia. Our focus is straightforward: bringing carefully selected
                  vehicles to market with clear specifications and attentive service.
                </p>
                <p>
                  Whether you are searching for a commanding family SUV, an executive sedan for
                  daily city travel, or a flagship model from our Luxury Collection, we guide
                  every inquiry from initial selection through final handover.
                </p>
              </div>

              {/* Clean Collection Shortcuts */}
              <div className="mt-8 pt-6 border-t border-[#E5DFD3] grid grid-cols-3 gap-4">
                <button
                  type="button"
                  onClick={() => onBrowseCollection('SUVs')}
                  className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8934A]"
                >
                  <span className="block text-xs uppercase tracking-[0.14em] text-[#6E685E]">
                    Category
                  </span>
                  <span className="mt-1 block text-sm sm:text-base font-semibold text-[#0D0D0C] group-hover:text-[#8E6D2F] transition-colors">
                    SUVs
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onBrowseCollection('Sedans')}
                  className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8934A]"
                >
                  <span className="block text-xs uppercase tracking-[0.14em] text-[#6E685E]">
                    Category
                  </span>
                  <span className="mt-1 block text-sm sm:text-base font-semibold text-[#0D0D0C] group-hover:text-[#8E6D2F] transition-colors">
                    Sedans
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => onBrowseCollection('Luxury Collection')}
                  className="text-left group cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#B8934A]"
                >
                  <span className="block text-xs uppercase tracking-[0.14em] text-[#6E685E]">
                    Category
                  </span>
                  <span className="mt-1 block text-sm sm:text-base font-semibold text-[#0D0D0C] group-hover:text-[#8E6D2F] transition-colors">
                    Luxury Collection
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Why Choose Us */}
      <section id="why-us" className="py-20 sm:py-24 bg-[#1C1B19] text-[#FAF8F4]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
          <div className="max-w-2xl pb-10 border-b border-[#FAF8F4]/12">
            <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#D8BA7A] mb-3">
              Why Choose Us
            </p>
            <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#FAF8F4] leading-[1.12] text-balance">
              A Disciplined Standard in Vehicle Acquisition
            </h2>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PILLARS.map((pillar) => (
              <div
                key={pillar.number}
                className="p-7 sm:p-8 bg-[#24221F] border border-[#34312C] hover:border-[#B8934A]/60 transition-colors"
              >
                <span className="font-mono text-sm font-medium tracking-wider text-[#D8BA7A]">
                  {pillar.number}
                </span>
                <h3 className="mt-3 text-xl font-semibold text-[#FAF8F4]">
                  {pillar.title}
                </h3>
                <p className="mt-3 text-sm sm:text-base text-[#FAF8F4]/78 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
