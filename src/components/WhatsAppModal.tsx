import React, { useEffect, useState } from 'react';
import { Check, Copy, ExternalLink, MessageCircle, X } from 'lucide-react';
import { buildWhatsAppUrl, DEALERSHIP_CONFIG } from '../data/dealershipConfig';

interface WhatsAppModalProps {
  isOpen: boolean;
  initialMessage: string;
  onClose: () => void;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  initialMessage,
  onClose,
}) => {
  const [message, setMessage] = useState(initialMessage);
  const [targetNumber, setTargetNumber] = useState(DEALERSHIP_CONFIG.whatsappNumber);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setMessage(initialMessage);
  }, [initialMessage, isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const waUrl = buildWhatsAppUrl(targetNumber, message);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Ignore clipboard failure
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#0D0D0C]/75 backdrop-blur-sm p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="whatsapp-modal-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg bg-[#FAF8F4] border border-[#E5DFD3] shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-6 py-4 bg-[#0D0D0C] text-[#FAF8F4] flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <MessageCircle className="w-4 h-4 text-[#D8BA7A]" />
            <h2 id="whatsapp-modal-title" className="text-sm font-semibold tracking-[0.12em] uppercase">
              WhatsApp Inquiry · BINI CARS
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close WhatsApp inquiry modal"
            className="p-1.5 text-[#FAF8F4]/75 hover:text-[#FAF8F4] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label
              htmlFor="wa-number"
              className="block text-xs font-semibold tracking-[0.12em] uppercase text-[#4A463F] mb-2"
            >
              Dealership WhatsApp Number
            </label>
            <input
              id="wa-number"
              type="tel"
              value={targetNumber}
              onChange={(e) => setTargetNumber(e.target.value)}
              placeholder="Enter official WhatsApp number (e.g. 2519XXXXXXXX)"
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9D1C3] text-[#1C1B19] placeholder:text-[#8B8478] focus:outline-none focus:border-[#8E6D2F]"
            />
            {!DEALERSHIP_CONFIG.whatsappNumber && (
              <p className="mt-1.5 text-xs text-[#6E685E]">
                Official dealership number is pending configuration in{' '}
                <code className="font-mono text-[#1C1B19]">dealershipConfig.ts</code>. You may
                enter a number above or copy the formatted message below.
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="wa-message"
              className="block text-xs font-semibold tracking-[0.12em] uppercase text-[#4A463F] mb-2"
            >
              Inquiry Message
            </label>
            <textarea
              id="wa-message"
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#D9D1C3] text-[#1C1B19] focus:outline-none focus:border-[#8E6D2F]"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-1">
            {waUrl ? (
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase bg-[#0D0D0C] text-[#FAF8F4] hover:bg-[#1C1B19] transition-colors"
              >
                <span>Continue to WhatsApp</span>
                <ExternalLink className="w-3.5 h-3.5 text-[#D8BA7A]" />
              </a>
            ) : (
              <button
                type="button"
                disabled
                className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase bg-[#D9D1C3] text-[#5C574F] cursor-not-allowed"
              >
                <span>Enter Number to Launch WhatsApp</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 px-5 py-3 text-xs font-semibold tracking-[0.12em] uppercase bg-white text-[#1C1B19] border border-[#D9D1C3] hover:border-[#0D0D0C] transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-[#8E6D2F]" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
