"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X, Phone, ChevronDown, ChevronRight } from "lucide-react";

const MotionLink = motion.create(Link);

const movingSubServices = [
  { label: "Packing & Unpacking", href: "/services/moving/packing"     },
  { label: "Commercial Moving",   href: "/services/moving/commercial"  },
  { label: "Residential Moving",  href: "/services/moving/residential" },
  { label: "Office Moving",       href: "/services/moving/office"      },
];

const navLinks = [
  { label: "Home",    href: "/" },
  { label: "About",   href: "/about" },
  {
    label: "Services",
    href: "#services",
    children: [
      {
        label: "Moving Services",
        href: "/services/moving",
        children: movingSubServices,
      },
      { label: "Junk Removal",   href: "/services/junk"      },
      { label: "Jobsite Helper", href: "/services/labour"    },
      { label: "Invest With Us", href: "/services/investors" },
    ],
  },
  { label: "Careers", href: "/careers" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled,           setScrolled]           = useState(false);
  const [mobileOpen,         setMobileOpen]         = useState(false);
  const [servicesOpen,       setServicesOpen]       = useState(false);
  const [movingOpen,         setMovingOpen]         = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileMovingOpen,   setMobileMovingOpen]   = useState(false);
  const pathname = usePathname();
  const movingTimerRef = useRef(null);

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

  function handleMovingEnter() {
    clearTimeout(movingTimerRef.current);
    setMovingOpen(true);
  }

  function handleMovingLeave() {
    movingTimerRef.current = setTimeout(() => setMovingOpen(false), 120);
  }

  const navTextClass = "text-[#0D1D46] hover:text-[#DF5B10] hover:bg-orange-50";

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-[0_2px_32px_rgba(13,29,70,0.1)] py-3"
            : "bg-white/95 backdrop-blur-sm shadow-[0_2px_16px_rgba(13,29,70,0.06)] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <a href="/" className="flex items-center group">
            <div className="bg-white rounded-md border border-surface-2 overflow-hidden w-30 h-16 flex items-center justify-center">
              <Image
                src="/images/logo.png"
                alt="RDM enterprise"
                width={120}
                height={120}
                className="object-contain"
                priority
              />
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
                  onMouseLeave={() => { setServicesOpen(false); setMovingOpen(false); }}
                >
                  <button
                    className={`flex items-center gap-1 px-4 py-2 rounded-lg font-body font-500 text-sm transition-all duration-200 ${
                      isActive(link.href) ? "bg-orange-50 text-secondary" : navTextClass
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`} />
                  </button>

                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.97 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-2 w-60 bg-white rounded-md shadow-[0_8px_32px_rgba(13,29,70,0.12)] border border-surface-2 overflow-hidden py-1"
                      >
                        {link.children.map((child) =>
                          child.children ? (
                            /* Moving Services — trigger only, flyout rendered as sibling below */
                            <div
                              key={child.label}
                              onMouseEnter={handleMovingEnter}
                              onMouseLeave={handleMovingLeave}
                              className={`flex items-center justify-between px-4 py-3 text-sm font-body font-500 text-[#0D1D46] transition-colors border-b border-surface cursor-pointer group ${movingOpen ? "bg-orange-50 text-secondary" : "hover:bg-orange-50 hover:text-secondary"}`}
                            >
                              <span className="flex items-center gap-2">
                                <span className={`w-1.5 h-1.5 rounded-full bg-secondary transition-opacity ${movingOpen ? "opacity-100" : "opacity-0 group-hover:opacity-100"}`} />
                                {child.label}
                              </span>
                              <ChevronRight size={12} className={`transition-colors ${movingOpen ? "text-secondary" : "text-[#0D1D46]/40 group-hover:text-secondary"}`} />
                            </div>
                          ) : (
                            <Link
                              key={child.label}
                              href={child.href}
                              className="flex items-center gap-2 px-4 py-3 text-sm font-body font-500 text-[#0D1D46] hover:bg-orange-50 hover:text-secondary transition-colors border-b border-surface last:border-0 group"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity" />
                              {child.label}
                            </Link>
                          )
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Moving Services flyout — sibling of main dropdown, outside overflow-hidden */}
                  <AnimatePresence>
                    {servicesOpen && movingOpen && (() => {
                      const movingChild = link.children.find(c => c.children);
                      return movingChild ? (
                        <motion.div
                          key="moving-flyout"
                          initial={{ opacity: 0, x: -6, scale: 0.97 }}
                          animate={{ opacity: 1, x: 0, scale: 1 }}
                          exit={{ opacity: 0, x: -6, scale: 0.97 }}
                          transition={{ duration: 0.15 }}
                          onMouseEnter={handleMovingEnter}
                          onMouseLeave={handleMovingLeave}
                          className="absolute w-56 bg-white rounded-md shadow-[0_8px_32px_rgba(13,29,70,0.12)] border border-surface-2 overflow-hidden py-1"
                          style={{ top: "calc(100% + 12px)", left: "calc(15rem + 4px)" }}
                        >
                          {movingChild.children.map((sub) => (
                            <Link
                              key={sub.label}
                              href={sub.href}
                              className="flex items-center gap-2 px-4 py-2.5 text-sm font-body font-500 text-[#0D1D46] hover:bg-orange-50 hover:text-secondary transition-colors border-b border-surface last:border-0 group"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-secondary opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                              {sub.label}
                            </Link>
                          ))}
                        </motion.div>
                      ) : null;
                    })()}
                  </AnimatePresence>
                </div>
              ) : link.href.startsWith("/") ? (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-body font-500 text-sm transition-all duration-200 ${
                    isActive(link.href) ? "bg-orange-50 text-secondary" : navTextClass
                  }`}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.label}
                  href={link.href}
                  className={`px-4 py-2 rounded-lg font-body font-500 text-sm transition-all duration-200 ${
                    isActive(link.href) ? "bg-orange-50 text-secondary" : navTextClass
                  }`}
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="tel:+18255835070"
              className="flex items-center gap-2 px-4 py-2 rounded-full border border-secondary/30 text-secondary font-body font-600 text-sm hover:bg-secondary/5 transition-colors"
            >
              <Phone size={14} />
              Call Now
            </a>
            <Link
              href="/contact"
              className="px-5 py-2.5 rounded-full bg-secondary text-white font-heading font-700 text-sm tracking-wide hover:bg-secondary-dark transition-all duration-200 shadow-[0_4px_16px_rgba(223,91,16,0.35)] hover:shadow-[0_6px_24px_rgba(223,91,16,0.45)] hover:-translate-y-0.5"
            >
              Get a Quote
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg transition-colors text-[#0D1D46]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
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
            className="fixed inset-0 z-60 bg-[#0D1D46] flex flex-col px-6 pb-8 overflow-y-auto"
          >
            {/* Drawer header */}
            <div className="flex items-center justify-between py-4 mb-4">
              <a href="/" onClick={() => setMobileOpen(false)}>
                <div className="bg-white rounded-md border border-white/20 overflow-hidden w-26 h-14 flex items-center justify-center">
                  <Image src="/images/logo.png" alt="RDM enterprise" width={52} height={52} className="object-contain" loading="lazy" />
                </div>
              </a>
              <button
                onClick={() => setMobileOpen(false)}
                className="p-2 rounded-lg text-white hover:bg-white/10 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} />
              </button>
            </div>

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
                    {/* Services accordion */}
                    <button
                      onClick={() => setMobileServicesOpen((o) => !o)}
                      className="w-full flex items-center justify-between px-4 py-4 rounded-xl font-heading font-700 text-xl text-white hover:text-secondary hover:bg-white/5 transition-colors"
                    >
                      {link.label}
                      <ChevronDown size={18} className={`transition-transform duration-300 ${mobileServicesOpen ? "rotate-180 text-secondary" : ""}`} />
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
                            {link.children.map((child) =>
                              child.children ? (
                                /* Moving Services nested accordion */
                                <div key={child.label} className="border-b border-white/5 last:border-0">
                                  <button
                                    onClick={() => setMobileMovingOpen((o) => !o)}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-heading font-600 text-base text-white/70 hover:text-secondary hover:bg-white/5 transition-colors"
                                  >
                                    <span className="flex items-center gap-2">
                                      <span className="w-1.5 h-1.5 rounded-full bg-secondary/60 shrink-0" />
                                      {child.label}
                                    </span>
                                    <ChevronDown size={14} className={`transition-transform duration-300 ${mobileMovingOpen ? "rotate-180 text-secondary" : "text-white/30"}`} />
                                  </button>

                                  <AnimatePresence initial={false}>
                                    {mobileMovingOpen && (
                                      <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.22 }}
                                        className="overflow-hidden pl-4"
                                      >
                                        {child.children.map((sub) => (
                                          <Link
                                            key={sub.label}
                                            href={sub.href}
                                            onClick={() => setMobileOpen(false)}
                                            className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-heading font-500 text-sm text-white/50 hover:text-secondary hover:bg-white/5 transition-colors"
                                          >
                                            <span className="w-1 h-1 rounded-full bg-secondary/40 shrink-0" />
                                            {sub.label}
                                          </Link>
                                        ))}
                                      </motion.div>
                                    )}
                                  </AnimatePresence>
                                </div>
                              ) : (
                                <Link
                                  key={child.label}
                                  href={child.href}
                                  onClick={() => setMobileOpen(false)}
                                  className="flex items-center gap-2 px-4 py-3 rounded-xl font-heading font-600 text-base text-white/70 hover:text-secondary hover:bg-white/5 transition-colors"
                                >
                                  <span className="w-1.5 h-1.5 rounded-full bg-secondary/60 shrink-0" />
                                  {child.label}
                                </Link>
                              )
                            )}
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
                href="tel:+18255835070"
                className="flex items-center justify-center gap-2 py-4 rounded-xl bg-white/10 text-white font-heading font-700 text-lg"
              >
                <Phone size={18} />
                +1 (825) 583-5070
              </a>
              <Link
                href="/contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center py-4 rounded-xl bg-secondary text-white font-heading font-700 text-lg"
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
