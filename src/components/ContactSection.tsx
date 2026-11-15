import React, { useEffect, useState } from 'react';
import { Check, Copy, MessageCircle, Send } from 'lucide-react';
import { DEALERSHIP_CONFIG } from '../data/dealershipConfig';
import { Vehicle } from '../data/vehicles';

interface ContactSectionProps {
  selectedVehicleForInquiry: Vehicle | null;
  onOpenWhatsAppWithMessage: (message: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({
  selectedVehicleForInquiry,
  onOpenWhatsAppWithMessage,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('General Vehicle Inquiry');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submittedSummary, setSubmittedSummary] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedVehicleForInquiry) {
      setInterest(
        `${selectedVehicleForInquiry.manufacturer} ${selectedVehicleForInquiry.model} (${selectedVehicleForInquiry.year})`
      );
      setMessage(
        `Hello BINI CARS, I would like more information regarding ${selectedVehicleForInquiry.manufacturer} ${selectedVehicleForInquiry.model} (${selectedVehicleForInquiry.year}).`
      );
      setSubmittedSummary(null);
    }
  }, [selectedVehicleForInquiry]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Please enter your full name.');
      return;
    }
    if (!phone.trim() || phone.replace(/[^\d+]/g, '').length < 7) {
      setError('Please enter a valid phone or WhatsApp number.');
      return;
    }
    if (!message.trim()) {
      setError('Please include a brief note on the vehicle you are looking for.');
      return;
    }

    const formatted = [
      `BINI CARS Inquiry`,
      `Name: ${fullName.trim()}`,
      `Phone / WhatsApp: ${phone.trim()}`,
      `Vehicle Interest: ${interest.trim()}`,
      `Message: ${message.trim()}`,
    ].join('\n');

    setSubmittedSummary(formatted);
  };

  const handleCopySummary = async () => {
    if (!submittedSummary) return;
    try {
      await navigator.clipboard.writeText(submittedSummary);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard fallback ignored if blocked
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24 bg-[#FAF8F4]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left: Dealership Information (Configurable, Non-Invented) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <p className="text-xs font-semibold tracking-[0.2em] uppercase text-[#8E6D2F] mb-3">
                Contact Us
              </p>
              <h2 className="font-editorial text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#0D0D0C] leading-[1.12] text-balance">
                Connect with BINI CARS
              </h2>
              <p className="mt-4 text-sm sm:text-base text-[#4A463F] leading-relaxed">
                Reach out to request pricing in Ethiopian Birr, confirm import availability, or
                schedule an in-person vehicle inspection.
              </p>

              {/* Contact Directory Ledger */}
              <dl className="mt-8 divide-y divide-[#E5DFD3] border-y border-[#E5DFD3] text-sm">
                <div className="py-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#6E685E]">
                    Showroom Location
                  </dt>
                  <dd className="mt-1 font-medium text-[#1C1B19]">
                    {DEALERSHIP_CONFIG.showroomAddress}
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#6E685E]">
                    Telephone &amp; WhatsApp
                  </dt>
                  <dd className="mt-1 font-medium text-[#1C1B19]">
                    {DEALERSHIP_CONFIG.whatsappNumber
                      ? `+${DEALERSHIP_CONFIG.whatsappNumber}`
                      : DEALERSHIP_CONFIG.phoneDisplay}
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#6E685E]">
                    Direct Email
                  </dt>
                  <dd className="mt-1 font-medium text-[#1C1B19]">
                    {DEALERSHIP_CONFIG.email}
                  </dd>
                </div>
                <div className="py-4">
                  <dt className="text-xs uppercase tracking-[0.14em] text-[#6E685E]">
                    Showroom Hours
                  </dt>
                  <dd className="mt-1 font-medium text-[#1C1B19]">
                    {DEALERSHIP_CONFIG.businessHours}
                  </dd>
                </div>
              </dl>
            </div>

            <div className="mt-8">
              <button
                type="button"
                onClick={() =>
                  onOpenWhatsAppWithMessage(
                    'Hello BINI CARS, I would like to inquire about available vehicles in Ethiopia.'
                  )
                }
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-3.5 text-xs font-semibold tracking-[0.14em] uppercase bg-[#0D0D0C] text-[#FAF8F4] hover:bg-[#1C1B19] transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 text-[#D8BA7A]" />
                <span>Open WhatsApp Inquiry</span>
              </button>
            </div>
          </div>

          {/* Right: Validated Client Inquiry Form */}
          <div className="lg:col-span-7 bg-white border border-[#E5DFD3] p-6 sm:p-10">
            <h3 className="font-editorial text-2xl font-semibold text-[#0D0D0C]">
              Direct Vehicle Inquiry
            </h3>
            <p className="mt-1.5 text-sm text-[#5C574F]">
              Prepare your inquiry details below to send directly via WhatsApp or copy for your
              records.
            </p>

            {submittedSummary ? (
              <div className="mt-6 p-6 bg-[#FAF8F4] border border-[#D9D1C3]">
                <p className="text-xs font-semibold tracking-[0.14em] uppercase text-[#8E6D2F]">
                  Inquiry Prepared
                </p>
                <p className="mt-2 text-sm text-[#1C1B19]">
                  Your message has been formatted and validated. Send it immediately via WhatsApp
                  or copy the inquiry text below.
                </p>

                <pre className="mt-4 p-4 bg-white border border-[#E5DFD3] text-xs font-mono text-[#1C1B19] whitespace-pre-wrap leading-relaxed">
                  {submittedSummary}
                </pre>

                <div className="mt-5 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => onOpenWhatsAppWithMessage(submittedSummary)}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase bg-[#0D0D0C] text-[#FAF8F4] hover:bg-[#1C1B19] transition-colors cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-[#D8BA7A]" />
                    <span>Send via WhatsApp</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCopySummary}
                    className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase bg-white text-[#1C1B19] border border-[#D9D1C3] hover:border-[#0D0D0C] transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4 text-[#8E6D2F]" />
                        <span>Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" />
                        <span>Copy Message</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmittedSummary(null)}
                    className="px-4 py-3 text-xs font-medium text-[#5C574F] hover:text-[#0D0D0C] transition-colors cursor-pointer"
                  >
                    Edit Inquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                {error && (
                  <div
                    role="alert"
                    className="p-3.5 text-sm text-[#7A271A] bg-[#FEF3F2] border border-[#FECDCA]"
                  >
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold tracking-[0.12em] uppercase text-[#4A463F] mb-2"
                    >
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Your full name"
                      required
                      className="w-full px-4 py-3 text-sm bg-[#FAF8F4] border border-[#D9D1C3] text-[#1C1B19] placeholder:text-[#8B8478] focus:outline-none focus:border-[#8E6D2F]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="contact-phone"
                      className="block text-xs font-semibold tracking-[0.12em] uppercase text-[#4A463F] mb-2"
                    >
                      Phone / WhatsApp
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+251 ..."
                      required
                      className="w-full px-4 py-3 text-sm bg-[#FAF8F4] border border-[#D9D1C3] text-[#1C1B19] placeholder:text-[#8B8478] focus:outline-none focus:border-[#8E6D2F]"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="contact-interest"
                    className="block text-xs font-semibold tracking-[0.12em] uppercase text-[#4A463F] mb-2"
                  >
                    Vehicle or Category of Interest
                  </label>
                  <input
                    id="contact-interest"
                    type="text"
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    placeholder="e.g. SUVs, Sedans, Luxury Collection, or specific model"
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F4] border border-[#D9D1C3] text-[#1C1B19] placeholder:text-[#8B8478] focus:outline-none focus:border-[#8E6D2F]"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold tracking-[0.12em] uppercase text-[#4A463F] mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your preferred vehicle specifications, budget in ETB, or viewing availability..."
                    required
                    className="w-full px-4 py-3 text-sm bg-[#FAF8F4] border border-[#D9D1C3] text-[#1C1B19] placeholder:text-[#8B8478] focus:outline-none focus:border-[#8E6D2F] resize-y"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-xs font-semibold tracking-[0.14em] uppercase bg-[#C6A45D] text-[#0D0D0C] hover:bg-[#D8BA7A] transition-colors cursor-pointer"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Prepare Inquiry</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
