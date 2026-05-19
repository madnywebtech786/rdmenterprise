"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, ChevronDown } from "lucide-react";

const MotionLink = motion.create(Link);

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "#services",
    children: [
      { label: "Delivery",        href: "/services/delivery" },
      { label: "Moving Services", href: "/services/moving"   },
      { label: "Junk Removal",    href: "/services/junk"     },
      { label: "Hourly Labour",   href: "/services/labour"   },
    ],
  },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const pathname = usePathname();

  // Pages with a light hero need dark nav text before scrolling
  const lightHero = pathname !== "/";

  function isActive(href) {
    if (href.startsWith("#")) return false;
    if (href === "/" || href === "/#hero") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/");
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_32px_rgba(13,29,70,0.1)] py-3"
            : lightHero
              ? "bg-white/80 backdrop-blur-sm py-5"
              : "bg-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-[#0D1D46] flex items-center justify-center overflow-hidden">
                <span
                  className="font-heading font-900 text-lg leading-none"
                  style={{ color: "#DF5B10" }}
                >
                  RDM
                </span>
              </div>
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-[#DF5B10] rounded-full border-2 border-white" />
            </div>
            <div className="flex flex-col leading-tight">
              <span
                className="font-heading font-800 text-sm tracking-widest uppercase"
                style={{ color: "#0D1D46" }}
              >
                Enterprises
              </span>
              <span
                className="font-heading font-600 text-[10px] tracking-[0.2em] uppercase"
                style={{ color: "#DF5B10" }}
              >
                Delivery Company
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.children ? (
                <div
                  key={link.label}
                  className="relative"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-body font-500 text-sm transition-all duration-200 ${
                      isActive(link.href)
                        ? "bg-orange-50 text-[#DF5B10]"
                        : scrolled || lightHero
                          ? "text-[#0D1D46] hover:text-[#DF5B10] hover:bg-orange-50"
                          : "text-white hover:text-[#DF5B10]"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      size={14}
                      className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                    />
                  </button>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-[0_8px_32px_rgba(13,29,70,0.12)] border border-[#e8e4dd] overflow-hidden"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            href={child.href}
                            className="flex items-center gap-2 px-4 py-3 text-sm font-body font-500 text-[#0D1D46] hover:bg-orange-50 hover:text-[#DF5B10] transition-colors border-b border-[#f0ede8] last:border-0 group"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-[#DF5B10] opacity-0 group-hover:opacity-100 transition-opacity" />
                            {child.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-body font-500 text-sm transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-orange-50 text-[#DF5B10]"
                      : scrolled || lightHero
                        ? "text-[#0D1D46] hover:text-[#DF5B10] hover:bg-orange-50"
                        : "text-white hover:text-[#DF5B10]"
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-body font-500 text-sm transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-orange-50 text-[#DF5B10]"
                      : scrolled || lightHero
                        ? "text-[#0D1D46] hover:text-[#DF5B10] hover:bg-orange-50"
                        : "text-white hover:text-[#DF5B10]"
                  }`}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+16471234567"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#DF5B10]/30 text-[#DF5B10] font-body font-600 text-sm hover:bg-[#DF5B10]/5 transition-colors"
            >
              <Phone size={14} />
              Call Now
            </a>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-[#DF5B10] text-white font-heading font-700 text-sm tracking-wide hover:bg-[#b84a0c] transition-all duration-200 shadow-[0_4px_16px_rgba(223,91,16,0.35)] hover:shadow-[0_6px_24px_rgba(223,91,16,0.45)] hover:-translate-y-0.5"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled || lightHero ? "text-[#0D1D46]" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0D1D46] flex flex-col pt-24 px-6 pb-8 overflow-y-auto"
          >
            <nav className="flex flex-col gap-1">
              {navLinks.map((link, i) =>
                link.children ? (
                  <motion.div
                    key={link.label}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                    className="border-b border-white/5"
                  >
                    <button
                      onClick={() => setMobileServicesOpen((o) => !o)}
                      className="w-full flex items-center justify-between px-4 py-4 rounded-xl font-heading font-700 text-xl text-white hover:text-secondary hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                      <ChevronDown
                        size={18}
                        className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180 text-secondary" : ""}`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {mobileServicesOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="flex flex-col gap-1 pb-2 pl-4">
                            {link.children.map((child) => (
                              <Link
                                key={child.label}
                                href={child.href}
                                onClick={() => setMobileOpen(false)}
                                className="flex items-center gap-2 px-4 py-3 rounded-xl font-heading font-600 text-base text-white/70 hover:text-secondary hover:bg-white/5 transition-colors"
                              >
                                <span className="w-1.5 h-1.5 rounded-full bg-secondary/60 shrink-0" />
                                {child.label}
                              </Link>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ) : link.href.startsWith("/") ? (
                  <MotionLink
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-4 rounded-xl font-heading font-700 text-xl text-white hover:text-secondary hover:bg-white/5 transition-colors border-b border-white/5"
                  >
                    {link.label}
                  </MotionLink>
                ) : (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 + 0.1 }}
                    onClick={() => setMobileOpen(false)}
                    className="px-4 py-4 rounded-xl font-heading font-700 text-xl text-white hover:text-secondary hover:bg-white/5 transition-colors border-b border-white/5"
                  >
                    {link.label}
                  </motion.a>
                )
              )}
            </nav>
            <div className="mt-auto flex flex-col gap-3 pt-8">
              <a
                href="tel:+16471234567"
                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-white/10 text-white font-heading font-700 text-lg"
              >
                <Phone size={18} />
                Call Now
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center py-4 rounded-xl bg-[#DF5B10] text-white font-heading font-700 text-lg"
              >
                Get a Free Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
