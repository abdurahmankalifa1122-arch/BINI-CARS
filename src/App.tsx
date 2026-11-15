import { useCallback, useEffect, useState } from 'react';
import { AboutAndWhySection } from './components/AboutAndWhySection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { HeroSection } from './components/HeroSection';
import { InventoryEditorDrawer } from './components/InventoryEditorDrawer';
import { Navbar } from './components/Navbar';
import { FilterCategory, ShowroomSection } from './components/ShowroomSection';
import { VehicleDetailModal } from './components/VehicleDetailModal';
import { WhatsAppModal } from './components/WhatsAppModal';
import { buildWhatsAppUrl, DEALERSHIP_CONFIG } from './data/dealershipConfig';
import {
  loadStoredVehicles,
  resetStoredVehicles,
  saveStoredVehicles,
  Vehicle,
} from './data/vehicles';

export default function App() {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => loadStoredVehicles());
  const [activeCategory, setActiveCategory] = useState<FilterCategory>('All');
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [contactPreselectedVehicle, setContactPreselectedVehicle] = useState<Vehicle | null>(
    null
  );
  const [inventoryEditorOpen, setInventoryEditorOpen] = useState(false);
  const [whatsAppModalState, setWhatsAppModalState] = useState<{
    isOpen: boolean;
    message: string;
  }>({
    isOpen: false,
    message: 'Hello BINI CARS, I would like to inquire about your available vehicles in Ethiopia.',
  });

  const navigateToSection = useCallback(
    (sectionId: string, category?: FilterCategory) => {
      if (category) {
        setActiveCategory(category);
      }

      const targetId =
        sectionId === 'suvs' || sectionId === 'sedans' || sectionId === 'luxury'
          ? 'vehicles'
          : sectionId;

      if (typeof window !== 'undefined') {
        const hashTarget =
          category === 'SUVs'
            ? '#suvs'
            : category === 'Sedans'
              ? '#sedans'
              : category === 'Luxury Collection'
                ? '#luxury'
                : `#${sectionId}`;
        if (window.location.hash !== hashTarget) {
          window.history.replaceState(null, '', hashTarget);
        }
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    },
    []
  );

  // Sync initial URL hash on GitHub Pages / deep links
  useEffect(() => {
    const applyHash = () => {
      const hash = window.location.hash.replace('#', '').toLowerCase();
      if (hash === 'suvs') {
        setActiveCategory('SUVs');
      } else if (hash === 'sedans') {
        setActiveCategory('Sedans');
      } else if (hash === 'luxury') {
        setActiveCategory('Luxury Collection');
      } else if (hash === 'vehicles') {
        setActiveCategory('All');
      }
    };
    applyHash();
    window.addEventListener('hashchange', applyHash);
    return () => window.removeEventListener('hashchange', applyHash);
  }, []);

  const triggerWhatsApp = useCallback((customMessage?: string) => {
    const msg =
      customMessage ||
      'Hello BINI CARS, I would like to inquire about your available vehicles in Ethiopia.';

    const directUrl = buildWhatsAppUrl(DEALERSHIP_CONFIG.whatsappNumber, msg);
    if (directUrl) {
      window.open(directUrl, '_blank', 'noopener,noreferrer');
      return;
    }

    setWhatsAppModalState({
      isOpen: true,
      message: msg,
    });
  }, []);

  const handleInquireVehicle = useCallback(
    (vehicle: Vehicle) => {
      const msg = [
        `Hello BINI CARS,`,
        `I would like to inquire about the following vehicle:`,
        `• Category: ${vehicle.category}`,
        `• Vehicle: ${vehicle.manufacturer} ${vehicle.model}`,
        `• Year: ${vehicle.year}`,
        `• Price Reference: ${vehicle.priceETB}`,
        `• Availability: ${vehicle.availability}`,
      ].join('\n');
      triggerWhatsApp(msg);
    },
    [triggerWhatsApp]
  );

  const handleRequestViewing = useCallback(
    (vehicle: Vehicle) => {
      setSelectedVehicle(null);
      setContactPreselectedVehicle(vehicle);
      navigateToSection('contact');
    },
    [navigateToSection]
  );

  const handleSaveVehicles = useCallback((nextVehicles: Vehicle[]) => {
    setVehicles(nextVehicles);
    saveStoredVehicles(nextVehicles);
  }, []);

  const handleResetDefaults = useCallback(() => {
    const defaults = resetStoredVehicles();
    setVehicles(defaults);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F4] text-[#1C1B19]">
      <Navbar
        onNavigateSection={navigateToSection}
        onOpenWhatsApp={() => triggerWhatsApp()}
      />

      <main className="flex-1">
        <HeroSection
          onViewCars={(category) => navigateToSection('vehicles', category ?? 'All')}
          onInquireWhatsApp={() => triggerWhatsApp()}
        />

        <ShowroomSection
          vehicles={vehicles}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onSelectVehicle={setSelectedVehicle}
          onInquireVehicle={handleInquireVehicle}
          onOpenInventoryEditor={() => setInventoryEditorOpen(true)}
        />

        <AboutAndWhySection
          onBrowseCollection={(category) => navigateToSection('vehicles', category)}
        />

        <ContactSection
          selectedVehicleForInquiry={contactPreselectedVehicle}
          onOpenWhatsAppWithMessage={(msg) => triggerWhatsApp(msg)}
        />
      </main>

      <Footer
        onNavigateSection={navigateToSection}
        onOpenWhatsApp={() => triggerWhatsApp()}
      />

      <VehicleDetailModal
        vehicle={selectedVehicle}
        onClose={() => setSelectedVehicle(null)}
        onInquireWhatsApp={handleInquireVehicle}
        onRequestViewing={handleRequestViewing}
      />

      <WhatsAppModal
        isOpen={whatsAppModalState.isOpen}
        initialMessage={whatsAppModalState.message}
        onClose={() => setWhatsAppModalState((prev) => ({ ...prev, isOpen: false }))}
      />

      <InventoryEditorDrawer
        isOpen={inventoryEditorOpen}
        vehicles={vehicles}
        onClose={() => setInventoryEditorOpen(false)}
        onSaveVehicles={handleSaveVehicles}
        onResetDefaults={handleResetDefaults}
      />
    </div>
  );
}
