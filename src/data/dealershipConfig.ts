import biniCarsLogo from '../assets/bini-cars-logo.png';

export interface DealershipConfig {
  brandName: string;
  country: string;
  /**
   * Enter official WhatsApp number in international format without '+' or spaces
   * (for example: "251911000000"). Leave empty until official number is provided.
   */
  whatsappNumber: string;
  phoneDisplay: string;
  email: string;
  showroomAddress: string;
  businessHours: string;
}

export const DEALERSHIP_CONFIG: DealershipConfig = {
  brandName: 'BINI CARS',
  country: 'Ethiopia',
  whatsappNumber: '',
  phoneDisplay: 'Pending official phone / WhatsApp number',
  email: 'Pending official dealership email',
  showroomAddress: 'Addis Ababa, Ethiopia — Official showroom address pending confirmation',
  businessHours: 'By appointment — Official hours pending confirmation',
};

export function getLogoAssetUrl(): string {
  return biniCarsLogo;
}

export function buildWhatsAppUrl(number: string, message: string): string | null {
  const digits = number.replace(/[^\d]/g, '');
  if (!digits) return null;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
