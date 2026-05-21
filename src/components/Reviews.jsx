"use client";

import { motion, useInView, AnimatePresence, useDragControls } from "motion/react";
import { useRef, useState, useEffect, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight } from "lucide-react";

const reviews = [
  {
    name: "Sarah M.",
    role: "Homeowner",
    location: "Calgary, AB",
    rating: 5,
    text: "RDM made our entire move completely stress-free. The team arrived on time, packed everything carefully, and had us settled into our new home faster than we expected. Absolutely recommend!",
    avatar: "SM",
    color: "#DF5B10",
  },
  {
    name: "James R.",
    role: "Business Owner",
    location: "Airdrie, AB",
    rating: 5,
    text: "We had an office relocation with tight deadlines and RDM delivered flawlessly. Zero downtime, everything organized, and the team was professional throughout. Will use again for sure.",
    avatar: "JR",
    color: "#0D1D46",
  },
  {
    name: "Priya K.",
    role: "Condo Resident",
    location: "Cochrane, AB",
    rating: 5,
    text: "I called for same-day junk removal and they were there within 2 hours. Quick, clean, and very reasonably priced. The guys were friendly and efficient. Great service!",
    avatar: "PK",
    color: "#DF5B10",
  },
  {
    name: "David L.",
    role: "Property Manager",
    location: "Chestermere, AB",
    rating: 5,
    text: "We use RDM regularly for tenant move-outs and deliveries. Always reliable, always professional. They've never let us down across dozens of jobs. Our go-to logistics partner.",
    avatar: "DL",
    color: "#0D1D46",
  },
  {
    name: "Amanda T.",
    role: "Event Coordinator",
    location: "Okotoks, AB",
    rating: 5,
    text: "Hired the hourly labour team to help with a large event setup. They worked quickly, followed instructions perfectly, and were genuinely great to work with. Highly recommended!",
    avatar: "AT",
    color: "#DF5B10",
  },
  {
    name: "Kevin O.",
    role: "First-time Mover",
    location: "Strathmore, AB",
    rating: 5,
    text: "Was nervous about my first big move but RDM made it so easy. They handled my fragile items with care, gave me a fair quote upfront, and everything arrived perfect. 10/10.",
    avatar: "KO",
    color: "#0D1D46",
  },
];

const PER_PAGE   = 3;
const PAGES      = Math.ceil(reviews.length / PER_PAGE);
const AUTO_MS    = 5000;

function ReviewCard({ review, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 32, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.96 }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="card-shimmer bg-white rounded-3xl p-7 border border-[#e8e4dd]
                 hover:border-secondary/30 hover:shadow-[0_12px_40px_rgba(13,29,70,0.1)]
                 transition-all duration-300 flex flex-col h-full group"
    >
      {/* Quote + stars row */}
      <div className="flex items-start justify-between mb-4">
        <motion.div
          initial={{ opacity: 0, rotate: -20, scale: 0.6 }}
          animate={{ opacity: 0.6, rotate: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: index * 0.08 + 0.15, type: "spring", stiffness: 200, damping: 15 }}
        >
          <Quote size={28} style={{ color: "#DF5B10" }} />
        </motion.div>
        <div className="flex gap-0.5">
          {[...Array(review.rating)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0, rotate: -30 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.3, delay: index * 0.08 + 0.2 + i * 0.05, type: "spring", stiffness: 260 }}
            >
              <Star size={13} className="fill-secondary text-secondary" />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Review text */}
      <p className="font-body text-[#0D1D46]/70 text-sm leading-relaxed flex-1 mb-6">
        &ldquo;{review.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 pt-5 border-t border-[#f0ede8]">
        <motion.div
          className="w-10 h-10 rounded-full flex items-center justify-center font-heading font-800 text-sm text-white shrink-0"
          style={{ backgroundColor: review.color }}
          whileHover={{ scale: 1.12, rotate: 5 }}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
        >
          {review.avatar}
        </motion.div>
        <div>
          <div className="font-heading font-700 text-sm text-[#0D1D46]">{review.name}</div>
          <div className="font-body text-xs text-[#0D1D46]/50">
            {review.role}, {review.location}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function Reviews() {
  const ref          = useRef(null);
  const trackRef     = useRef(null);
  const inView       = useInView(ref, { once: true, margin: "-80px" });
  const [page, setPage] = useState(0);
  const dragControls = useDragControls();

  const next = useCallback(() => setPage((p) => (p + 1) % PAGES), []);
  const prev = useCallback(() => setPage((p) => (p - 1 + PAGES) % PAGES), []);

  // Auto-advance
  useEffect(() => {
    const t = setInterval(next, AUTO_MS);
    return () => clearInterval(t);
  }, [next]);

  const visible = reviews.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE);

  return (
    <section id="reviews" className="section-padding bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={ref} className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
            >
              <span className="dot-badge mb-4 inline-flex">Testimonials</span>
            </motion.div>
            <div className="overflow-hidden">
              <motion.h2
                initial={{ y: "110%", opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : {}}
                transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46] leading-tight"
              >
                What Our{" "}
                <span style={{ color: "#DF5B10" }}>Clients</span>
                <br />Are Saying
              </motion.h2>
            </div>
          </div>

          {/* Rating summary */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, y: 16 }}
            animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
            transition={{ delay: 0.2, type: "spring", stiffness: 180, damping: 18 }}
            className="flex items-center gap-5 p-5 bg-[#f8f7f4] rounded-2xl border border-[#e8e4dd] shrink-0"
          >
            <div>
              <div className="font-heading font-900 text-4xl text-[#0D1D46]">4.9</div>
              <div className="flex gap-0.5 my-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} className="fill-secondary text-secondary" />
                ))}
              </div>
              <div className="font-body text-xs text-[#0D1D46]/50">500+ Reviews</div>
            </div>
            <div className="w-px h-12 bg-[#e8e4dd]" />
            <div className="flex flex-col gap-1">
              {[
                { stars: 5, pct: "90%" },
                { stars: 4, pct: "7%"  },
                { stars: 3, pct: "3%"  },
              ].map(({ stars, pct }, i) => (
                <div key={stars} className="flex items-center gap-2">
                  <span className="font-body text-xs text-[#0D1D46]/50 w-3">{stars}</span>
                  <div className="w-20 h-1.5 rounded-full bg-[#e8e4dd] overflow-hidden">
                    <motion.div
                      className="h-full rounded-full bg-secondary"
                      initial={{ width: 0 }}
                      animate={inView ? { width: pct } : {}}
                      transition={{ duration: 0.8, delay: 0.4 + i * 0.1, ease: "easeOut" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Cards grid — AnimatePresence for page transitions */}
        <div
          ref={trackRef}
          className="grid md:grid-cols-3 gap-6"
          onPointerDown={(e) => dragControls.start(e)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              className="contents"
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.15}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) next();
                else if (info.offset.x > 60) prev();
              }}
            >
              {visible.map((review, i) => (
                <ReviewCard key={review.name} review={review} index={i} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5 }}
          className="flex items-center justify-center gap-4 mt-10"
        >
          <motion.button
            onClick={prev}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-full border border-[#e8e4dd] flex items-center justify-center
                       text-[#0D1D46] hover:border-secondary hover:text-secondary transition-colors"
          >
            <ChevronLeft size={16} />
          </motion.button>

          <div className="flex gap-2">
            {[...Array(PAGES)].map((_, i) => (
              <motion.button
                key={i}
                onClick={() => setPage(i)}
                animate={{ width: page === i ? 32 : 12, backgroundColor: page === i ? "#DF5B10" : "#e8e4dd" }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="h-3 rounded-full"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              />
            ))}
          </div>

          <motion.button
            onClick={next}
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.92 }}
            className="w-10 h-10 rounded-full border border-[#e8e4dd] flex items-center justify-center
                       text-[#0D1D46] hover:border-secondary hover:text-secondary transition-colors"
          >
            <ChevronRight size={16} />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
}
