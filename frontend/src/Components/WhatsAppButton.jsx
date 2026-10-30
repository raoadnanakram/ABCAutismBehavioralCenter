import React from 'react';

// Pakistan number 0345 8471692 -> international format (no + or spaces) for wa.me
const WHATSAPP_NUMBER = '923458471692';
const DEFAULT_MESSAGE = 'Hello, I would like to know more about your services.';

export default function WhatsAppButton() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(DEFAULT_MESSAGE)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp: 0345 8471692"
      title="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] shadow-lg transition-transform duration-200 hover:scale-110 focus:outline-none focus-visible:ring-4 focus-visible:ring-[#25D366]/50 sm:bottom-6 sm:right-6 sm:h-16 sm:w-16"
    >
      {/* Official WhatsApp logo */}
      <svg
        viewBox="0 0 32 32"
        className="h-8 w-8 sm:h-9 sm:w-9"
        fill="#FFFFFF"
        aria-hidden="true"
      >
        <path d="M16.004 3C8.82 3 3 8.82 3 16c0 2.29.6 4.52 1.74 6.49L3 29l6.7-1.71A12.93 12.93 0 0 0 16.004 29C23.18 29 29 23.18 29 16S23.18 3 16.004 3zm0 23.7c-1.95 0-3.86-.52-5.53-1.51l-.4-.24-3.97 1.01 1.06-3.87-.26-.4A10.66 10.66 0 0 1 5.3 16c0-5.89 4.8-10.7 10.7-10.7 5.9 0 10.7 4.8 10.7 10.7 0 5.9-4.8 10.7-10.7 10.7zm5.87-8c-.32-.16-1.9-.94-2.2-1.05-.3-.1-.51-.16-.73.16-.21.32-.83 1.05-1.02 1.26-.19.22-.37.24-.7.08-.32-.16-1.36-.5-2.59-1.6-.96-.85-1.6-1.9-1.79-2.22-.19-.32-.02-.5.14-.66.15-.14.32-.37.48-.56.16-.19.21-.32.32-.54.1-.21.05-.4-.03-.56-.08-.16-.73-1.76-1-2.41-.26-.63-.53-.54-.73-.55h-.62c-.21 0-.56.08-.85.4-.3.32-1.12 1.09-1.12 2.66s1.15 3.09 1.3 3.3c.16.21 2.26 3.45 5.47 4.84.76.33 1.36.53 1.82.68.77.24 1.46.21 2.01.13.61-.09 1.9-.78 2.17-1.53.27-.75.27-1.4.19-1.53-.08-.13-.3-.21-.62-.37z" />
      </svg>
    </a>
  );
}