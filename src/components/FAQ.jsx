"use client";

import { motion, useInView, AnimatePresence } from "motion/react";
import { useRef, useState } from "react";
import { Plus, Minus } from "lucide-react";

const faqs = [
  {
    q: "How do I get a quote?",
    a: "Simply fill out the contact form on this page, call us directly, or send us an email. We'll get back to you within 2 hours with a no-obligation quote tailored to your job.",
  },
  {
    q: "Do you offer same-day service?",
    a: "Yes! We offer same-day delivery and junk removal depending on availability. For moves and larger jobs, we recommend booking at least 1 to 2 days in advance to secure your preferred time slot.",
  },
  {
    q: "Are you licensed and insured?",
    a: "Absolutely. RDM Enterprises is fully licensed and carries comprehensive liability insurance. Your belongings are covered throughout every job we handle.",
  },
  {
    q: "What areas do you serve?",
    a: "We cover the entire Greater Toronto Area including Toronto, Mississauga, Brampton, Vaughan, Markham, Scarborough, and more. See the full list in our Areas section above.",
  },
  {
    q: "How does hourly labour work?",
    a: "Our hourly labour service is billed in minimum 2-hour blocks. You tell us what needs to be done: loading, unloading, assembling, cleaning. Our team handles it. Book as many hours as you need.",
  },
  {
    q: "What do you do with junk and debris?",
    a: "We sort everything we remove. Items in good condition are donated to local charities. Electronics are properly recycled. Only what can't be reused or recycled goes to landfill. We take eco-responsibility seriously.",
  },
  {
    q: "Do you provide packing materials?",
    a: "Yes, we bring all necessary packing supplies including boxes, bubble wrap, packing paper, tape, and furniture blankets. There's no need to purchase anything separately.",
  },
  {
    q: "What if something gets damaged?",
    a: "Our team takes extreme care, but in the rare event something is damaged, our insurance covers it. We document the condition of items before a move and provide full transparency throughout.",
  },
];

function FAQItem({ item, index, inView }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.055 + 0.2, ease: [0.16, 1, 0.3, 1] }}
      className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
        open
          ? "border-secondary/40 bg-white shadow-[0_4px_24px_rgba(223,91,16,0.08)]"
          : "border-[#e8e4dd] bg-white hover:border-secondary/25 hover:shadow-[0_2px_16px_rgba(13,29,70,0.06)]"
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 p-6 text-left group"
      >
        {/* Question — underline draws on hover */}
        <span className="font-heading font-700 text-[#0D1D46] text-base leading-snug
                         underline-draw group-hover:text-[#0D1D46]">
          {item.q}
        </span>

        {/* Toggle icon — springs in/out */}
        <motion.div
          animate={{
            backgroundColor: open ? "#DF5B10" : "#f8f7f4",
            rotate: open ? 0 : 0,
          }}
          transition={{ duration: 0.25 }}
          className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors duration-300 ${
            open ? "text-white" : "text-[#0D1D46] group-hover:bg-secondary/10"
          }`}
        >
          <AnimatePresence mode="wait" initial={false}>
            {open ? (
              <motion.span
                key="minus"
                initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Minus size={14} />
              </motion.span>
            ) : (
              <motion.span
                key="plus"
                initial={{ opacity: 0, rotate: 90, scale: 0.5 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: -90, scale: 0.5 }}
                transition={{ duration: 0.2 }}
              >
                <Plus size={14} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.div>
      </button>

      {/* Answer — spring-height accordion */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height:  { duration: 0.38, ease: [0.16, 1, 0.3, 1] },
              opacity: { duration: 0.25, ease: "easeOut" },
            }}
          >
            <div className="px-6 pb-6">
              {/* Animated divider */}
              <motion.div
                initial={{ scaleX: 0, originX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-px bg-[#f0ede8] mb-4"
              />
              {/* Answer text slides up */}
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.12 }}
                className="font-body text-[#0D1D46]/65 text-sm leading-relaxed"
              >
                {item.a}
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref    = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const half = Math.ceil(faqs.length / 2);
  const col1 = faqs.slice(0, half);
  const col2 = faqs.slice(half);

  return (
    <section id="faq" className="section-padding bg-[#f8f7f4] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div ref={ref} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
          >
            <span className="dot-badge mb-4 inline-flex">FAQ</span>
          </motion.div>
          <div className="overflow-hidden">
            <motion.h2
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : {}}
              transition={{ delay: 0.1, duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="font-heading font-900 text-4xl md:text-5xl text-[#0D1D46] mb-4"
            >
              Common{" "}
              <span style={{ color: "#DF5B10" }}>Questions</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="font-body text-[#0D1D46]/60 text-lg max-w-md mx-auto"
          >
            Can't find your answer? Reach out directly. We're always happy to help.
          </motion.p>
        </div>

        {/* Two-column grid */}
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            {col1.map((item, i) => (
              <FAQItem key={item.q} item={item} index={i} inView={inView} />
            ))}
          </div>
          <div className="flex flex-col gap-4">
            {col2.map((item, i) => (
              <FAQItem key={item.q} item={item} index={i + half} inView={inView} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7 }}
          className="mt-10 text-center"
        >
          <p className="font-body text-[#0D1D46]/50 text-sm mb-4">
            Still have questions?
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-[#0D1D46] text-white
                       font-heading font-700 text-sm tracking-wide hover:bg-[#1a2f6b] transition-all duration-300
                       hover:-translate-y-0.5 shadow-[0_4px_20px_rgba(13,29,70,0.2)]"
          >
            Contact Us
          </a>
        </motion.div>
      </div>
    </section>
  );
}
