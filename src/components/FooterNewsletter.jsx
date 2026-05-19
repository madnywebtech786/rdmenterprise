"use client";

import { ArrowRight } from "lucide-react";

export default function FooterNewsletter() {
  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="flex gap-2 w-full md:w-auto"
    >
      <input
        type="email"
        placeholder="Your email address"
        className="flex-1 md:w-72 px-5 py-3 rounded-full bg-white/8 border border-white/15 font-body text-sm
                   text-white placeholder:text-white/30 focus:outline-none focus:border-secondary/50 transition-all"
      />
      <button
        type="submit"
        className="px-5 py-3 rounded-full bg-secondary text-white font-heading font-700 text-sm
                   hover:bg-secondary-light transition-colors flex items-center gap-2
                   shadow-[0_4px_16px_rgba(223,91,16,0.3)]"
      >
        Subscribe <ArrowRight size={14} />
      </button>
    </form>
  );
}
