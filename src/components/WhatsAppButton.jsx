"use client";

import { motion } from "motion/react";

const PHONE   = "16471234567";
const MESSAGE = encodeURIComponent("Hi RDM Enterprises! I'd like to get a free quote.");
const WA_URL  = `https://wa.me/${PHONE}?text=${MESSAGE}`;

export default function WhatsAppButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center justify-end gap-3 group/wa">

      {/* CSS-only tooltip — no state, no JS */}
      <div
        className="pointer-events-none opacity-0 translate-x-2 group-hover/wa:opacity-100 group-hover/wa:translate-x-0
                   transition-all duration-200 ease-out
                   bg-[#0D1D46] text-white text-xs font-heading font-700 tracking-wide
                   px-3 py-2 rounded-xl shadow-lg whitespace-nowrap relative"
      >
        Chat on WhatsApp
        <span className="absolute right-[-5px] top-1/2 -translate-y-1/2
                         border-t-4 border-b-4 border-l-[6px]
                         border-t-transparent border-b-transparent border-l-[#0D1D46]" />
      </div>

      {/* Button */}
      <motion.a
        href={WA_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 2, type: "spring", stiffness: 260, damping: 18 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.93 }}
        className="relative w-14 h-14 rounded-full flex items-center justify-center
                   shadow-[0_8px_32px_rgba(37,211,102,0.45)] hover:shadow-[0_12px_40px_rgba(37,211,102,0.6)]
                   transition-shadow duration-300"
        style={{ backgroundColor: "#25D366" }}
      >
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30" />
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="28" height="28" fill="white" aria-hidden="true">
          <path d="M16 1C7.716 1 1 7.716 1 16c0 2.628.672 5.1 1.848 7.254L1 31l7.95-1.824A14.93 14.93 0 0 0 16 31c8.284 0 15-6.716 15-15S24.284 1 16 1zm0 27.2a12.13 12.13 0 0 1-6.19-1.696l-.444-.264-4.716 1.082 1.11-4.594-.29-.47A12.134 12.134 0 0 1 3.8 16C3.8 9.26 9.26 3.8 16 3.8S28.2 9.26 28.2 16 22.74 28.2 16 28.2zm6.66-9.08c-.364-.182-2.154-1.062-2.488-1.184-.334-.12-.578-.182-.82.182-.244.364-.942 1.184-1.154 1.428-.212.244-.424.274-.788.092-.364-.182-1.536-.566-2.926-1.806-1.082-.966-1.812-2.158-2.026-2.522-.212-.364-.022-.562.16-.742.164-.162.364-.424.546-.636.182-.212.244-.364.364-.608.122-.244.062-.456-.03-.638-.092-.182-.82-1.98-1.124-2.712-.296-.712-.598-.614-.82-.626-.212-.01-.456-.012-.7-.012-.244 0-.638.092-.972.456-.334.364-1.274 1.246-1.274 3.038s1.304 3.524 1.486 3.766c.182.244 2.566 3.918 6.216 5.494.868.376 1.546.6 2.074.768.872.278 1.664.238 2.29.144.698-.104 2.154-.88 2.458-1.73.304-.85.304-1.578.212-1.73-.09-.15-.334-.24-.698-.42z" />
        </svg>
      </motion.a>
    </div>
  );
}
